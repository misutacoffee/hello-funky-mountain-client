import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-model-show',
  templateUrl: './model-show.page.html',
  styleUrls: ['./model-show.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ModelShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
