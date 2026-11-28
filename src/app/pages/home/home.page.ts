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
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

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
  private authServ = inject(AuthService);
  appName = environment.appName;
  data = signal<any>(null);
  contracts = computed(() => this.data()?.contracts || []);
  equipment = computed(() => this.data()?.equipment || []);
  invoices = computed(() => this.data()?.invoices || []);
  manufacturers = computed(() => this.data()?.manufacturers || []);
  models = computed(() => this.data()?.manufacturerModels || []);
  rentals = computed(() => this.data()?.rentals || []);
  users = computed(() => this.data()?.users || []);
  user = computed(() => this.authServ.user());
  constructor() { 
    addIcons({addOutline})
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const data = await this.homeServ.getHomeData();
    this.data.set(data);
  }
  
}
