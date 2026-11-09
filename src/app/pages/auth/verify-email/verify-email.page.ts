import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonRow, IonTitle, IonToolbar } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
  imports: [IonContent, IonCard, IonCardContent, IonList, IonGrid, IonRow, IonCol, IonLabel, IonItem, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VerifyEmailPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private authServ = inject(AuthService);
  private toast = inject(ToastService);
  private router = inject(Router);
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const id:any = this.activatedRoute.snapshot.paramMap.get('id');
    const hash:any = this.activatedRoute.snapshot.paramMap.get('hash');
    const results:any = await this.authServ.verifyEmail(id, hash);
    if(results?.success){
      this.toast.present(results?.message || "Email successfully verified.");
      this.router.navigateByUrl('/');
    }else{
      this.toast.present(results?.message || "An error has occurred.");
    }
  }

}
