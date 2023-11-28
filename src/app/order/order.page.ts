import { Component, Input, OnInit } from '@angular/core';
import { addDays } from 'date-fns';
import { formatDate } from "@angular/common";
import { AuthenticationService } from "../services/authentication.service";
import { AlertController, LoadingController, ModalController } from "@ionic/angular";
import axios from "axios";
import { Geolocation } from "@awesome-cordova-plugins/geolocation/ngx";
import { log } from 'console';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  @Input('item') item: any;
  loadingAccept: boolean = false;
  price: string = '';
  selecteddays: any[] = [];
  loading: any;
  constructor(
    public authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    public alertController: AlertController,
    private geolocation: Geolocation,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }
  addDays(date: any, num: number) {
    return formatDate(new Date(addDays(date, num).toISOString()), 'dd MMMM', 'ru');
  }
  async acceptOrderFinalAccept(){
    let cityOrder = '';
    let cityUser = '';
    this.loading = await this.loadingCtrl.create({
      message: 'Проверяем геопозицию',
    });
    this.loading.present();
    this.loadingAccept = false;
    this.geolocation.getCurrentPosition().then(async (resp) => {
      const get = "https://geocode-maps.yandex.ru/1.x/?format=json&geocode=" + resp.coords.longitude.toString() + "," + resp.coords.latitude.toString() + "&apikey="+ this.authService.currentUser?.config.key_api_maps+"&lang=ru-RU"
      axios.get(get)
          .then( async res => {
            if (res.status){
              this.loading.dismiss();
              cityUser = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.description.split(',')[res.data.response.GeoObjectCollection.featureMember[0].GeoObject.description.split(',').length - 1]?.replace(' ','')
              cityOrder = this.item.route.from_city.split(',')[1]?.replace(' ','')
              if (cityUser === cityOrder){
                await this.authService.acceptOrder(this.item.id,this.price,this.selecteddays).toPromise()
                    .then(async (res) => {
                      if (res.status){
                        this.authService.myorders = await this.authService.getMyOrders().toPromise();
                        await this.modalController.dismiss({
                          accepted:true
                        })
                      }
                    })
                    .catch(async (err) => {

                    });
              }else {
                await this.authService.alert('Ошибка','К сожалению Вы не можете принять заказ. Вы не находитесь в городе отправки груза.')
                await this.modalController.dismiss({
                  accepted:false
                })
              }
            }
            else {
              this.loadingAccept = false;
              this.loading.dismiss();
              await this.authService.alert('Упс','Пожалуйста включите разрешение на использование местоположения в приложении Tirgo Driver')
            }
          })
          .catch(async(error) => {
            this.loading.dismiss();
            await this.authService.alert('Ошибка',error.toString())
          });
    }).catch(async (err) => {
      this.loadingAccept = false;
      this.loading.dismiss();
      await this.authService.alert('Упс','Пожалуйста включите разрешение на использование местоположения в приложении Tirgo Driver')
    });
    
  }

  async acceptOrderFinal() {
    this.loadingAccept = true;
    if (this.price) {
      const alert = await this.alertController.create({
        header: 'Внимание',
        message: 'Вы действительно хотите отправить предложение?',
        cssClass: 'customAlert',
        buttons: [
          {
            text: 'Нет',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.loadingAccept = false;
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Да',
            handler: () => {
              this.acceptOrderFinalAccept();
            }
          }
        ]
      });
      await alert.present();
    } else {
      await this.authService.alert('Упс', 'Требуется указать цену Ваше предложение по цене.');
      this.loadingAccept = false;
    }
  }
  findDay(num: number) {
    const index = this.selecteddays.findIndex(e => e === num)
    return index >= 0;
  }
  selectDay(num: number) {
    const index = this.selecteddays.findIndex(e => e === num)
    if (index >= 0) {
      this.selecteddays.splice(index, 1)
    } else {
      this.selecteddays.push(num)
    }
  }
}
