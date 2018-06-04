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
    name: String,
    description: String,
    ville: String,
    _id: String,
    userId: String,
    _v: Number
  };

  constructor(private _artworkService: ArtworkService,
    private route: ActivatedRoute,
    private router: Router) { }
  

  ngOnInit() {
  }

  addArtwork() {
    this.newArtwork._id = this.route.snapshot.params["id"];
    console.log(this.newArtwork);    
    this._artworkService.addArtwork(this.newArtwork)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/user']);         

      },
      err => console.log(err)
    )
  }
}
