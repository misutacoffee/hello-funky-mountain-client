import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
  IonList, IonText, IonLabel, IonInput, IonButtons, IonButton, IonItem,
  IonIcon, 
 } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
    IonList, IonText, IonLabel, IonInput, IonButtons, IonButton, IonItem, IonIcon, 
  ]
})
export class LoginPage implements OnInit {
  private authServ = inject(AuthService);
  private toast = inject(ToastService);
  form = computed(() => this.authServ.buildLoginForm());
  constructor() { 
    addIcons({homeOutline});
  }

  ngOnInit() {
  }

  async onSubmit(){
    if(this.form()?.valid){
      const credentials:any = this.form()?.value;
      const results:any = await this.authServ.login(credentials);
      console.log(results);
    }else{
      this.toast.present('middle', "Please complete the form to continue.");
    }
  }

}
