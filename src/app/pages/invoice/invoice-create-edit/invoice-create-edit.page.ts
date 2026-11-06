import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { InvoiceService } from '../../../services/invoice.service';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-invoice-create-edit',
  templateUrl: './invoice-create-edit.page.html',
  styleUrls: ['./invoice-create-edit.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, ReactiveFormsModule, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonTitle, 
    IonCard, IonCardContent, IonList, IonButtons, IonButton, IonIcon, IonLabel, IonNote, IonText, 
    IonInput, IonCheckbox, IonTextarea, IonSelect, IonSelectOption, IonBreadcrumb, 
  ]
})
export class InvoiceCreateEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private invoiceServ = inject(InvoiceService);
  private toast = inject(ToastService);
  private navServ = inject(NavService);
  uuid:any;
  contractUuid:any;
  rentalUuid:any;
  data = signal<any>(null);
  contract = computed(() => this.data()?.contract);
  invoice = computed(() => this.data()?.invoice);
  rental = computed(() => this.data()?.rental);
  form = computed<FormGroup>(() => this.invoiceServ.buildForm(this.invoice()));
  errors = signal<any>(null);
  constructor() { 
    effect(() => {
      if(this.contract()){
        this.form()?.patchValue({contract_uuid: this.contract()?.uuid || null});
      }
      if(this.rental()){
        this.form()?.patchValue({rental_uuid: this.rental()?.uuid || null});
      }
    })
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    this.contractUuid = this.activatedRoute.snapshot.paramMap.get('contract_uuid');
    this.rentalUuid = this.activatedRoute.snapshot.paramMap.get('rental_uuid');
    let promise:any = this.invoiceServ.create();
    if(this.uuid){
      promise = this.invoiceServ.edit(this.uuid);
    }else if(this.contractUuid){
      promise = this.invoiceServ.createByContract(this.contractUuid);
    }else if(this.rentalUuid){
      promise = this.invoiceServ.createByRental(this.rentalUuid);
    }
    const data:any = await promise;
    this.data.set(data);
  }

  async onSubmit(){
    if(this.form()?.valid){
      const invoice = this.form()?.value;
      const results:any = this.uuid ? await this.invoiceServ.update(invoice) : await this.invoiceServ.store(invoice);
      if(results?.success){
        this.toast.present(results?.message ?? "User account successfully registered.");
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
