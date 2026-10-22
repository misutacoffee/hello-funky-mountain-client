import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-message-index',
  templateUrl: './message-index.page.html',
  styleUrls: ['./message-index.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MessageIndexPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
