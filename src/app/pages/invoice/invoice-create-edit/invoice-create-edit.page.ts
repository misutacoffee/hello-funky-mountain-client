import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { InvoiceService } from '../../../services/invoice.service';
import { NavService } from '../../../services/nav.service';
import { addIcons } from 'ionicons';
import { addOutline, closeOutline } from 'ionicons/icons';

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

  contract = signal<any>(null);
  contracts = signal<any>(null);
  invoice = signal<any>(null);
  rental = signal<any>(null);
  rentals = signal<any>(null);

  form = computed<FormGroup>(() => this.invoiceServ.buildForm(this.invoice()));
  errors = signal<any>(null);

  selectedContract = signal<any>(null);
  selectedRental = signal<any>(null);

  constructor() { 
    addIcons({addOutline, closeOutline});
    effect(() => {
      if(this.data()){
        this.contract.set(this.data()?.contract);
        this.contracts.set(this.data()?.contracts);
        this.invoice.set(this.data()?.invoice);
        this.rental.set(this.data()?.rental);
        this.rentals.set(this.data()?.rentals);
      }
      if(this.contract()){
        this.selectedContract.set(this.contract());
        this.form()?.patchValue({contract_uuid: this.contract()?.uuid || null});
      }
      if(this.rental()){
        this.selectedRental.set(this.rental());
        this.form()?.patchValue({rental_uuid: this.rental()?.uuid || null});
      }
    });
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

  clearSelectedContract(){
    this.selectedContract.set(null);
    this.invoice.set({...this.invoice(), contract_uuid: null});
  }

  clearSelectedRental(){
    this.selectedRental.set(null);
    this.invoice.set({...this.invoice(), rental_uuid: null});
  }

  onContractSelectChange(event:any){
    const contractUuid:any = event?.detail?.value;
    const contract = this.contracts()?.find((contract:any) =>contract?.uuid == contractUuid);
    this.selectedContract.set(contract || null);
    this.invoice.set({...this.invoice(), contract_uuid: contractUuid || null});
  }

  onRentalSelectChange(event:any){
    const rentalUuid:any = event?.detail?.value;
    const rental = this.contracts()?.find((contract:any) =>contract?.uuid == rentalUuid);
    this.selectedRental.set(rental || null);
    this.invoice.set({...this.invoice(), rental_uuid: rentalUuid || null});
  }

  async onSubmit(){
    if(this.form()?.valid){
      const invoice = this.form()?.value;
      const results:any = this.uuid ? await this.invoiceServ.update(invoice) : await this.invoiceServ.store(invoice);
      if(results?.success){
        this.toast.present(results?.message ?? `Invoice successfully ${this.uuid ? 'updated' : 'stored'} to the database.`);
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
