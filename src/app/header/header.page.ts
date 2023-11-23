import { Component, OnInit } from '@angular/core';
import {MenuController, ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {PushService} from "../services/push.service";
import {ChoiceCityPage} from "../choice-city/choice-city.page";
import {SetraitingPage} from "../setraiting/setraiting.page";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {

  constructor(
    private router: Router,
    private pushService: PushService,
    private menu: MenuController,
    private authService: AuthenticationService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
  }
  async menuOpened(){
    await this.menu.toggle();
  }
  async goToNotify(){
    this.pushService.init();
    await this.router.navigate(['/notify']);
  }
  async openTestPage(){
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
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data) {

    }
  }
  // @ts-ignore
  returnLogo(){
    if (this.authService.language === 'ru'){
      return '/assets/logos/rus-oq.png'
    }else if(this.authService.language === 'tr'){
      return '/assets/logos/turk-oq.png.png'
    }else if(this.authService.language === 'en'){
      return '/assets/logos/english-oq.png'
    }
  }
}
