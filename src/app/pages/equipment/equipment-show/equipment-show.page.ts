import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-equipment-show',
  templateUrl: './equipment-show.page.html',
  styleUrls: ['./equipment-show.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EquipmentShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
