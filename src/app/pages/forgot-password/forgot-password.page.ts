import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
  IonList, IonText, IonLabel, IonInput, IonButtons, IonButton, IonItem, IonIcon, 
 } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
    IonList, IonText, IonLabel, IonInput, IonButtons, IonButton, IonItem, IonIcon, 
  ]
})
export class ForgotPasswordPage implements OnInit {
  private authServ = inject(AuthService);
  form = computed(() => this.authServ.buildForgotPasswordForm());
  constructor() { 
    addIcons({homeOutline});
  }

  ngOnInit() {
  }

}
