import { Component, OnInit } from '@angular/core';
import { ArtService } from "../services/art.service";
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';
import { Observable } from "rxjs/Rx";



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  myArts = [];
  filteredArts = [];
  query : String;
  displayedArts = [];

  constructor(private _artService: ArtService,
    private _authService: AuthService,
    private _searchService: SearchService) { }


  ngOnInit() {
    this._artService.getMyArts()
    .subscribe(
      res => {
        this.myArts = res.json();
        this.displayedArts = this.myArts;
      },
      err => console.log(err)
    )
  }

  searchArts() {
    this.filteredArts = this._searchService.search(this.myArts, this.query); 
    this.displayedArts = this.filteredArts;
}

resetQuery() {
  this.query = '';
  this.displayedArts = this.myArts;
}
  
}
