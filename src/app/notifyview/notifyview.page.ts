import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-notifyview',
  templateUrl: './notifyview.page.html',
  styleUrls: ['./notifyview.page.scss'],
})
export class NotifyviewPage implements OnInit {
  id:any;
  item:any;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public authService: AuthenticationService,
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const index = this.authService.notifications.findIndex(e => e.id === +this.id)
    if (index>=0){
      this.item = this.authService.notifications[index]
    }
  }

  back(){
    this.navCtrl.back()
  }

}
