import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton, 
 } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  imports: [
    CommonModule, FormsModule, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton, 
  ]
})
export class ChangePasswordPage implements OnInit {

  constructor() { 
    addIcons({homeOutline});
  }

  ngOnInit() {
  }

}
