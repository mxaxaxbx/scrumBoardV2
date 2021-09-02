import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-register-role',
  templateUrl: './register-role.component.html',
  styleUrls: ['./register-role.component.css']
})
export class RegisterRoleComponent implements OnInit {

  role: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private roleSvc: RoleService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.clearData();
  }

  ngOnInit(): void {
  }

  clearData(): void {
    this.role = {
      name: '',
    };
  }

  save() {
    if( !this.role.name || !this.role.description ) {
      this.message = 'Enter all data',
      this.openSnackBarError();
    }

    this.roleSvc.create(this.role).subscribe(
      (res: any) => {
        this.message = 'registrado con exito';
        this.openSnackBarSuccesfull();
        this.router.navigate(['/listRole'])
        this.clearData();
        
      },

      (err: any) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    )
    
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
