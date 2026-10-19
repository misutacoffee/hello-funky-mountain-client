import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-model-index',
  templateUrl: './model-index.page.html',
  styleUrls: ['./model-index.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ModelIndexPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
