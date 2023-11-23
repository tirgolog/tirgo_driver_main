import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {AlertController, Platform} from "@ionic/angular";
import {ThemeService} from "./services/theme.service";
import {AuthenticationService} from "./services/authentication.service";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import {TranslateService} from "@ngx-translate/core";
import {User} from "./user";
import {PushService} from "./services/push.service";
import {SocketService} from "./services/socket.service";
import {Network} from "@ionic-native/network/ngx";
import axios from "axios";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private socketService: SocketService,
    private network: Network,
    private pushService: PushService,
    private themeService: ThemeService,
    public authService: AuthenticationService,
    private storage: Storage,
    private translateService: TranslateService,
    public alertController: AlertController,
    private router: Router,
    private geolocation: Geolocation,
  ) {
    this.initializeApp();
    setInterval(()=>{
      this.geolocation.getCurrentPosition().then(async (resp) => {
        if (this.authService.isAuthenticated()) {
          await this.authService.updateLocation(resp.coords.latitude.toString(),resp.coords.longitude.toString()).toPromise();
        }
      })
    },1800000)
  }

  async ngOnInit() {
    await this.storage.create();
    await this.storage.get('language').then(val => {
      if (val === 'ru') {
        this.authService.language = 'ru'
        this.translateService.use('ru')
      } else if (val === 'tr') {
        this.authService.language = 'tr'
        this.translateService.use('tr')
      } else if (val === 'en') {
        this.authService.language = 'en'
        this.translateService.use('en')
      } else {
        this.authService.language = 'ru'
        this.translateService.use('ru')
      }
    });
    await this.authService.checkToken();
    this.authService.authenticationState.subscribe(async res => {
      if (res) {
        await this.checkSession();
      } else {
        await this.router.navigate(['selectlanguage'], {replaceUrl: true});
      }
    })
  }
  async checkSession(){
    await this.authService.checkSession().toPromise().then(async (res) => {
      if (res.status){
        this.authService.currentUser = new User(res.user);
        if (!this.authService.isAuthenticated()) {
          this.authService.authenticationState.next(true);
        }
        console.log(this.authService.currentUser.name)
        if (this.authService.currentUser.name !== null){
          this.socketService.connect();
          if (this.platform.is('cordova')) {
            this.pushService.init();
          }
          this.authService.typetruck = await this.authService.getTypeTruck().toPromise();
          this.authService.typecargo = await this.authService.getTypeCargo().toPromise();
          this.authService.mytruck = await this.authService.getTruck().toPromise();
          this.authService.contacts = await this.authService.getContacts().toPromise();
          this.authService.myorders = await this.authService.getMyOrders().toPromise();
          this.authService.myarchiveorders = await this.authService.getMyArchiveOrders().toPromise();
          this.authService.currency = await this.authService.getCurrency().toPromise();
          this.authService.statuses = await this.authService.getStatuses().toPromise();
          for (let row of this.authService.myorders){
            const index = this.authService.myorders.findIndex(e => e.id === row.id && row.status === 1)
            if (index>=0){
              const indexuser = this.authService.myorders[index].orders_accepted.findIndex((user: {
                status_order: number | undefined;
                id: number | undefined;
              }) => user.id === this.authService.currentUser?.id && user.status_order === 1)
              if (indexuser>=0){
                this.authService.activeorder = this.authService.myorders[index];
                this.authService.myorders.splice(index,1)
              }
            }
          }
          this.socketService.updateAllOrders().subscribe(async (res:any) => {
            this.authService.myorders = await this.authService.getMyOrders().toPromise();
            for (let row of this.authService.myorders){
              const index = this.authService.myorders.findIndex(e => e.id === row.id && row.status === 1)
              if (index>=0){
                const indexuser = this.authService.myorders[index].orders_accepted.findIndex((user: {
                  status_order: number | undefined;
                  user_id: number | undefined;
                }) => user.user_id === this.authService.currentUser?.id && user.status_order === 1)
                if (indexuser>=0){
                  this.authService.activeorder = this.authService.myorders[index];
                  this.authService.myorders.splice(index,1)
                }
              }
            }
            await this.checkSession();
          });
          this.authService.notifications = await this.authService.getNotification().toPromise();
          this.authService.messages = await this.authService.getMessages().toPromise();
          this.socketService.updateAllMessages().subscribe(async (res:any) => {
            this.authService.messages = await this.authService.getMessages().toPromise();
          })
          //this.authService.allordersfree = await this.authService.getAllOrdersFree().toPromise();
          //this.authService.allmyordersprocessing = await this.authService.getAllMyOrdersProcessing().toPromise();
          await this.router.navigate(['/tabs/home'], {replaceUrl: true});
          this.geolocation.getCurrentPosition().then(async (resp) => {
            this.authService.geolocationCheck = true;
            console.log(this.authService.geolocationCheck)
            await this.authService.updateLocation(resp.coords.latitude.toString(),resp.coords.longitude.toString()).toPromise();
            const get = "https://geocode-maps.yandex.ru/1.x/?format=json&geocode=" + resp.coords.longitude.toString() + "," + resp.coords.latitude.toString() + "&apikey="+ this.authService.currentUser?.config.key_api_maps+"&lang=ru-RU"
            axios.get(get)
                .then( res => {
                  if (res.status){
                    this.authService.cityinfo = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.description;
                    console.log(res.data.response.GeoObjectCollection.featureMember[0].GeoObject.description)
                    console.log(res.data.response.GeoObjectCollection.featureMember[0].GeoObject.name)
                  }
                })
                .catch(async(error) => {
                  await this.authService.alert('Ошибка','Для получения заказов нам нужно знать вашу геопозицию. Пожалуйста включите разрешение на использование местоположения в приложении Tirgo Driver')
                });
          }).catch(async(error) => {
            await this.authService.alert('Ошибка','Для получения заказов нам нужно знать вашу геопозицию. Пожалуйста включите разрешение на использование местоположения в приложении Tirgo Driver')
          });
        }else {
          console.log('here')
          await this.router.navigate(['/name'], {replaceUrl: true});
        }
      }else {
        this.authService.authenticationState.next(false);
        await this.router.navigate(['selectlanguage'], {replaceUrl: true});
      }
    }).catch(async (err)=>{
      this.authService.authenticationState.next(false);
      await this.router.navigate(['selectlanguage'], {replaceUrl: true});
    })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.network.onDisconnect().subscribe(() => {
        console.log('onDisconnect')
        this.router.navigate(['noconnect'], {replaceUrl: true});
      });
      this.network.onConnect().subscribe(() => {
        console.log('onConnect')
        if (this.authService.isAuthenticated()){
          this.router.navigate(['tabs','home'], {replaceUrl: true});
        }else {
          this.router.navigate(['selectlanguage'], {replaceUrl: true});
        }
      });
      this.themeService.restore();
    });
  }
}
