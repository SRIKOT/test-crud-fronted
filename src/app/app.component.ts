import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { Subscription } from 'rxjs';

import { RoutesName } from './app.routes.name';
import * as BrandROutesname from './brand/brand.routes.name';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subs: Subscription;
  loading = false;

  brand = RoutesName.brand;
  brand_create = `${RoutesName.brand}/${BrandROutesname.RoutesName.create}`;

  // persons;

  constructor(
    private router: Router,
    // private dialog: MatDialog,
    // private functionSetting: FunctionSetting,
    // private appService: AppService
  ) {
    this.subs = this.router.events.subscribe((v: RouterEvent) => {
      // console.log(v);
      switch (true) {
        case v instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case v instanceof NavigationEnd:
        case v instanceof NavigationCancel:
        case v instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {
    // this.subs = this.appService.getPersons().subscribe(data => {
    //   console.log(data);
    //   this.persons = data;
    // });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
