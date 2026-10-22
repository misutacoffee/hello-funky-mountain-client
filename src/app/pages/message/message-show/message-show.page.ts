import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-message-show',
  templateUrl: './message-show.page.html',
  styleUrls: ['./message-show.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MessageShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
