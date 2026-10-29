import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonButtons, IonCard, IonCardSubtitle, IonCardContent, IonCardHeader,
  IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem,
  IonList, IonLabel, IonNote, IonRow, IonSelect, IonSelectOption, IonTextarea,
  IonTitle, IonToolbar, IonText,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, 
    IonLabel, FormsModule, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonButton, IonButtons, IonIcon, IonInput, IonLabel, IonItem, 
    IonSelect, IonSelectOption, IonTextarea, RouterLink, IonNote, IonText, 
  ]
})
export class HomePage implements OnInit {
  private homeServ = inject(HomeService);
  private tokenServ = inject(TokenService);
  private userServ = inject(UserService);
  homeData = signal<any>(null);
  contracts = computed(() => this.homeData()?.contracts || []);
  equipment = computed(() => this.homeData()?.equipment || []);
  invoices = computed(() => this.homeData()?.invoices || []);
  manufacturers = computed(() => this.homeData()?.manufacturers || []);
  models = computed(() => this.homeData()?.manufacturerModels || []);
  rentals = computed(() => this.homeData()?.rentals || []);
  users = computed(() => this.homeData()?.users || []);
  user = signal<any>(null);
  constructor() { 
    addIcons({addOutline})
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    const homeData = await this.homeServ.getHomeData();
    this.homeData.set(homeData);
    const token:any = this.tokenServ.getToken();
    const user:any = this.userServ.getUser();
    this.user.set(user);
    console.log(user);
  }
  
}
