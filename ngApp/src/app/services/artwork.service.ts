import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


@Injectable()
export class ArtworkService {

  private _artworkUrl = 'http://localhost:3000/api/upload'

  constructor(private http: HttpClient, 
  private _authService : AuthService ) { }

  addArtwork(newArtwork) {
    let userId = this._authService.getToken(); 
    newArtwork.userId = userId;
    console.log(newArtwork);   
    return this.http.put<any>(this._artworkUrl, newArtwork);
  }


  postFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
    return this.http.post(this._artworkUrl, formData);
  }
}




