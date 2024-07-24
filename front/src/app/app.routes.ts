import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ElementListComponent } from './element-list/element-list.component';
import { CrearClaveComponent } from './crear-clave/crear-clave.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'elements', component: ElementListComponent },
    { path: '', component: CrearClaveComponent },
    { path: 'clave/new', component: CrearClaveComponent },
];
