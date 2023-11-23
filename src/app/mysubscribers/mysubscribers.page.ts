import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-mysubscribers',
  templateUrl: './mysubscribers.page.html',
  styleUrls: ['./mysubscribers.page.scss'],
})
export class MysubscribersPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back()
  }
}
