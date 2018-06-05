import { Component, OnInit } from '@angular/core';
import { ArtworkService } from "../services/artwork.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.css']
})

export class ArtworkComponent implements OnInit {
  
  newArtwork = {
    userId: String,
    name: '',
    author: 'Unknown',
    tags: '',
    address: '',
    ville: '',
    picture_path: String,
    _id: String,
    _v: Number
};

  constructor(private _artworkService: ArtworkService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit() { }

  // Add informations of the image uploaded previously to complete a new art entry in collection
  addArtwork() {
    this.newArtwork._id = this.route.snapshot.params["id"];
    // Set city value to uppercase
    this.newArtwork.ville = this.newArtwork.ville.toUpperCase(); 
    this._artworkService.addArtwork(this.newArtwork)
    .subscribe(
      res => this.router.navigate(['/user']),
      err => console.log(err)
    );
  }

}
