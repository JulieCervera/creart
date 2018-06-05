import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerUserData = {};


  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() { }

  // Create un new user of the application
  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          let token = res._id;
          localStorage.setItem('local_token', token);
          this._router.navigate(['/arts']);
        },
        err => alert(err.error)
      )
  }
}
