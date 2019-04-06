import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';

import { CreateEditService } from './create-edit.service';
import { ViewService } from '../view/view.service';
import { Subscription } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';

import { RoutesName } from '../brand.routes.name';
import * as AppRoutesName from '../../app.routes.name';

import { FunctionSetting } from '../../shared/functionSetting';

import { DomSanitizer } from '@angular/platform-browser';

import { InformationComponent } from '../../shared/information/information.component';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {
  subs: Subscription;
  form: FormGroup;
  skillArray: string[] = ['Guitar', 'Bass', 'Drum', 'Piano', 'Vocal'];
  validatorName = {
    name: '',
    skill: '',
    nick_name: ''
  };

  id: number;
  url: string;

  uploadedImage: File;
  imagePreview: any;

  linkView = AppRoutesName.RoutesName.brand + '/view';

  constructor(
    private formBuilder: FormBuilder,
    private createEditService: CreateEditService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private viewService: ViewService,
    private functionSetting: FunctionSetting,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private info: InformationComponent
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id) {
      this.url = this.functionSetting.API;
      this.subs = this.viewService.getPerson(this.id).subscribe(res => {
        const skill = res['skill'].split(',').filter(function (el) { return el; });
        this.form = this.formBuilder.group({
          id: [res['id']],
          name: [res['name'], [
            Validators.required
          ]],
          nick_name: [res['nick_name'], [
            Validators.required
          ]],
          age: [res['age']],
          skill: [skill, [
            Validators.required
          ]],
          line: [res['line']],
          tel: [res['tel']],
          detail: [res['detail']],
          image: [res['image']],
          titleAddEdit: ['Edit Person']
        });
      });
    }
  }

  onImageChange(event) {
    const image = event.target.files[0];

    this.subs = this.ng2ImgMax.resizeImage(image, 1000, 600).subscribe(result => {
      this.uploadedImage = new File([result], result.name);
      this.getImagePreview(this.uploadedImage);
    }, error => {
      console.log('😢 Oh no!', error);
    }
    );
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
  }

  // preview(files: any) {
  //   if (files.length === 0) {
  //     return;
  //   }

  //   const mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = 'Only images are supported.';
  //     return;
  //   }

  //   const reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //   }
  // }

  errorsMessages(msg: Object) {
    const arrayValidator = Object.getOwnPropertyNames(this.validatorName);
    for (const key in msg) {
      if (arrayValidator[0] === key) {
        this.validatorName['name'] = msg[key][0];
      }
    }

    for (const key in msg) {
      if (arrayValidator[1] === key) {
        this.validatorName['skill'] = msg[key][0];
      }
    }

    for (const key in msg) {
      if (arrayValidator[2] === key) {
        this.validatorName['nick_name'] = msg[key][0];
      }
    }
    return this.validatorName;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: ['', [
        Validators.required
      ]],
      nick_name: ['', [
        Validators.required
      ]],
      age: [''],
      skill: ['', [
        Validators.required
      ]],
      line: [''],
      tel: [''],
      detail: [''],
      image: [''],
      titleAddEdit: ['Create Person']
    });
  }

  save(form: FormGroup) {
    const data = {
      id: (form.value.id ? form.value.id : null),
      name: form.value.name,
      nick_name: form.value.nick_name,
      age: form.value.age,
      skill: form.value.skill,
      line: form.value.line,
      tel: form.value.tel,
      detail: form.value.detail,
      image: form.value.image,
    };

    this.subs = this.createEditService.CU(this.uploadedImage ? this.uploadedImage : {}, data).subscribe(res => {
      if (res['status'] === 200) {
        this.info.informationSnackBar(200, 'Save!');
        this.router.navigate([this.linkView, res['last_id']]);
      } else if (res['status'] === 400) {
        this.errorsMessages(res['data'][0]);
        this.validateAllFormFields(this.form);
      }
    });
  }

  cancel(id: number) {
    this.router.navigate([this.linkView, id]);
  }
}
