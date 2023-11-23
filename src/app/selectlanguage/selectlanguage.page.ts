import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-selectlanguage',
  templateUrl: './selectlanguage.page.html',
  styleUrls: ['./selectlanguage.page.scss'],
})
export class SelectlanguagePage implements OnInit {

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
    await this.router.navigate(['welcome'], {replaceUrl: true});
  }
}
