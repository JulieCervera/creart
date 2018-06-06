import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  loginUserData = {
    email: '',
    password: '',
    _id:'',
  }

  constructor(private _auth: AuthService) {}

  ngOnInit() {}

  // delete user
  deleteAccount() {
    let userId = localStorage.getItem('local_token');
    this._auth.deleteAccount(userId)
    .subscribe(
      res => this._auth.logoutUser(),
      err => alert(err.error)
    )
  }

  // collect new user informations
  editAccount() {
    this.loginUserData._id = localStorage.getItem('local_token');
    this._auth.editAccount(this.loginUserData)
    .subscribe(
      res => alert('edited'),
      err => alert(err.error)
    )
  }

}

