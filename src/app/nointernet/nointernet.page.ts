import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-nointernet',
  templateUrl: './nointernet.page.html',
  styleUrls: ['./nointernet.page.scss'],
})
export class NointernetPage implements OnInit {
  options: AnimationOptions = {
    path: '/assets/connection-wrong.json',
    loop: true,
  };
  constructor() { }

  ngOnInit() {
  }

}
