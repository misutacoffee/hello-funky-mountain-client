import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-notification-index',
  templateUrl: './notification-index.page.html',
  styleUrls: ['./notification-index.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NotificationIndexPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
