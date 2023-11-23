import { Component, OnInit } from '@angular/core';
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-selectlanguageauth',
  templateUrl: './selectlanguageauth.page.html',
  styleUrls: ['./selectlanguageauth.page.scss'],
})
export class SelectlanguageauthPage implements OnInit {

  constructor(
      private storage: Storage,
      private router: Router,
      private navCtrl: NavController,
      private translateService: TranslateService,
      public authService: AuthenticationService,
  ) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back();
  }
  async selectLanguage(lang:string){
    this.authService.language = lang;
    await this.storage.set('language', lang);
    this.translateService.use(lang)
    this.navCtrl.back();
  }
}
