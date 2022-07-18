import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User, Users } from 'src/app/Models/User';
import { UserService } from 'src/app/UserServices/user.service';
import { UserComponent } from '../user/user.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  loading: boolean = false;

  dataSource: any;
  Users: User[]=[];
  Per_page:number;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  FormSubTitle: string;
  FormTitle: string;

  IsEditForm:boolean = false;

  constructor(private userService: UserService, private dialog: MatDialog, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.FormTitle = "User Registration";
    this.FormSubTitle = "Create New User";
    this.getUserList();
  }
  getUserList() {
    this.loading = true;
    this.userService.ListUser().subscribe(res => {
      if (res) {
        console.log(res);
        this.Users= res.data;
        this.dataSource = new MatTableDataSource(this.Users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
        this.Per_page=res.per_page;
      } else {
        console.log(res);
      }
    })
  }

  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name','avatar','Edit','Delete'];

  UpdateUser(userElement:any){
    console.log(userElement)

    let IsEdit = true;

    let dialogRef: MatDialogRef<any> = this.dialog.open(UserComponent, {
      width: '40%',
      height: '52%',
      disableClose: false,
      data: { IsEdit :IsEdit, userData: userElement }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
          this.getUserList()
      });

  }

DelUser(userId:number)
{
  const user: Users = new Users();
  user.id = userId;

  this.userService.DeleteUser(user).subscribe((response: any) => {
    if (!response) {
      this.snack.open('User:' + ' ' + user.id + '  Deleted!', 'OK', { duration: 3000 });
     
    } else {
      this.snack.open('Delte Fail!', 'OK', { duration: 3000 });
    }
  });
}

}
