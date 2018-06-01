import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from '../services/auth.service';
import { Options } from 'selenium-webdriver/safari';

@Injectable()
export class ArtService {

  private _artsUrl = 'http://localhost:3000/api/arts';
  private _myArtsUrl = 'http://localhost:3000/api/myArts';
  private _detailsUrl = 'http://localhost:3000/api/details';

  constructor(private http: HttpClient,
    private _authService: AuthService,
    private _http:Http) { }

  getArts() {
    return this.http.get<any>(this._artsUrl)
  }

  getArtDetails(artId) {
    let headers = new Headers();
    headers.append('artId', artId);
    let options = new RequestOptions();
    options.headers = headers;
    return this._http.get(this._detailsUrl, options);
  }
  
  getMyArts() {
    let userId = this._authService.getToken(); 
    let headers = new Headers();
    headers.append('userId', userId);
    let options = new RequestOptions();
    options.headers = headers;
    return this._http.get(this._detailsUrl, options)
  }


  deleteMyArt(artId) {
    let headers = new Headers();
    headers.append('artId', artId);
    let options = new RequestOptions();
    options.headers = headers;
    return this._http.delete(this._detailsUrl, options);
  }

  editMyArt(artId) {
    let headers = new Headers();
    headers.append('artId', artId);
    let options = new RequestOptions();
    options.headers = headers;
    return this._http.put(this._detailsUrl, options);
  }

}


