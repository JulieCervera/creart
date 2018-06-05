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
    private _http: Http) { }

  // add new user
  registerUser(user) {
    return this.http.post<any>(this._registerUrl,user)
  }
 
  // check if login informations
  loginUser(user) {
    return this.http.post<any>(this._loginUrl,user)
  }

  // check if the user is logged in
  loggedIn() {
    return !!localStorage.getItem('local_token')
  }

  // log out user
  logoutUser(){
    localStorage.removeItem('local_token');
    this._router.navigate(['']);
  }

  // get user id in local storage
  getToken() {
    return localStorage.getItem('local_token');
  }

  // remove user from user collection
  deleteAccount(userId) {
    let headers = new Headers;
    headers.append('userId', userId);
    let options = new RequestOptions();
    options.headers = headers;
    return this._http.delete(this._accountUrl,options); 
  }

  // change the user informations
  editAccount(user) {
    return this.http.put(this._accountUrl,user);
  }
}

