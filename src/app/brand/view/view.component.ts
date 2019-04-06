import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { ViewService } from './view.service';
import { BrandListService } from '../brand-list/brand-list.service';

import { FunctionSetting } from '../../shared/functionSetting';
import { InformationComponent } from '../../shared/information/information.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  subs: Subscription;
  id: number;
  image: string;
  name: string;
  nick_name: string;
  age: number;
  skill: string;
  line: string;
  tel: string;
  detail: Text;

  next_id: number;
  previos_id: number;

  url: string;

  deleteModalRef: MatDialogRef<DeleteDialogComponent>;

  constructor(
    private activeRoute: ActivatedRoute,
    private viewService: ViewService,
    private functionSetting: FunctionSetting,
    private brandListService: BrandListService,
    private info: InformationComponent,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.url = this.functionSetting.API;
    this.id = this.activeRoute.snapshot.params['id'];
    this.listPerson(this.id);
  }

  delete(id: number) {
    this.deleteModalRef = this.dialog.open(DeleteDialogComponent, this.functionSetting.modalSetting(false, '240px', {}, false));
    this.subs = this.deleteModalRef.afterClosed().subscribe(confirm => {
      if (confirm === true) {
        this.subs = this.brandListService.delete(id).subscribe(res => {
          if (res['status'] === 200) {
            this.info.informationSnackBar(200, 'Delete!');
            const loadNewId = this.next_id ? this.next_id : this.previos_id;
            if (loadNewId) {
              this.id = loadNewId;
              this.listPerson(loadNewId);
            } else {
              this.router.navigate(['/brand']);
            }
          }
        });
      }
    });
  }

  listPerson(id: number) {
    this.subs = this.viewService.getPerson(id).subscribe(res => {
      this.image = res['image'];
      this.name = res['name'];
      this.nick_name = res['nick_name'];
      this.age = res['age'];
      this.skill = res['skill'];
      this.line = res['line'];
      this.tel = res['tel'];
      this.detail = res['detail'];
      this.next_id = res['next_id'];
      this.previos_id = res['previos_id'];
    });
  }

}
