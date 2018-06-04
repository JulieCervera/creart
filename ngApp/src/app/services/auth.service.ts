import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';
  private _accountUrl = 'http://localhost:3000/api/account';

  constructor(private http: HttpClient,
              private _router: Router,
            private _http:Http) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl,user)
  }
 
  loginUser(user) {
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn() {
    return !!localStorage.getItem('local_token')
  }

  logoutUser(){
    localStorage.removeItem('local_token');
    this._router.navigate(['']);
  }

  getToken() {
    return localStorage.getItem('local_token');
  }


  deleteAccount(userId) {
    let headers = new Headers;
    headers.append('userId', userId);
    let options = new RequestOptions();
    options.headers = headers;
    return this._http.delete(this._accountUrl,options); 
  }

  editAccount(user) {
    return this.http.put(this._accountUrl,user);
  }
}

