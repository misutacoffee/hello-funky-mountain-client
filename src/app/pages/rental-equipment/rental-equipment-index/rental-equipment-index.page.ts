import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-rental-equipment-index',
  templateUrl: './rental-equipment-index.page.html',
  styleUrls: ['./rental-equipment-index.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RentalEquipmentIndexPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
