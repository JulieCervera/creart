import { Component, OnInit } from '@angular/core';
import { ArtworkService } from "../services/artwork.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.css']
})

export class ArtworkComponent implements OnInit {
  newArtwork = {};

  form: FormGroup;

  constructor(private _artworkService: ArtworkService,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        ville: ['', Validators.required],
        files: ['', Validators.required],
      });
     }
  

  ngOnInit() {
  }

  onSubmit() {
  
    this._artworkService.addArtwork(this.newArtwork)
    .subscribe(
      res => {
        console.log(res);
        
        // appel fonction upload picture avec id (res.artwork.id) => model artwork
        // redirect page artwork avec le model artwork retourné
        console.log(this.form.value);


      },
      err => console.log(err)
    )
  
}
}
