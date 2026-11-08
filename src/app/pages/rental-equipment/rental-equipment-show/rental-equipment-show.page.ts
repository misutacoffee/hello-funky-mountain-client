import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-rental-equipment-show',
  templateUrl: './rental-equipment-show.page.html',
  styleUrls: ['./rental-equipment-show.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RentalEquipmentShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
