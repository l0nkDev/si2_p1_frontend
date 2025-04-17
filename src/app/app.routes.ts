import { LoginComponent } from './screens/login/login.component';
import { Routes } from '@angular/router';
import { CatalogComponent } from './screens/catalog/catalog.component';
import { SearchComponent } from './screens/search/search.component';
import { RegisterComponent } from './screens/register/register.component';
import { LogoutComponent } from './screens/logout/logout.component';
import { ProductsScreenComponent } from './screens/products_screen/products_screen.component';
import { CartComponent } from './screens/cart/cart.component';
import { InventoryComponent } from './screens/admin/inventory/inventory.component';
import { UsersComponent } from './screens/admin/users/users.component';
import { PurchasesComponent } from './screens/purchases/purchases.component';
import { InfoComponent } from './screens/info/info.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: CatalogComponent,
  },
  {
    path: 'register',
    title: 'Registro',
    component: RegisterComponent,
  },
  {
    path: 'login',
    title: 'Ingreso',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'product',
    component: ProductsScreenComponent,
  },
  {
    path: 'product:p',
    component: ProductsScreenComponent,
  },
  {
    path: 'admin',
    children: [
      {
        path: 'inventory',
        component: InventoryComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ]
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'search:q',
    component: SearchComponent,
  },
  {
    path: 'me/purchases',
    title: 'Compras',
    component: PurchasesComponent,
  },
  {
    path: 'cart',
    title: 'Carrito',
    component: CartComponent,
  },
  {
    path: 'me',
    title: 'Informacion',
    component: InfoComponent,
  },
];
