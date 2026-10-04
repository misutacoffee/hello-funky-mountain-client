import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
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
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, IonLabel, FormsModule, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonButton, IonIcon, IonInput, IonLabel, IonItem, 
    IonSelect, IonSelectOption, IonTextarea
  ]
})
export class HomePage implements OnInit {
  private storageServ = inject(StorageService);
  constructor() { }

  ngOnInit() {
    console.log('HomePage initialized');
  }

}
