import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor() { }

  
  // return array with elements matching the query
  search(array: any[], query: String) {
    if (!query) {
      return array;
    }
    const lQuery = query.toLowerCase();
    const filteredArray = array.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) return true;
        }
    });
    return filteredArray;
  }
}
