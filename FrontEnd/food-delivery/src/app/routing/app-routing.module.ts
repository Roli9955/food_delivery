import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationLoginComponent } from '../user-registration-login/user-registration-login.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { CartComponent } from '../cart/cart.component';
import { ReservationCommitComponent } from '../reservation-commit/reservation-commit.component';
import { MyReservationsComponent } from '../my-reservations/my-reservations.component';
import { MainPageComponent } from '../main-page/main-page.component';

const routes: Routes = [
  {path: 'login',  component: UserRegistrationLoginComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'product-list/cart/:id', component: CartComponent},
  {path: 'cart', component: CartComponent},
  {path: 'cart/reservation', component: ReservationCommitComponent},
  {path: 'product-list/cart/:id/reservation', component: ReservationCommitComponent},
  {path: 'my-reservations', component: MyReservationsComponent},
  {path: '', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
