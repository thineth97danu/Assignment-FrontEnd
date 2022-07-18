import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { User, Users } from 'src/app/Models/User';
import { UserService } from 'src/app/UserServices/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  strButtonText: string;
  FormSubTitle: string;
  FormTitle: string;
  IsEdit: boolean = false;

  Form!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserComponent>,
  ) { }


  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    if (this.data && this.data.IsEdit) {
      this.strButtonText = "UPDATE USER";
      this.FormSubTitle = "Update Existing User";
      this.FormTitle = "Update User";
      this.IsEdit = true;
      this.buildForm(this.data.userData)
    } else {
      this.strButtonText = "CREATE USER";
      this.FormSubTitle = "Create New user";
      this.FormTitle = "User Registration";
      this.IsEdit = false;
      this.buildForm();
    }

  }

  buildForm(usrData?: any) {
    if (this.IsEdit) {

      this.Form = this.fb.group({
        id: new FormControl(usrData.id, Validators.compose([Validators.required])),
        email: new FormControl(usrData.email),
        name: new FormControl(usrData.first_name, Validators.compose([Validators.required])),
        last_name: new FormControl(usrData.last_name),
        job: new FormControl(usrData.job, Validators.compose([Validators.required])),
      })

    } else {
      this.Form = this.fb.group({
        id: new FormControl('', Validators.compose([Validators.required])),
        email: new FormControl(''),
        name: new FormControl('', Validators.compose([Validators.required])),
        last_name: new FormControl(''),
        job: new FormControl('', Validators.compose([Validators.required]))
      })
    }
  }

  CreateUser(): void {
    if (this.IsEdit) {
      const user: Users = new Users();
      user.id = this.Form.controls['id'].value;
      user.name = this.Form.controls['name'].value;

      const subscription: Subscription = this.userService.UpdateUser(user).subscribe((response: any) => {
        if (response.updatedAt) {
          this.snack.open('User:' + ' ' + user.id + 'Updated at ' + response.updatedAt, 'OK', { duration: 3000 });
          this.close();
        } else {
          this.snack.open('Update Fail!', 'OK', { duration: 3000 });
        }
      });
      this.unsubscribe.push(subscription);

    } else {
      const user: Users = new Users();
      user.name = this.Form.controls['name'].value;
      user.job = this.Form.controls['job'].value;

      const subscription: Subscription = this.userService.CreateUser(user).subscribe((response: any) => {
        if (response.createdAt) {

          this.snack.open('User:' + ' ' + response.name + ' Created at ' + response.createdAt, 'OK', { duration: 3000 });
          this.close();
        } else {
          this.snack.open('Create Fail!', 'OK', { duration: 3000 });
        }
      });
      this.unsubscribe.push(subscription);
    }


  }

  //Matdialog close
  close() {
    if (this.IsEdit) {
      this.dialogRef.close();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(element => {
      element.unsubscribe()
    });
  }

}
