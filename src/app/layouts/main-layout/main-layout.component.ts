import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonApp, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonContent, IonMenu, IonList, IonItem, IonLabel,
  IonIcon, IonRouterOutlet, IonButton, 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { NavProfilePopoverComponent } from '../../components/nav-profile-popover/nav-profile-popover.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    CommonModule, RouterLink, NavProfilePopoverComponent, 
    IonApp, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
    IonContent, IonMenu, IonList, IonItem, IonLabel,
    IonIcon, IonRouterOutlet, IonButton, 
  ],
})
export class MainLayoutComponent implements OnInit {
  private authServ = inject(AuthService);
  user = computed(() => this.authServ.user());
  constructor() { 
    addIcons({homeOutline});
  }

  ngOnInit() {}

  async logout(){
    // alert 
    // logout
    // clearSession
  }

}
