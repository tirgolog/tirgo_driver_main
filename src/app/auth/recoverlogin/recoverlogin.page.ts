import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-recoverlogin',
  templateUrl: './recoverlogin.page.html',
  styleUrls: ['./recoverlogin.page.scss'],
})
export class RecoverloginPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back()
  }
}
