import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar, NavController } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { ToastService } from '../../../services/toast.service';
import { RentalService } from '../../../services/rental.service';

@Component({
  selector: 'app-rental-create-edit',
  templateUrl: './rental-create-edit.page.html',
  styleUrls: ['./rental-create-edit.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, ReactiveFormsModule, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonTitle, 
    IonCard, IonCardContent, IonList, IonButtons, IonButton, IonIcon, IonLabel, IonNote, IonText, 
    IonInput, IonCheckbox, IonTextarea, IonSelect, IonSelectOption, IonBreadcrumb, 
  ]
})
export class RentalCreateEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private rentalServ = inject(RentalService);
  private toast = inject(ToastService);
  private navCtl = inject(NavController);
  uuid:any;
  rental = signal<any>(null);
  form = computed<FormGroup>(() => this.rentalServ.buildForm(this.rental()));
  errors = signal<any>(null);
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') as unknown as string;
    const rental:any = this.uuid ? await this.rentalServ.edit(this.uuid) : await this.rentalServ.create();
    this.rental.set(rental);
  }

  async onSubmit(){
    if(this.form()?.valid){
      const contract = this.form()?.value;
      const results:any = this.uuid ? await this.rentalServ.update(contract) : await this.rentalServ.store(contract);
      if(results?.success){
        this.toast.present(results?.message ?? "User account successfully registered.");
        this.navCtl.back();
      }else if(results?.error){
        const error:any = results?.error;
        this.errors.set(error?.errors);
        this.toast.present(error?.message ?? "An error has occurred.");
      }else{
        this.toast.present(results?.message ?? "An error has occurred.");
      }
    }else{
      this.toast.present("Please complete the form to continue.");
    }
  }

  cancel(){
    this.navCtl.back();
  }

}
