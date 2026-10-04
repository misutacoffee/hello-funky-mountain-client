import { Component, inject, OnInit, signal } from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, 
    IonLabel, FormsModule, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonButton, IonButtons, IonIcon, IonInput, IonLabel, IonItem, 
    IonSelect, IonSelectOption, IonTextarea
  ]
})
export class HomePage implements OnInit {
  private storageServ = inject(StorageService);
  equipment = signal<any>(null);
  constructor() { 
    addIcons({addOutline})
  }

  ngOnInit() { }
  
}
