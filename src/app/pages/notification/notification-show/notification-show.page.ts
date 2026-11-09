import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonRow, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-notification-show',
  templateUrl: './notification-show.page.html',
  styleUrls: ['./notification-show.page.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NotificationShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
