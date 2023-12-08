import { Component, OnInit, ViewChild } from '@angular/core';
import {AlertController, IonInput, ModalController, NavController, Platform} from "@ionic/angular";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {AuthenticationService} from "../../services/authentication.service";
import {AppComponent} from "../../app.component";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phone:string = '';
  //phone:string = '(93) 542-13-24';
  code:string = '';
  timer:number = 59;
  codeon:boolean = false;
  error:boolean = false;
  policy:boolean = false;
  offer:boolean = false;
  prefix:string = '+998';
  flag:string = '🇺🇿';
  mask:string = ' (00) 000-00-00';
  country_code:string = 'UZ';
  phone_length:number = 0;
  searchinput:string = '';
  phonescodesOriginal:any;
  phonescodes:any;
  loading:boolean = false;
  @ViewChild('passInput') passInput: IonInput;
  constructor(
    private router: Router,
    private app: AppComponent,
    private modalCtrl:ModalController,
    private httpClient: HttpClient,
    public authService: AuthenticationService,
    private navCtrl: NavController,
    public alertController: AlertController,
    private platform: Platform,
  ) { 
    this.platform.ready().then(() => {
      this.setAutocompleteAttribute();
    });
  }

  ngOnInit() : void {
    this.getJSONFromLocal().subscribe(
        data => {
          this.phonescodesOriginal = data;
          this.phonescodes = this.phonescodesOriginal;
        },
        error => console.error(`Failed because: ${error}`));
  }

  setAutocompleteAttribute() {
    if (this.passInput) {
      const nativeInput = this.passInput.getInputElement();
      if (nativeInput) {
        nativeInput.then((input: HTMLInputElement) => {
          input.autocomplete = 'one-time-code';
        });
      }
    }
  }
  public getJSONFromLocal(): Observable<any> {
    return this.httpClient.get("./assets/json/phone.json");
  }
  back(){
    this.navCtrl.back()
  }
  async recoverLogin(){
    await this.router.navigate(['recoverlogin']);
  }
  async signIn(){
    this.loading = true;
    if (this.phone.length < this.mask.length){
      await this.authService.alert('Ошибка','Введите корректный номер телефона')
      this.loading = false;
    }else if (!this.offer){
      await this.authService.alert('Ошибка','Требуется принять публичную оферту')
      this.loading = false;
    }else if(!this.policy){
      await this.authService.alert('Ошибка','Требуется принять политику конфиденциальности')
      this.loading = false;
    }else {
      await this.authService.loginUser(this.prefix + '' + this.phone,this.country_code).toPromise()
          .then(async (res) => {
            if (res.status){
              this.codeon = true;
              this.loading = false;
              this.timer = 59;
              setInterval(() => {
                if (this.timer > 0){
                  this.timer = this.timer - 1
                }
              }, 1000);
            }
            this.error = false;
          })
          .catch(async (err) => {
            this.loading = false;
            this.error = true;
          });
    }
  }
  async verifyCode(){
    this.loading = true;
    await this.authService.verifyCode(this.prefix + '' + this.phone,this.code).toPromise()
      .then(async (res) => {
        if (res.status){
          await this.authService.setJwt(res.token);
          await this.app.checkSession()
          this.loading = false;
        }else {
          await this.authService.alert('Ошибка',res.text)
          this.loading = false;
        }
        this.error = false;
      })
      .catch(async (err) => {
        this.loading = false;
        this.error = true;
      });
  }
  findPhoneCode(ev:any){
    this.searchinput = ev.target.value
    this.phonescodes = this.phonescodesOriginal.filter((row:any) => {
      return !row.name ? row.name: row.name.toLowerCase().includes(this.searchinput.toLowerCase()) ||
      !row.code ? row.code: row.code.toLowerCase().includes(this.searchinput.toLowerCase()) ||
      !row.dial_code ? row.dial_code: row.dial_code.toLowerCase().includes(this.searchinput.toLowerCase());
    });
  }
  selectCode(item:any){
    this.modalCtrl.dismiss();
    this.prefix = item.dial_code;
    this.flag = item.flag;
    this.mask = item.mask ? item.mask:' (00) 000-00-00';
    this.country_code = item.code
  }

}
