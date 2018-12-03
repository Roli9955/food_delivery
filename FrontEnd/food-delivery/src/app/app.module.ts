import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { 
  MatToolbarModule, 
  MatButtonModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatCardModule,
  MatListModule, 
  MatGridListModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatDialogModule} from '@angular/material';
import { UserRegistrationLoginComponent } from './user-registration-login/user-registration-login.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ReservationCommitComponent } from './reservation-commit/reservation-commit.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserManagementComponent, UserManagementDialogComponent } from './user-management/user-management.component';
import { MaintenanceComponent, MaintenanceComponentDialog } from './maintenance/maintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserRegistrationLoginComponent,
    LoginComponent,
    RegistrationComponent,
    ProductListComponent,
    CartComponent,
    ReservationCommitComponent,
    MyReservationsComponent,
    MainPageComponent,
    UserManagementComponent,
    UserManagementDialogComponent,
    MaintenanceComponent,
    MaintenanceComponentDialog
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  entryComponents: [UserManagementComponent, UserManagementDialogComponent, MaintenanceComponent, MaintenanceComponentDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
