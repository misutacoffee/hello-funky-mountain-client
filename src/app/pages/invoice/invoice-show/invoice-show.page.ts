import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-invoice-show',
  templateUrl: './invoice-show.page.html',
  styleUrls: ['./invoice-show.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InvoiceShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
