import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { ToastService } from '../../../services/toast.service';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-contract-create-edit',
  templateUrl: './contract-create-edit.page.html',
  styleUrls: ['./contract-create-edit.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, ReactiveFormsModule, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonTitle, 
    IonCard, IonCardContent, IonList, IonButtons, IonButton, IonIcon, IonLabel, IonNote, IonText, 
    IonInput, IonCheckbox, IonTextarea, IonSelect, IonSelectOption, IonBreadcrumb, 
  ]
})
export class ContractCreateEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private contractServ = inject(ContractService);
  private toast = inject(ToastService);
  private navServ = inject(NavService);
  uuid:any;
  contract = signal<any>(null);
  form = computed<FormGroup>(() => this.contractServ.buildForm(this.contract()));
  errors = signal<any>(null);
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') as unknown as string;
    const contract:any = this.uuid ? await this.contractServ.edit(this.uuid) : await this.contractServ.create();
    this.contract.set(contract);
  }

  async onSubmit(){
    if(this.form()?.valid){
      const contract = this.form()?.value;
      const results:any = this.uuid ? await this.contractServ.update(contract) : await this.contractServ.store(contract);
      if(results?.success){
        this.toast.present(results?.message ?? `Contract successfully ${this.uuid ? 'updated' : 'stored'} to the database.`);
        this.navServ.back();
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
    this.navServ.back();
  }

}
