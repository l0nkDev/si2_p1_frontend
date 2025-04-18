import { LoginComponent } from './screens/auth-session/login/login.component';
import { Routes } from '@angular/router';
import { CatalogComponent } from './screens/catalog-purchase/catalog/catalog.component';
import { SearchComponent } from './screens/catalog-purchase/search/search.component';
import { RegisterComponent } from './screens/auth-session/register/register.component';
import { LogoutComponent } from './screens/auth-session/logout/logout.component';
import { ProductsScreenComponent } from './screens/catalog-purchase/products_screen/products_screen.component';
import { CartComponent } from './screens/catalog-purchase/cart/cart.component';
import { InventoryComponent } from './screens/admin/inventory/inventory.component';
import { UsersComponent } from './screens/admin/users/users.component';
import { PurchasesComponent } from './screens/user/purchases/purchases.component';
import { InfoComponent } from './screens/user/info/info.component';
import { DeliveryListComponent } from './screens/logistics/delivery_list/delivery_list.component';
import { AssignmentsComponent } from './screens/logistics/assignments/assignments.component';

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
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'search:q',
    component: SearchComponent,
  },
  {
    path: 'purchases',
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
  {
    path: 'inventory',
    component: InventoryComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'deliveries',
    component: DeliveryListComponent,
  },
  {
    path: 'assignments',
    component: AssignmentsComponent,
  },
];
