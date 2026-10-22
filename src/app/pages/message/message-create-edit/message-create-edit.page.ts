import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-message-create-edit',
  templateUrl: './message-create-edit.page.html',
  styleUrls: ['./message-create-edit.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MessageCreateEditPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
