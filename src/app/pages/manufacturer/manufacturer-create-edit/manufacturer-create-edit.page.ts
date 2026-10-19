import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-manufacturer-create-edit',
  templateUrl: './manufacturer-create-edit.page.html',
  styleUrls: ['./manufacturer-create-edit.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ManufacturerCreateEditPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
