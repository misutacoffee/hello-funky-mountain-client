import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-registration-successful',
  templateUrl: './registration-successful.page.html',
  styleUrls: ['./registration-successful.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegistrationSuccessfulPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
