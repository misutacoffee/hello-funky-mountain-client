import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-rental-equipment-create-edit',
  templateUrl: './rental-equipment-create-edit.page.html',
  styleUrls: ['./rental-equipment-create-edit.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RentalEquipmentCreateEditPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
