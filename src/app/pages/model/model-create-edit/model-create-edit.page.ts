import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-model-create-edit',
  templateUrl: './model-create-edit.page.html',
  styleUrls: ['./model-create-edit.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ModelCreateEditPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
