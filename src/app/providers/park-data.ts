import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParkData {
  data: any = null;

  constructor(public http: Http) {

  }

  load() {
    if (this.data) {
        return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('assets/data/data.json')
          .map(res => res.json())
          .subscribe(data => {
              this.data = data;
              resolve(this.data);
          });
    });
  }

  getParks() {
    return this.load().then(data => data);
  }

  getFilteredParks(queryString) {
    return this.load().then(parks => {
      let filteredParks: any = [];
      
      queryString = queryString.trim().toLowerCase();
      for (let thePark of parks) {
        if (thePark.name.toLowerCase().indexOf(queryString) > -1) {
          filteredParks.push(thePark);
        }
      }

      return filteredParks;
    });
  }
}