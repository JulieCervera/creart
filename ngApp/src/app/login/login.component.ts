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
  loginUserData = {}
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
        .subscribe(
          res => {
            console.log(res)
            let token = res._id
            localStorage.setItem('local_token',token);
            this._router.navigate(['/user']);         
          },
          err => console.log(err)
        )
  }

}
