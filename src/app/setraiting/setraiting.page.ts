import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-setraiting',
  templateUrl: './setraiting.page.html',
  styleUrls: ['./setraiting.page.scss'],
})
export class SetraitingPage implements OnInit {
  @Input('orderid') orderid: any;
  @Input('userid') userid: any;
  star:number = 5;
  comment:string = '';
  constructor(
      private authService: AuthenticationService,
      private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }
  async setRaiting(){
    const res = await this.authService.setRaiting(this.orderid,this.star,this.comment,this.userid).toPromise();
    if (res.status){
      await this.authService.alert('Отлично','Спасибо что оценили клиента.')
      await this.modalCtrl.dismiss();
    }
  }
}
