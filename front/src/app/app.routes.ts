import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ElementListComponent } from './element-list/element-list.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'elements', component: ElementListComponent },
];
