import { Component, OnInit } from '@angular/core';
import { ArtService } from "../services/art.service";


@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.css']
})
export class ArtsComponent implements OnInit {

  arts = [];
  constructor(private _artService: ArtService) { }

  ngOnInit() {
    this._artService.getArts()
      .subscribe(
        res => this.arts = res,
        err => console.log(err)
      )
  }
}
