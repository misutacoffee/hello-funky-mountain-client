import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-contract-show',
  templateUrl: './contract-show.page.html',
  styleUrls: ['./contract-show.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ContractShowPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
