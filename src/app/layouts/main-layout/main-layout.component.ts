import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonApp, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonContent, IonMenu, IonList, IonItem, IonLabel,
  IonIcon, IonRouterOutlet, IonButton,
  IonAlert,
  IonMenuToggle, 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { NavProfilePopoverComponent } from '../../components/nav-profile-popover/nav-profile-popover.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    CommonModule, RouterLink, NavProfilePopoverComponent, 
    IonApp, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
    IonContent, IonMenu, IonList, IonItem, IonLabel,
    IonIcon, IonRouterOutlet, IonButton, IonAlert, IonMenuToggle, 
  ],
})
export class MainLayoutComponent implements OnInit {
  private authServ = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);
  user = computed(() => this.authServ.user());
  alertButtons = [
    {
      text: "Cancel", 
    }, 
    {
      text: "Logout", 
      handler: () => {
        this.logout();
      }
    }
  ]
  constructor() { 
    addIcons({homeOutline});
  }

  ngOnInit() {}

  async logout(){
    const results:any = await this.authServ.logout();
    if(results?.success){
      this.toast.present("Logout successful.");
      this.router.navigateByUrl('/login');
    }else{
      this.toast.present("Logout unsuccessful. Please check your network connection and try again.");
    }
  }

}
