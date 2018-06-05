import { Component, OnInit } from '@angular/core';
import { ArtService } from "../services/art.service";
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';

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

  
  // On init, display all the user arts from collection
  ngOnInit() {
    this._artService.getMyArts()
    .subscribe(
      res => {
        this.myArts = res.json();
        this.displayedArts = this.myArts;
      },
      err => alert(err.error)
    );
  }

  // Display only arts matching the query
  searchArts() {
    this.filteredArts = this._searchService.search(this.myArts, this.query); 
    this.displayedArts = this.filteredArts;
}

  // End search and display all collection
  resetQuery() {
  this.query = '';
  this.displayedArts = this.myArts;
}
  
}
