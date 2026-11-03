import { Component, OnInit, inject, signal, computed, input, viewChild, output } from '@angular/core';
import { IonHeader, IonModal, IonList, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem, IonTextarea, IonSelect, IonSelectOption } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-create-manufacturer-modal',
  templateUrl: './create-manufacturer-modal.component.html',
  styleUrls: ['./create-manufacturer-modal.component.scss'],
  imports: [
    IonHeader, IonList, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem, FormsModule, ReactiveFormsModule, 
    IonButtons, IonTextarea, IonSelect, IonSelectOption, IonButton, IonIcon, IonInput, IonLabel, IonItem, FormsModule, ReactiveFormsModule, CommonModule, IonModal, 
  ],
})
export class CreateManufacturerModalComponent  implements OnInit {
  private manufacturerServ = inject(ManufacturerService);
  private toast = inject(ToastService);
  manufacturer = signal<any>(this.manufacturerServ.createNew());
  form = computed(() => this.manufacturerServ.buildForm(this.manufacturer()));
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
      const manufacturer = this.form()?.value;
      const results:any = await this.manufacturerServ.store(manufacturer);
      if(results?.success){
        this.toast.present(results?.message || "Manufacturer saved successfully.");
        this.modal()?.dismiss(manufacturer, 'confirm');
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
