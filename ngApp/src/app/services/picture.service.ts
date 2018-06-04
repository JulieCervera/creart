import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PictureService {
  private _pictureUrl = 'http://localhost:3000/api/artwork/file';


  constructor(private http: HttpClient,) { }

  getPicture(id) {
    return this.http.get<any>(this._pictureUrl+'/'+id)
  }

}
