import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonInput,
  IonLabel,
  IonList, 
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/angular';

@Component({
  selector: 'app-equipment-create-edit',
  templateUrl: './equipment-create-edit.page.html',
  styleUrls: ['./equipment-create-edit.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonButtons, IonIcon, IonInput, IonLabel, IonItem, IonSelect,
    IonSelectOption, IonTextarea, IonList, 
  ]
})
export class EquipmentCreateEditPage implements OnInit {
  uuid:any;
  constructor() { }

  ngOnInit() {
  }

}
