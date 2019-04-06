import { Component, OnInit } from '@angular/core';

import { BrandListService } from './brand-list.service';
import { Subscription, Observable } from 'rxjs';

// import { DocumentChangeAction } from '@angular/fire/firestore';
import { Person, PersonPagination } from '../../shared/app.model';
import { FunctionSetting } from '../../shared/functionSetting';

import * as AppRoutesName from '../../app.routes.name';

import { InformationComponent } from '../../shared/information/information.component';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  subs: Subscription;
  persons;

  url: string;

  deleteModalRef: MatDialogRef<DeleteDialogComponent>;

  linkView = AppRoutesName.RoutesName.brand + '/view';

  constructor(
    private brandListService: BrandListService,
    private functionSetting: FunctionSetting,
    private info: InformationComponent,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.url = this.functionSetting.API;
    this.subs = this.brandListService.getPersons().subscribe(res => {
      this.persons = res['data'];
    });
  }

  delete(id: number) {
    this.deleteModalRef = this.dialog.open(DeleteDialogComponent, this.functionSetting.modalSetting(false, '240px', {}, false));
    this.subs = this.deleteModalRef.afterClosed().subscribe(confirm => {
      if (confirm === true) {
        this.brandListService.delete(id).subscribe(res => {
          if (res['status'] === 200) {
            this.info.informationSnackBar(200, 'Delete!');
            this.subs = this.brandListService.getPersons().subscribe(data => {
              this.persons = data['data'];
            });
          }
        });
      }
    });
  }
}
