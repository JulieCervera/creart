import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ArtworkService } from "../services/artwork.service";
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})

export class PictureComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private _ArtworkService: ArtworkService,
    private http: HttpClient,
    private _router: Router) { }

  ngOnInit() { }

  // save image in application and create new art entry in database
  handleFileInput() {
    this._ArtworkService.postFile(this.fileToUpload)
    .subscribe(
      res => this._router.navigate(['upload'+ '/' + res])
    );
  }

  // select only the first image
  onFileSelected(event) {
    this.fileToUpload = <File>event.target.files[0];
  }

}
