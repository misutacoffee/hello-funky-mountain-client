import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonRouterOutlet,
  IonTitle,
  IonToolbar, 
  IonApp,
  IonHeader, 
} from '@ionic/angular';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    IonApp, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, CommonModule, 
    IonMenu, IonList, IonItem, IonLabel, IonIcon, IonRouterOutlet
  ],
})
export class MainLayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
