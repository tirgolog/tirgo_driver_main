import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-selectstatus',
  templateUrl: './selectstatus.page.html',
  styleUrls: ['./selectstatus.page.scss'],
})
export class SelectstatusPage implements OnInit {

  constructor(
      private modalController: ModalController,
      public authService: AuthenticationService,
  ) { }

  ngOnInit() {
  }
  async close(){
    await this.modalController.dismiss({

    })
  }
  async setStatus(status:any){
    console.log(status)
    const res = await this.authService.setBusy(status).toPromise();
    if (res.status){
      this.authService.currentUser.busy = status;
      await this.close();
    }
    console.log(status)
  }
}
