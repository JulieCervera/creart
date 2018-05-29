import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArtworkService {

  private _artworkUrl = 'http://localhost:3000/api/artwork'

  constructor(private http: HttpClient) { }

  addArtwork(newArtwork) {
    return this.http.post<any>(this._artworkUrl,newArtwork)
  }
}


