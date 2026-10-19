import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-manufacturer-show',
  templateUrl: './manufacturer-show.page.html',
  styleUrls: ['./manufacturer-show.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ManufacturerShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
