import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-rental-show',
  templateUrl: './rental-show.page.html',
  styleUrls: ['./rental-show.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RentalShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
