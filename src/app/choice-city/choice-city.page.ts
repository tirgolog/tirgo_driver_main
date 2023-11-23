import {Component, ElementRef, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {DomController, ModalController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-choice-city',
  templateUrl: './choice-city.page.html',
  styleUrls: ['./choice-city.page.scss'],
})
export class ChoiceCityPage implements OnInit {
  findList: any[] | undefined = [];
  viewText = false;
  scrollTopPosition = 0;
  disableScroll = false;
  cities:any[]=[];
  items:any[]=[];
  constructor(
      public modalCtrl: ModalController,
      public authService: AuthenticationService,
      public element: ElementRef,
      public platform: Platform
  ) { }

  async ngOnInit() {

  }
  async findCity(ev:any) {
    const findText = ev.target.value.toString().trim().toLowerCase();
    // console.log(findText);
    if (findText.length >= 2) {
      this.viewText = true;
      // this.findList = this.userService.getCityList().filter(e => e.name.toLowerCase().indexOf(findText) !== -1);
      this.findList = await this.authService.findCity(findText).toPromise();
    } else {
      this.viewText = false;
      this.findList = [];
    }
  }
  async setCity(city:any) {
    if (!city.data.city && !city.data.region){
      await this.authService.alert('Ошибка','Требуется выбрать город')
    }else {
      await this.modalCtrl.dismiss({
        city
      });
    }
  }
  scrollEvent(ev:any) {
    this.scrollTopPosition = ev.detail.scrollTop;
  }
}
