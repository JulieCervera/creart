import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from "../services/auth.service";

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

  deleteAccount() {
    let userId = localStorage.getItem('local_token');
    this._auth.deleteAccount(userId).
    subscribe(
      res => {
        console.log(res),
        this._auth.logoutUser();
      },
      err => console.log(err)
    )
  }

  editAccount() {
    this.loginUserData._id = localStorage.getItem('local_token');
    console.log(this.loginUserData);    
    this._auth.editAccount(this.loginUserData)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      )
  }

}

