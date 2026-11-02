import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-contract-create-edit',
  templateUrl: './contract-create-edit.page.html',
  styleUrls: ['./contract-create-edit.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ContractCreateEditPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
