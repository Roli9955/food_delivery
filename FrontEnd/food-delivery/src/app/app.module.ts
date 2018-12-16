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
  MatDialogModule,
  MatCheckboxModule,
  MatRadioModule,
  MatIconModule} from '@angular/material';
import { UserRegistrationLoginComponent } from './user-registration-login/user-registration-login.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ReservationCommitComponent } from './reservation-commit/reservation-commit.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserManagementComponent, UserManagementDialogComponent } from './user-management/user-management.component';
import { MaintenanceComponent, 
  MaintenanceComponentCategoryDialog, 
  MaintenanceComponentProductDialog } from './maintenance/maintenance.component';
import { AllReservationComponent } from './all-reservation/all-reservation.component';
import { ReservationDeliverComponent, ReservationDeliverComponentDialog } from './reservation-deliver/reservation-deliver.component';

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
    MaintenanceComponentCategoryDialog,
    MaintenanceComponentProductDialog,
    AllReservationComponent,
    ReservationDeliverComponent,
    ReservationDeliverComponentDialog
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
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatCheckboxModule
  ],
  entryComponents: [
    UserManagementComponent, 
    UserManagementDialogComponent, 
    MaintenanceComponent, 
    MaintenanceComponentCategoryDialog,
    MaintenanceComponentProductDialog,
    ReservationDeliverComponent,
    ReservationDeliverComponentDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
