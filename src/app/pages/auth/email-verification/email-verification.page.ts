import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
  IonList, IonText, IonLabel, IonInput, IonButtons, IonButton, IonItem,
  IonIcon, 
 } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.page.html',
  styleUrls: ['./email-verification.page.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
    IonList, IonText, IonLabel, IonInput, IonButtons, IonButton, IonItem, IonIcon, 
  ]
})
export class EmailVerificationPage implements OnInit {
  private authServ = inject(AuthService);
  private toast = inject(ToastService);
  private router = inject(Router);
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
      if(results?.success){
        this.toast.present(results?.message ?? "Login successful.");
        this.router.navigateByUrl('/');
      }else{
        this.toast.present(results?.message ?? "An error has occurred.");
      }
    }else{
      this.toast.present("Please complete the form to continue.");
    }
  }

}
