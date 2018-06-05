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
    userId: '',
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
      res => {this.art = res.json();
      console.log(this.art);
      setTimeout(this.verifyUser(this.art), 1500);
    },
      err => console.log(err)
      );
  }
  verifyUser(art) {
    let userId = art.userId;
    let currentUserId = this._authService.getToken()
    console.log('userId', userId);
    console.log('currentUserId', currentUserId);
    if (userId == currentUserId) {
      this.isUserArt = true;
    } else {
      this.isUserArt = false;
    }
    }

  deleteMyArt() {
    this._artService.deleteMyArt(this.art)
    .subscribe(
      res => {
      this.router.navigate(['user']);   
      },
      err => console.log(err)
    )
  }

  editMyArt() {
    this._artService.editMyArt(this.art)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['user']);        
      },
      err => console.log(err)
    )
  }
}
