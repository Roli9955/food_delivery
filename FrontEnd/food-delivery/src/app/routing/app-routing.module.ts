import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationLoginComponent } from '../user-registration-login/user-registration-login.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { CartComponent } from '../cart/cart.component';

const routes: Routes = [
  {path: 'login',  component: UserRegistrationLoginComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'product-list/cart/:id', component: CartComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
