import { Component, OnInit, inject, signal, computed, input, viewChild, output } from '@angular/core';
import { IonHeader, IonModal, IonList, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem, IonTextarea, IonSelect, IonSelectOption } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { ContractService } from '../../../services/contract.service';

@Component({
  selector: 'app-create-contract-modal',
  templateUrl: './create-contract-modal.component.html',
  styleUrls: ['./create-contract-modal.component.scss'],
  imports: [
    IonHeader, IonList, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem, FormsModule, ReactiveFormsModule, 
    IonButtons, IonTextarea, IonSelect, IonSelectOption, IonButton, IonIcon, IonInput, IonLabel, IonItem, FormsModule, ReactiveFormsModule, CommonModule, IonModal, 
  ],
})
export class CreateContractModalComponent  implements OnInit {
  private contractServ = inject(ContractService);
  private toast = inject(ToastService);
  contract = signal<any>(this.contractServ.createNew());
  form = computed(() => this.contractServ.buildForm(this.contract()));
  trigger = input();
  modal = viewChild(IonModal);
  willDismiss = output<any>();
  errors = signal<any>(null);
  constructor() { }

  ngOnInit() {}

  onWillDismiss(event:any){
    this.willDismiss.emit(event);
  }

  cancel(){
    this.modal()?.dismiss(null, 'cancel');
  }

  async confirm(){
    if(this.form()?.valid){
      const contract = this.form()?.value;
      const results:any = await this.contractServ.store(contract);
      if(results?.success){
        this.toast.present(results?.message || "Contract saved successfully.");
        this.modal()?.dismiss(contract, 'confirm');
        this.errors.set(null);
      }else if(results?.errors){
        this.errors.set(results?.errors);
      }else{
        this.toast.present(results?.message || "An error occurred while saving the manufacturer.");
      }
    }else{
      this.toast.present("Please complete the form to continue.");
    }
  }

}
