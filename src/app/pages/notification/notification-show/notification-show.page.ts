import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-notification-show',
  templateUrl: './notification-show.page.html',
  styleUrls: ['./notification-show.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NotificationShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
