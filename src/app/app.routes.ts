import { LoginComponent } from './screens/login/login.component';
import { Routes } from '@angular/router';
import { CatalogComponent } from './screens/catalog/catalog.component';

export const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
