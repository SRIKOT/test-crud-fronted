import { RoutesName } from './brand.routes.name';

import { BrandComponent } from './brand.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { ViewComponent } from './view/view.component';
import { BrandListComponent } from './brand-list/brand-list.component';

import { Routes } from '@angular/router';
export const AppRoutes: Routes = [
    {
        path: '',
        component: BrandComponent,
        children: [
            { path: RoutesName.brand_list, component: BrandListComponent },
            { path: RoutesName.create, component: CreateEditComponent },
            { path: RoutesName.edit, component: CreateEditComponent },
            { path: RoutesName.view, component: ViewComponent },
        ]
    }
];
