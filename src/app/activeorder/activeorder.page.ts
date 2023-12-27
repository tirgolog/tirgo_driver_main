import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { Geolocation } from "@awesome-cordova-plugins/geolocation/ngx";
import { AlertController, LoadingController, ModalController, Platform } from "@ionic/angular";
import { Router } from "@angular/router";
import { SetraitingPage } from "../setraiting/setraiting.page";
import { log } from 'console';

@Component({
  selector: 'app-activeorder',
  templateUrl: './activeorder.page.html',
  styleUrls: ['./activeorder.page.scss'],
})
export class ActiveorderPage implements OnInit {
  item: any;
  loading: any;
  constructor(
    public authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private callNumber: CallNumber,
    public alertController: AlertController,
    public platform: Platform,
    private router: Router,
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
  ) {
  }

  ngOnInit() {
    this.item = this.authService.activeorder;
    this.item.transport_types = JSON.parse(this.item.transport_types)
  }
  async finishOrder(item) {
    const alert = await this.alertController.create({
      header: 'Вы уверены?',
      message: 'Вы действительно хотите завершить заказ?',
      cssClass: 'customAlert',
      buttons: [
        {
          text: 'Нет',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Да',
          handler: async () => {
            await alert.present();
            this.loading = await this.loadingCtrl.create({
              message: 'Завершаем заказ',
            });
            this.loading.present();
            this.geolocation.getCurrentPosition().then(async (resp) => {
              let res: any;
              if (item.isMerchant) {
                res = await this.authService.finishMerchantOrder(this.authService.activeorder.id, resp.coords.latitude.toString(), resp.coords.longitude.toString(), item.route?.to_city).toPromise();
              } else {
                res = await this.authService.finishOrder(this.authService.activeorder.id, resp.coords.latitude.toString(), resp.coords.longitude.toString()).toPromise();
              }
              const modal = await this.modalCtrl.create({
                component: SetraitingPage,
                swipeToClose: true,
                showBackdrop: true,
                breakpoints: [0, 0.6],
                initialBreakpoint: 0.6,
                presentingElement: await this.modalCtrl.getTop(),
                backdropDismiss: true,
                cssClass: 'modalCss',
                mode: 'ios',
                componentProps: {
                  orderid: this.authService.activeorder.id,
                  userid: this.authService.activeorder.user_id,
                }
              });
              await modal.present();
              if (res.status) {
                this.loading.dismiss();
                if (res.error) {
                  await this.authService.alert('Ошибка', res.error)
                }
                this.authService.activeorder = null;
                await this.router.navigate(['/tabs/home'], { replaceUrl: true });
              } else {
                this.loading.dismiss();
                await this.authService.alert('Ошибка', res.error)
              }
            }).catch(async (err) => {
              this.loading.dismiss();
              //this.authService.alert('Ошибка','Для завершения заказа нам нужно знать вашу геопозицию. Пожалуйста включите разрешение на использование местоположения в приложении Tirgo Driver')
            });
          }
        }
      ]
    });
    await alert.present();
  }
  callMan(phone: string) {
    console.log(phone)
    this.callNumber.callNumber('+' + phone, true)
  }
  returnNameTypeTransport(type: number) {
    const index = this.authService.typetruck.findIndex(e => +e.id === +type)
    if (index >= 0) {
      return this.authService.typetruck[index].name
    } else {
      return 'Не выбрано'
    }
  }
  returnNameCargoType(id: number) {
    const index = this.authService.typecargo.findIndex(e => +e.id === +id)
    if (index >= 0) {
      return this.authService.typecargo[index].name
    } else {
      return 'Не выбрано'
    }
  }
}
