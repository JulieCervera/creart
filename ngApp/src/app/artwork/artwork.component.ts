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
  
  newArtwork = {};

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


// export class ArtworkComponent implements OnInit {
//   newArtwork = {};
//   dataArtwork = {
//     name: '',
//     description: '',
//     ville: '',
//     files: {}
//   };

//   form: FormGroup;
//   fileToUpload: File = null;


//   constructor(private _artworkService: ArtworkService,
//     private fb: FormBuilder) {
//       this.form = this.fb.group({
//         name: ['', Validators.required],
//         description: ['', Validators.required],
//         ville: ['', Validators.required],
//         files: ['', Validators.required],
//       });
//      }
  

//   ngOnInit() {
//   }

//   handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
//   }

//   onSubmit() {
//     // this.form.controls.files.value = this.fileToUpload;
//     // this.dataArtwork.description = this.form.controls.description.value;
//     // this.dataArtwork.name = this.form.controls.name.value;
//     // this.dataArtwork.ville = this.form.controls.ville.value
//     // this.dataArtwork.files = this.form.controls.files.value;
//     console.log(this.form);

//     this._artworkService.addArtwork(this.dataArtwork)
//     .subscribe(
//       res => {
//         console.log(this.dataArtwork);
//         console.log(res);
//         // this._artworkService.postFile(this.fileToUpload, res.artwork['_id']).subscribe(res => {
//         //   console.log(res);
//         // })
//         // appel fonction upload picture avec id (res.artwork.id) => model artwork
//         // redirect page artwork avec le model artwork retourné

//       },
//       err => console.log(err)
//     )
  
// }
// }
