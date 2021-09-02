import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user: any;
  roles: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private roleSvc: RoleService,
    private userSvc: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.clearData();
    this.getRoles();
  }

  ngOnInit(): void {
  }

  getRoles() {
    this.roleSvc.getAll().subscribe(
      (res) => {
        this.roles = res.role;
        
      },
      (err) => {
        console.log(err);
        
      }
    )
  }

  clearData(): void {
    this.user = {
      name: '',
      email: '',
      password: '',
      roleId: '',
    };
  }

  save() {
    if( !this.user.name || !this.user.email || !this.user.password || !this.user.roleId ) {
      this.message = 'Enter all data',
      this.openSnackBarError();
    }

    const roleAdmin = this.roles.find( (role: any) => role.name === 'admin' );

    if( this.user.roleId === roleAdmin._id ){
      this.userSvc.registerAdmin(this.user).subscribe(
        (res) => {
          this.message = 'registrado con exito';
          this.openSnackBarSuccesfull();
          this.router.navigate(['/listUser'])
          this.clearData();
          
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      )
      
    } else {
      this.userSvc.registerUser(this.user).subscribe(
        (res) => {
          this.message = 'registrado con exito';
          this.openSnackBarSuccesfull();
          this.router.navigate(['/listUser'])
          this.clearData();
          
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      )
    }
    
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }

}
