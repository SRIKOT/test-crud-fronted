import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionSetting {
  API = 'http://localhost:81/master-ng-api2/public/';

  modalSetting(disableClose: boolean, width: string, data: object, focus: boolean) {
    return {
      disableClose: disableClose,
      width: width,
      data: data,
      autoFocus: focus,
    };
  }
}
