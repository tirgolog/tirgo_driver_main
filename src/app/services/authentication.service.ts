import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../user';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController} from "@ionic/angular";
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer/ngx";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";

const TOKEN_KEY = 'jwttirgotoken';
const API_URL = 'https://admin.tirgo.io/api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject({});
  geolocationCheck:boolean = false;
  public API_URL: string = 'https://admin.tirgo.io/api';
  public currentUser: User | undefined;
  public viewintro: boolean = false
  static jwt: any;
  public language: string = "ru";
  public addresses: any[] = [];
  public mytruck: any[]=[];
  public contacts: any[]=[];
  public typetruck: any[] = [];
  public myorders: any[] = [];
  public myarchiveorders: any[] = [];
  public currency: any[] = [];
  public statuses: any[] = [];
  public activeorder:any;
  public typecargo: any[] = [];
  public notifications: any[] = [];
  public messages: any[] = [];
  public allordersfree: any[] = [];
  public allmyordersprocessing: any[] = [];
  public cityinfo:string = '';
  public optionsCamera: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private iab: InAppBrowser,
    private storage: Storage,
    public camera: Camera,
    public transfer: FileTransfer,
  ) {
  }
  goToSupport(){
    this.iab.create('https://t.me/tirgosupportbot','_system');
  }
  addLeadingZeros(num:number) {
    return String(num).padStart(6, '0');
  }

  loginUser(phone: string,country_code:string) {
    const sUrl = API_URL + '/users/login';
    const body = JSON.stringify({
      phone,country_code
    });
    return this.http.post<any>(sUrl, body);
  }
  verifyCode(phone: string,code:string) {
    const sUrl = API_URL + '/users/codeverify';
    const body = JSON.stringify({
      phone,code
    });
    return this.http.post<any>(sUrl, body);
  }
  regUser(name: string) {
    const sUrl = API_URL + '/users/regUser';
    const body = JSON.stringify({
      name
    });
    return this.http.post<any>(sUrl, body);
  }

  checkSession() {
    const sUrl = API_URL + '/users/checkSession';
    return this.http.get<any>(sUrl);
  }

  updateLocation(lat: string, lng: string) {
    const sUrl = API_URL + '/users/updateLocationDriver';
    const body = JSON.stringify({
      lat,lng
    });
    return this.http.post<any>(sUrl, body);
  }
  setBusy(busy:any) {
    const sUrl = API_URL + '/users/setBusy';
    const body = JSON.stringify({
      busy
    });
    return this.http.post<any>(sUrl, body);
  }

  findCity(query:any): Observable<any[]> {
    const sUrl = API_URL + '/users/findCity';
    const body = JSON.stringify({
      query
    });
    return this.http.post<any>(sUrl, body)
        .pipe(map(res => {
          console.log(res)
          if (res.status) {
            return res.data.suggestions;
          } else {
            return [];
          }
        }));
  }

  acceptOrder(orderid:number,price:string,dates:any){
    const sUrl = API_URL + '/users/acceptOrderDriver';
    const body = JSON.stringify({
      orderid,price,dates
    });
    return this.http.post<any>(sUrl, body);
  }
  cancelOrder(item:any){
    const sUrl = API_URL + '/users/cancelOrderDriver';
    const body = JSON.stringify({
      item
    });
    return this.http.post<any>(sUrl, body);
  }
  finishOrder(id:number,lat:string,lng:string){
    const sUrl = API_URL + '/users/fonishOrderDriver';
    const body = JSON.stringify({
      id,lat,lng
    });
    return this.http.post<any>(sUrl, body);
  }

  saveCityInfo(city: any) {
    const sUrl = API_URL + '/users/saveCityInfo';
    const body = JSON.stringify({
      city
    });
    return this.http.post<any>(sUrl, body);
  }

  setAdrUser(enable: any) {
    const sUrl = API_URL + '/users/setAdrUser';
    const body = JSON.stringify({
      enable
    });
    return this.http.post<any>(sUrl, body);
  }

  setDateBirthday(date: any) {
    const sUrl = API_URL + '/users/setDateBirthday';
    const body = JSON.stringify({
      date
    });
    return this.http.post<any>(sUrl, body);
  }
  addContact(phone: string,telegram:boolean,whatsapp:boolean,viber:boolean) {
    const sUrl = API_URL + '/users/addContact';
    const body = JSON.stringify({
      phone,telegram,whatsapp,viber
    });
    return this.http.post<any>(sUrl, body);
  }
  verifyNewContact(phone: string,code:string) {
    const sUrl = API_URL + '/users/verifyNewContact';
    const body = JSON.stringify({
      phone,code
    });
    return this.http.post<any>(sUrl, body);
  }
  delContact(id: number) {
    const sUrl = API_URL + '/users/delContact';
    const body = JSON.stringify({
      id
    });
    console.log(body)
    return this.http.post<any>(sUrl, body);
  }
  saveDeviceToken(token: any) {
    const sUrl = API_URL + '/users/saveDeviceToken';
    const body = JSON.stringify({
      token_device: token
    });
    console.log(body)
    return this.http.post<any>(sUrl, body);
  }
  delTransport(id: number) {
    const sUrl = API_URL + '/users/delTransport';
    const body = JSON.stringify({
      id
    });
    return this.http.post<any>(sUrl, body);
  }
  addTransport(name:string,description:string,maxweight:number,type:number,car_photos:any,license_files:any,tech_passport_files:any,adr:boolean,cubature:string,state_number:string) {
    const sUrl = API_URL + '/users/addTransport';
    const body = JSON.stringify({
      name,description,maxweight,type,car_photos,license_files,tech_passport_files,adr,cubature,state_number
    });
    return this.http.post<any>(sUrl, body);
  }
  editTransport(name:string,description:string,maxweight:number,type:number,adr:boolean,id:number,car_photos:any,license_files:any,tech_passport_files:any,cubature:string,state_number:string) {
    const sUrl = API_URL + '/users/editTransport';
    const body = JSON.stringify({
      name,description,maxweight,type,adr,id,car_photos,license_files,tech_passport_files,cubature,state_number
    });
    return this.http.post<any>(sUrl, body);
  }


  getTruck() {
    const sUrl = API_URL + '/users/getMyTrack';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getMessages() {
    const sUrl = API_URL + '/users/getAllMessages';
    return this.http.get<any>(sUrl)
        .pipe(map(res => {
          console.log(res)
          if (res.data) {
            return res.data;
          } else {
            return [];
          }
        }));
  }
  sendMessage(message:string){
    const sUrl = API_URL + '/users/sendMessageSupport';
    const body = JSON.stringify({
      message
    });
    return this.http.post<any>(sUrl, body);
  }
  delPhotoUser(file:string){
    const sUrl = API_URL + '/users/delPhotoUser';
    const body = JSON.stringify({
      filename:file
    });
    return this.http.post<any>(sUrl, body);
  }
  getContacts() {
    const sUrl = API_URL + '/users/getContacts';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res.status) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getTypeCargo() {
    const sUrl = API_URL + '/users/getTypeCargo';
    return this.http.get<any>(sUrl)
        .pipe(map(res => {
          if (res.status) {
            return res.data;
          } else {
            return [];
          }
        }));
  }
  getTypeTruck() {
    const sUrl = API_URL + '/users/getTypeTruck';
    return this.http.get<any>(sUrl)
        .pipe(map(res => {
          console.log(res)
          if (res.status) {
            return res.data;
          } else {
            return [];
          }
        }));
  }

  getMyOrders() {
    const sUrl = API_URL + '/users/getMyOrdersDriver';
    return this.http.get<any>(sUrl)
        .pipe(map(res => {
          if (res.status) {
            return res.data;
          } else {
            return [];
          }
        }));
  }

  getMyArchiveOrders() {
    const sUrl = API_URL + '/users/getMyArchiveOrdersDriver';
    return this.http.get<any>(sUrl)
        .pipe(map(res => {
          if (res.status) {
            return res.data;
          } else {
            return [];
          }
        }));
  }

  getCurrency() {
    const sUrl = API_URL + '/users/getCurrency';
    return this.http.get<any>(sUrl)
        .pipe(map(res => {
          if (res.status) {
            return res.data;
          } else {
            return [];
          }
        }));
  }
  getStatuses() {
    const sUrl = API_URL + '/users/getStatuses';
    return this.http.get<any>(sUrl)
        .pipe(map(res => {
          if (res.status) {
            return res.data;
          } else {
            return [];
          }
        }));
  }


  getNotification() {
    const sUrl = API_URL + '/users/getNotifyDriver';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        console.log(res)
        if (res.status) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getAllOrdersFree() {
    const sUrl = API_URL + '/truck-booking/orders';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        console.log(res)
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      }));
  }
  getAllMyOrdersProcessing() {
    const sUrl = API_URL + '/truck-booking?status=processing';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        console.log(res)
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      }));
  }
  getAllMyOrdersDone() {
    const sUrl = API_URL + '/truck-booking?status=done';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        console.log(res)
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      }));
  }





  setJwt(jwt: string) {
    AuthenticationService.jwt = jwt;
    this.storage.set(TOKEN_KEY, jwt);
    this.authenticationState.next(true);
  }


  async alert(header: string, text: string) {
    const alert = await this.alertController.create({
      header: header,
      message: text,
      cssClass: 'customAlert',
      buttons: [{
        text: 'Хорошо',
        handler: async () => {
        }
      }]
    });
    await alert.present();
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        AuthenticationService.jwt = res;
        this.authenticationState.next(true);
        return true;
      } else {
        this.authenticationState.next(false);
        return false;
      }
    });
  }



  logout() {
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  sendNum(phone: string) {
    const sUrl = API_URL + 'users/login';
    const body = JSON.stringify({
      phone: phone
    });
    return this.http.post<any>(sUrl, body);
  }

  addBalance(amount: string) {
    const sUrl = API_URL + '/users/addBalance';
    const body = JSON.stringify({
      amount
    });
    return this.http.post<any>(sUrl, body);
  }
  setRaiting(orderid: string,star: number,comment: string,userid:string) {
    const sUrl = API_URL + '/users/setRaitingUser';
    const body = JSON.stringify({
      orderid,star,comment,userid
    });
    return this.http.post<any>(sUrl, body);
  }

  codeNum(code: string, phone: string) {
    const sUrl = API_URL + 'users/codeverify';
    const body = JSON.stringify({
      code: code,
      phone: phone
    });
    return this.http.post<any>(sUrl, body);
  }


}
