import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Platform} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {
  items:any[]=[];
  constructor(
    public authService: AuthenticationService,
    public platform: Platform,
    private router: Router,
    ) {
  }

  ngOnInit() {
    this.items = this.authService.myarchiveorders
  }
  returnNameTypeTransport(type:number){
    const index = this.authService.typetruck.findIndex(e => +e.id === +type)
    if (index>=0){
      return this.authService.typetruck[index].name
    }else {
      return 'Не выбрано'
    }
  }

  returnNameCargoType(id:number){
    const index = this.authService.typecargo.findIndex(e => +e.id === +id)
    if (index>=0){
      return this.authService.typecargo[index].name
    }else {
      return 'Не выбрано'
    }
  }

}
