import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ArtService {

  private _artsUrl = 'http://localhost:3000/api/arts';
  private _myArtsUrl = 'http://localhost:3000/api/myArts'
  constructor(private http: HttpClient,
    private _authService: AuthService,
    private _http:Http) { }

  getArts() {
    return this.http.get<any>(this._artsUrl)
  }

  // getArtDetail(id) {
  //   return this.http.get<any>(this._artsUrl + '/' + id);
  // }
  
  getMyArts() {
    let userId = this._authService.getToken(); 
    let headers = new Headers();
    headers.append('userId', userId);
    let options = new RequestOptions();
    options.headers = headers;
    return this._http.get(this._myArtsUrl, options)
  }

}


