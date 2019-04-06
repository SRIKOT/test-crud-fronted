import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';

import { SnackBarComponent } from './snack-bar/snack-bar.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  success: string = 'Success!';
  warning: string = 'Warning!';
  error: string = 'Error!';

  textClose: string = 'Close';

  textLoading: string = 'Loading...';

  @ViewChild('template') template: TemplateRef<any>;

  // horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';

  // @ViewChild('template') template: TemplateRef<any>;
  // message = 'Loading...';
  // actionButtonLabel = 'Close';
  // action = false;
  // setAutoHide = false;
  // autoHide = 0;
  // addExtraClass = true;
  // horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    //private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  // private snackBarConfig(data?: any) {
  //   const config = new MatSnackBarConfig();
  //   config.verticalPosition = this.verticalPosition;
  //   config.horizontalPosition = this.horizontalPosition;
  //   config.duration = 0;
  //   config.data = data;
  //   //config.duration = this.setAutoHide ? this.autoHide : 0;
  //   //config.panelClass = this.addExtraClass ? ['demo-party'] : undefined;
  //   //config.panelClass = ['demo-party'];
  //   return config;
  // }

  informationSnackBar(status?: Number, data?: any) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = <MatSnackBarVerticalPosition>'top';
    config.horizontalPosition = <MatSnackBarHorizontalPosition>'center';

    if (status === 200) {
      config.duration = 2000;
      this.snackBar.open(data, this.textClose, config);
    } else if (status === 400) {
      config.duration = 0;
      config.data = data;
      this.snackBar.openFromComponent(SnackBarComponent, config);
    } else if (status === 401) {
      config.duration = 2000;
      this.snackBar.open(data, this.textClose, config);
    } else {
      config.duration = 0;
      this.snackBar.open(this.textLoading, null, config);
      // this.snackBar.openFromTemplate(this.template, config);
    }
  }

  // stripJsonToString(json) {
  //   const config = this.snackBarConfig();
  //   for (let key in json) {
  //     let textValidator = JSON.stringify(json[key]).replace(',', ', ').replace('[', '').replace(']', '').replace('.', '').replace(/\"/g, '');
  //     this.snackBar.open(textValidator, this.textClose, config);
  //   }
  // }

  // open() {
  //   this.snackBar.openFromComponent(SnackBarComponent, {
  //     verticalPosition: 'top',
  //     data: { message: 'test', action: 'close' }
  //   });
  //   // const config = this._createConfig();
  //   // this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  // }

  // openTemplate() {
  //   //const config = this._createConfig();
  //   const config = new MatSnackBarConfig();
  //   config.verticalPosition = <MatSnackBarVerticalPosition>'top';
  //   config.horizontalPosition = <MatSnackBarHorizontalPosition>'center';
  //   this.snackBar.openFromTemplate(this.template, config);
  // }

  // information(type: Number, text: string) {
  //   if (type === 200) {
  //     this.toastr.success(this.success, text);
  //   } else if (type === 400) {
  //     for (let i = 0; i < text.length; i++) {
  //       this.stripJsonToString2(text[i]);
  //     }
  //   } else if (type === 401) {
  //     this.toastr.error(this.error, text);
  //   }
  // }

  // stripJsonToString2(json) {
  //   for (let key in json) {
  //     let textValidator = JSON.stringify(json[key]).replace(',', ', ').replace('[', '').replace(']', '').replace('.', '').replace(/\"/g, '');
  //     this.toastr.warning(this.warning, textValidator);
  //   }
  // }
}
