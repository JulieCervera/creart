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

  ngOnInit() {
    this._artService.getArts()
      .subscribe(
        res => {this.arts = res, 
        this.displayedArts = this.arts,
        console.log(this.arts);
        console.log(this.displayedArts);
        },
        err => console.log(err)
      )
  }

  searchArts() {
      this.filteredArts = this._searchService.search(this.arts, this.query); 
      this.displayedArts = this.filteredArts;
  }

  resetQuery() {
    this.query = '';
    this.displayedArts = this.arts;
  }
}
