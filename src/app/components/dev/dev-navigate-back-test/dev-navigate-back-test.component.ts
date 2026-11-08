import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonButtons, IonItem, NavController } from '@ionic/angular';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-dev-navigate-back-test',
  templateUrl: './dev-navigate-back-test.component.html',
  styleUrls: ['./dev-navigate-back-test.component.scss'],
  imports: [
    IonItem, IonButtons, IonButton, 
  ],
})
export class DevNavigateBackTestComponent  implements OnInit {

  private location = inject(Location);
  private router = inject(Router);
  private navCtl = inject(NavController);
  private navServ = inject(NavService);

  constructor() { }

  ngOnInit() {}

  locationTest(){
    this.location.back();
  }

  routerTest(){
    // 
  }

  navCtlTest(){
    this.navCtl.back();
  }

  navServTest(){
    this.navServ.back();
  }

}
