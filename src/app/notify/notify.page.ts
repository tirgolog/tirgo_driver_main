import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.page.html',
  styleUrls: ['./notify.page.scss'],
})
export class NotifyPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    public authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back()
  }
  async viewNotify(id:number){
    await this.router.navigate(['/notify/notifyview/' + id]);
  }
  returnMinText(text:string){
    return text.substr(0,20)+'...'
  }

}
