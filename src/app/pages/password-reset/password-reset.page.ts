import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
  IonList, IonText, IonLabel, IonInput, IonButtons, IonButton, IonItem,
  IonIcon,
  IonNote, 
 } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
    IonList, IonText, IonLabel, IonInput, IonButtons, IonButton, IonItem, IonIcon, IonNote, 
  ]
})
export class PasswordResetPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private authServ = inject(AuthService);
  private toast = inject(ToastService);
  private router = inject(Router);
  form = computed(() => this.authServ.buildPasswordResetForm());
  constructor() { 
    addIcons({homeOutline});
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const email:any = this.activatedRoute.snapshot.queryParamMap.get('email');
    const token:any = this.activatedRoute.snapshot.queryParamMap.get('token');
    this.form()?.patchValue({email: email, token: token});
  }

  async onSubmit(){
    if(this.form()?.valid){
      const form:any = this.form()?.value;
      const results:any = await this.authServ.resetPassword(form);
      if(results?.success){
        this.toast.present('bottom', results?.message ?? "Password successfully updated.");
        this.router.navigateByUrl('/');
      }else{
        this.toast.present('middle', results?.message ?? "An error has occurred.");
      }
    }else{
      this.toast.present('middle', "Complete the form to continue.");
    }
  }

}
