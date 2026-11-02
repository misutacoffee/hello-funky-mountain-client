import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-invoice-create-edit',
  templateUrl: './invoice-create-edit.page.html',
  styleUrls: ['./invoice-create-edit.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InvoiceCreateEditPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
