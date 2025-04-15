import { LoginComponent } from './screens/login/login.component';
import { Routes } from '@angular/router';
import { CatalogComponent } from './screens/catalog/catalog.component';
import { RegisterComponent } from './screens/register/register.component';
import { LogoutComponent } from './screens/logout/logout.component';
import { ProductComponent } from './screens/product/product.component';
import { CartComponent } from './screens/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
];
