import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {

  displayedColumns: string[] = ['NAME', 'ACTIONS'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  roleData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _snackBar: MatSnackBar,
    private roleSvc: RoleService
  ) {
    this.roleData = {};
    this.dataSource = new MatTableDataSource(this.roleData);
    this.getRoles();
  }

  ngOnInit(): void {}

  getRoles() {
    this.roleSvc.getAll().subscribe(
      (res) => {
        this.roleData = res.role;
        this.dataSource = new MatTableDataSource(this.roleData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
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

  applyFilter(ev: any) {
    if( !ev.target.value ) return this.getRoles();

    const search = new RegExp(ev.target.value);
    const result = this.roleData.filter( (role: any) => search.test(role.name));
    
    this.roleData = result;
    this.dataSource = new MatTableDataSource(result);
    
  }

  update(role: any) {
    console.log(role);
    
  }
  
  delete(role: any) {
    console.log(role);
    
  }

}
