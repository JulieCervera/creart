import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArtService {

  private _artsUrl = 'http://localhost:3000/api/arts'
  constructor(private http: HttpClient) { }

  getArts() {
    return this.http.get<any>(this._artsUrl)
  }
  
}
