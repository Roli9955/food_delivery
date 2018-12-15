import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface UserManagement{
  user: User;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  private users: User[];

  private editUser: User;
  
  private columnTitle = ['name', 'email', 'phoneNumber', 'postCode', 'city', 'street', 'streetNumber', 'lastLogin', 'permission', 'button'];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  async ngOnInit() {
    this.users = await this.userService.getAllUser();
  }

  onClickDialog(id: number){
    for(let user of this.users){
      if(user.id === id){
        this.editUser = user;
        break;
      }
    }

    const dialogRef = this.dialog.open(UserManagementDialogComponent,{
      width: '40%',
      data: {user: this.editUser}
    })

    dialogRef.afterClosed().subscribe(async(result) => {
      this.users = await this.userService.getAllUser();
    });

  }

}

@Component({
  selector: 'app-user-management-dialog',
  templateUrl: './user-management.dialog.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementDialogComponent{

  private userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    postCode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    streetNumber: new FormControl('', Validators.required),
    permission: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<UserManagementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserManagement,
    private userService: UserService,
    private snackBar: MatSnackBar
    ) {

      this.userForm.controls['name'].setValue(data.user.name);
      this.userForm.controls['email'].setValue(data.user.email);
      this.userForm.controls['phoneNumber'].setValue(data.user.phoneNumber);
      this.userForm.controls['postCode'].setValue(data.user.postCode);
      this.userForm.controls['city'].setValue(data.user.city);
      this.userForm.controls['street'].setValue(data.user.street);
      this.userForm.controls['streetNumber'].setValue(data.user.streetNumber);
      this.userForm.controls['permission'].setValue(data.user.role);

    }

  async updateUser(){
    const name: string = this.userForm.get('name').value;
    const email: string = this.userForm.get('email').value;
    const phoneNumber: string = this.userForm.get('phoneNumber').value;
    const postCode: number = this.userForm.get('postCode').value;
    const city: string = this.userForm.get('city').value;
    const street: string = this.userForm.get('street').value;
    const streetNumber: string = this.userForm.get('streetNumber').value;
    const role: string = this.userForm.get('permission').value;

    if(!name || !email || !phoneNumber || !postCode || !city || !street || !streetNumber || !role){
      return;
    }

    this.data.user.name = name;
    this.data.user.email = email;
    this.data.user.phoneNumber = phoneNumber;
    this.data.user.postCode = postCode;
    this.data.user.city = city;
    this.data.user.street = street;
    this.data.user.streetNumber = streetNumber;
    this.data.user.role = role;

    await this.userService.updateUser(this.data.user);

    this.dialogRef.close();

    this.snackBar.open('Módosításokat sikeresen rögzítettük!', '', {
      duration: 1500
    });

  }

}
