import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonRow, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-registration-successful',
  templateUrl: './registration-successful.page.html',
  styleUrls: ['./registration-successful.page.scss'],
  imports: [IonContent, IonCard, IonCardContent, IonList, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegistrationSuccessfulPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
