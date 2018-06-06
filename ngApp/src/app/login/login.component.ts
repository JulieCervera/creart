import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginUserData = {};

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() { }

  // check if login informations are correct, if yes store user id in local storage 
  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          let token = res._id
          localStorage.setItem('local_token', token);
          this._router.navigate(['/arts']);
        },
        err => alert(err.error)
      );
  }

}
