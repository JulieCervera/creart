import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


@Injectable()
export class ArtworkService {

  private _artworkUrl = 'http://localhost:3000/api/artwork'

  constructor(private http: HttpClient,
    private _authService: AuthService) { }

  addArtwork(newArtwork) {
    newArtwork.userId = this._authService.getToken();
    return this.http.post<any>(this._artworkUrl,newArtwork)
  }
}


