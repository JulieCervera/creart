import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ArtService } from "../services/art.service";
import { AuthService } from "../services/auth.service"

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

  isUserArt = false;
  
  constructor( private route: ActivatedRoute,
                private router: Router,
                private _artService: ArtService,
              private _authService: AuthService) { }

  ngOnInit() {
    this.art._id = this.route.snapshot.params["id"];
    this._artService.getArtDetails(this.art._id)
      .subscribe(
      res => {this.art = res.json(),
      err => console.log(err)
      )
    let userId = art.userId;
    let currentUserId = this._authService.getToken()
    console.log('userId', userId);
    console.log('currentUserId', currentUserId);
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
