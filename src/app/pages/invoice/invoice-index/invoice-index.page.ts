import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-invoice-index',
  templateUrl: './invoice-index.page.html',
  styleUrls: ['./invoice-index.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InvoiceIndexPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
