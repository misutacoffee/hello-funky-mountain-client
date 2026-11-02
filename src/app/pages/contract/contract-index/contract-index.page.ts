import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-contract-index',
  templateUrl: './contract-index.page.html',
  styleUrls: ['./contract-index.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ContractIndexPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
