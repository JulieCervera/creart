import { Component, OnInit } from '@angular/core';
import { ArtworkService } from "../services/artwork.service";

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.css']
})

export class ArtworkComponent implements OnInit {
  newArtwork = {};

  constructor(private _artworkService: ArtworkService) { }
  

  ngOnInit() {
  }

  addArtwork(newArtwork) {
    this._artworkService.addArtwork(newArtwork)
    .subscribe(
      res => {
        console.log(res)       
      },
      err => console.log(err)
    )
  }
}
