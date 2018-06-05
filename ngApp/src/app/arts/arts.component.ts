import { Component, OnInit } from '@angular/core';
import { ArtService } from "../services/art.service";
import { AuthService } from "../services/auth.service";
import { SearchService } from "../services/search.service";

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.css']
})

export class ArtsComponent implements OnInit {

  arts = [];
  filteredArts = [];
  query : String;
  displayedArts = [];

  constructor(private _artService: ArtService,
    private _authService: AuthService,
    private _searchService: SearchService) { }

  
  // On init get and display all arts of collection
  ngOnInit() {
    this._artService.getArts()
      .subscribe(
        res => {
          this.arts = res;
          this.displayedArts = this.arts;
        },
        err => alert(err.error)
      );
  }

  // Search with keyword in art collection and display selection
  searchArts() {
      this.filteredArts = this._searchService.search(this.arts, this.query); 
      this.displayedArts = this.filteredArts;
  }

  // End search and display all collection
  resetQuery() {
    this.query = '';
    this.displayedArts = this.arts;
  }
  
}
