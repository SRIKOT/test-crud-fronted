import { RoutesName } from './app.routes.name';

import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';

import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
    { path: RoutesName.brand, loadChildren: './brand/brand.module#BrandModule' },
    {
        path: '',
        redirectTo: RoutesName.brand,
        pathMatch: 'full'
    },
    { path: '**', component: NotFoundPageComponent }
];
