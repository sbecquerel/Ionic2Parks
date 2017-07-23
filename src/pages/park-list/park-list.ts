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

  constructor(public navCtrl: NavController, public navParams: NavParams, public parkData: ParkData) {
    parkData.getParks().then(parks => this.parks = parks);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkListPage');
  }

  goParkDetails(park) {
    this.navCtrl.push(ParkDetailsPage, { parkData: park });
  }
}
