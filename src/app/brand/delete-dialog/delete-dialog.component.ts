import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(
    private deleteModalRef: MatDialogRef<DeleteDialogComponent>,
  ) { }

  confirm() {
    this.deleteModalRef.close(true);
  }

  close() {
    this.deleteModalRef.close(false);
  }

}
