import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {AuthenticationService} from "../services/authentication.service";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  selectmethodpay: string = 'click'
  amount:string = '';
  payConfirm: boolean = false;
  constructor(
    private iab: InAppBrowser,
    private navCtrl: NavController,
    public authService:AuthenticationService,
    public socketService: SocketService
  ) { }

  ngOnInit() {
    this.updateDriverBalance();
  }
  back(){
    this.navCtrl.back()
  }
  async pay(){
    if (this.amount){
      if (this.selectmethodpay === 'click'){
        this.iab.create('https://my.click.uz/services/pay?service_id=24721&merchant_id=17235&amount='+this.amount+'&transaction_param='+this.authService.currentUser!.id,'_system');
      }else if(this.selectmethodpay === 'apelsin'){
        /*if (this.expiry_date_card && this.card_number){
          const res = await this.authService.getTokenCardApelsin(this.expiry_date_card,this.card_number).toPromise()
          console.log(res)
        } else {
          const alert = await this.alertController.create({
            header: 'Ошибка',
            message: 'Введите данные карты',
            buttons: ['OK']
          });
          await alert.present();
        }*/
      }else if(this.selectmethodpay === 'payme'){
        let base64 = btoa("m=636ca5172cfb25761a99e6af;ac.UserID="+this.authService.currentUser.id+";a="+this.amount+"00");
        this.iab.create('https://checkout.paycom.uz/'+base64,'_system');
      }
    }else {
      await this.authService.alert('Ошибка','Минимальная сумма оплаты 1000 UZS')
    }
  }

  async withdrawFromActivebalance() {
    if(this.authService.currentUser.balance > 0) {
      this.authService.withdrawBalance(this.authService.currentUser.id).subscribe((res: any) => {
        if(res) {
          this.payConfirm = true;
        }
      });
    } else {
      await this.authService.alert('Ошибка','У вас нет активного баланса')
    }
  }

  updateDriverBalance() {
    this.socketService.updateDriverBalance().subscribe((res:any) => {
      if(res) {
        const data = JSON.parse(res);
        this.authService.currentUser.balance = data.balance;
        this.authService.currentUser.balance_off = data.balance_off;
        this.authService.currentUser.balance_in_proccess = data.balance_in_proccess;
      }
    })
  }
}
