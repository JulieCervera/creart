import { Component, OnInit } from '@angular/core';
import { ArtService } from "../services/art.service";
import { AuthService } from '../services/auth.service';
import { Observable } from "rxjs/Rx";



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  myArts = new Array();

  constructor(private _artService: ArtService,
    private _authService: AuthService) { }


  ngOnInit() {
    this._artService.getMyArts().
    subscribe(
      res => this.myArts = res.json(),
      err => console.log(err)
    )
  }
}
