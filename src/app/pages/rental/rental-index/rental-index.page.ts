import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-rental-index',
  templateUrl: './rental-index.page.html',
  styleUrls: ['./rental-index.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RentalIndexPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
