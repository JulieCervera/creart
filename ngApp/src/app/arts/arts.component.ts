import { Component, OnInit } from '@angular/core';
import { ArtService } from "../services/art.service";
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.css']
})
export class ArtsComponent implements OnInit {

  arts = [];
  constructor(private _artService: ArtService,
    private _authService: AuthService) { }

  ngOnInit() {
    this._artService.getArts()
      .subscribe(
        res => this.arts = res,
        err => console.log(err)
      )
  }
}
