import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL;
  }

  getAll() {
    return this._http.get<any>(this.env + 'role/listRole');
  }

  create(role:any) {
    return this._http.post<any>(this.env + 'role/registerRole', role);
  }
}
