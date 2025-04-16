import { LoginComponent } from './screens/login/login.component';
import { Routes } from '@angular/router';
import { CatalogComponent } from './screens/catalog/catalog.component';
import { RegisterComponent } from './screens/register/register.component';
import { LogoutComponent } from './screens/logout/logout.component';
import { ProductComponent } from './screens/product/product.component';
import { CartComponent } from './screens/cart/cart.component';
import { InventoryComponent } from './screens/admin/inventory/inventory.component';
import { UsersComponent } from './screens/admin/users/users.component';

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
  {
    path: 'admin/inventory',
    component: InventoryComponent,
  },
  {
    path: 'admin/users',
    component: UsersComponent,
  },
];
