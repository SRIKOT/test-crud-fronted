import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatButton } from '@angular/material';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {
  errors = [];

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // if(data['status']===200) {

    // }
    for (let key in this.data) {
      this.errors = this.errors.concat(this.data[key]);
    }
  }

  close() {
    this.snackBar.dismiss();
  }

}
