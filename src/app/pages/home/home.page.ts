import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList, 
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { StorageService } from '../../services/storage.service';
import { RouterLink } from '@angular/router';
import { ManufacturerService } from '../../services/manufacturer.service';
import { ManufacturerModelService } from '../../services/manufacturer-model.service';
import { EquipmentService } from '../../services/equipment.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, 
    IonLabel, FormsModule, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonButton, IonButtons, IonIcon, IonInput, IonLabel, IonItem, 
    IonSelect, IonSelectOption, IonTextarea, RouterLink, 
  ]
})
export class HomePage implements OnInit {
  private homeServ = inject(HomeService);
  homeData = signal<any>(null);
  equipment = computed(() => this.homeData()?.equipment || []);
  invoices = computed(() => this.homeData()?.invoices || []);
  manufacturers = computed(() => this.homeData()?.manufacturers || []);
  models = computed(() => this.homeData()?.manufacturerModels || []);
  rentals = computed(() => this.homeData()?.rentals || []);
  users = computed(() => this.homeData()?.users || []);
  constructor() { 
    addIcons({addOutline})
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    const homeData = await this.homeServ.getHomeData();
    this.homeData.set(homeData);
    console.log('homeData', this.homeData());
  }
  
}
