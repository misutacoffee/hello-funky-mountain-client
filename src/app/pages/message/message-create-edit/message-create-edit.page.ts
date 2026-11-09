import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonRow, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-message-create-edit',
  templateUrl: './message-create-edit.page.html',
  styleUrls: ['./message-create-edit.page.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MessageCreateEditPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
