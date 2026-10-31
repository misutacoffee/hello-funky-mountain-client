import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
  IonList, IonText, IonLabel, IonInput, IonButtons, IonButton, IonItem, IonNote,
  IonIcon,
 } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { ToastService } from '../../services/toast.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
    IonList, IonText, IonLabel, IonInput, IonButtons, IonButton, IonItem, IonNote, IonIcon, 
  ]
})
export class RegisterPage implements OnInit {
  private authServ = inject(AuthService);
  private toast = inject(ToastService);
  private router = inject(Router);
  form = computed(() => this.authServ.buildRegisterForm());
  errors = signal<any>(null);
  constructor() { 
    addIcons({homeOutline});
  }

  ngOnInit() {
  }

  async onSubmit(){
    if(this.form().valid){
      const user:any = this.form().value;
      const results:any = await this.authServ.register(user);
      if(results?.success){
        this.toast.present(results?.message ?? "User account successfully registered.");
        this.router.navigateByUrl('/');
      }else if(results?.error){
        const error:any = results?.error;
        this.errors.set(error?.errors);
        this.toast.present(error?.message ?? "An error has occurred.");
      }else{
        this.toast.present(results?.message ?? "An error has occurred.");
      }
    }else{
      this.toast.present("Please complete the form to proceed.");
    }
  }

}
