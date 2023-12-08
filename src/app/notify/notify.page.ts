import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.page.html',
  styleUrls: ['./notify.page.scss'],
})
export class NotifyPage implements OnInit {
  Date = new Date().toLocaleDateString()
  constructor(
    private navCtrl: NavController,
    public authService: AuthenticationService,
    private router: Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    // this.presentActionSheet()
  }
  back() {
    this.navCtrl.back()
  }
  async viewNotify(id: number) {
    await this.router.navigate(['/notify/notifyview/' + id]);
  }
  returnMinText(text: string) {
    return text.substr(0, 20) + '...'
  }


  async presentActionSheet() {
    const actionSheet = await this.alertController.create({
      header: 'Поздравляем вы прошли верификацию!',
      subHeader:'Теперь вы можете совершать “Безопасные сделки”',
      message: `<img src="../../assets/img/medium-verification.png"  style="width: 100%;">`,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          cssClass: 'icon-alert-button',
          handler: () => {
            console.log('OK clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }
  async goToVerification() {
    await this.router.navigate(['/verification']);
  }
}
