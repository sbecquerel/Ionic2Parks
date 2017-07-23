import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParkData } from '../../app/providers/park-data';
import { ParkDetailsPage } from '../park-details/park-details';
import { Park } from '../../app/interfaces/park';

/*
  Generated class for the ParkList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-park-list',
  templateUrl: 'park-list.html'
})
export class ParkListPage {

  parks: Array<Park> = []
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public parkData: ParkData) {
    parkData.getParks().then(parks => this.parks = parks);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkListPage');
  }

  goParkDetails(park) {
    this.navCtrl.push(ParkDetailsPage, { parkData: park });
  }

  getParks() {
    this.parkData.getParks().then(parks => this.parks = parks);

    if (this.searchQuery !== undefined) {
      if (this.searchQuery.trim() === '') {
        return;
      }

      this.parkData.getFilteredParks(this.searchQuery).then(parks => this.parks = parks);
    }
  }

  resetList() {
    this.parkData.getParks().then(parks => this.parks = parks);
  }

  customHeaderFn(record, recordIndex, records) {
    if (recordIndex > 0) {
      if (record.name.charAt(0) !== records[recordIndex - 1].name.charAt(0)) {
        return record.name.charAt(0);
      } else {
        return null;
      }
    } else {
      return record.name.charAt(0);
    }
  }
}
