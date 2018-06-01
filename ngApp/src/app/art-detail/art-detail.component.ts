import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ArtService } from "../services/art.service";

@Component({
  selector: 'app-art-detail',
  templateUrl: './art-detail.component.html',
  styleUrls: ['./art-detail.component.css']
})
export class ArtDetailComponent implements OnInit {

  art = {
    name: String,
    description: String,
    ville: String,
    _id: String,
    userId: String,
    _v: Number
  } 
  
  constructor( private route: ActivatedRoute,
                private router: Router,
                private _artService: ArtService) { }

  ngOnInit() {
    this.art._id = this.route.snapshot.params["id"];
    this._artService.getArtDetails(this.art._id)
      .subscribe(
       res => this.art = res.json(),
        // res => console.log(res),
        err => console.log(err)
      )
  }

  deleteMyArt() {
    this._artService.deleteMyArt(this.art)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/arts']);   
      },
      err => console.log(err)
    )
  }

  

}
