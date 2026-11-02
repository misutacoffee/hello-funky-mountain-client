import { Component, OnInit, inject, signal, computed, input, effect, output, viewChild } from '@angular/core';
import { IonHeader, IonTextarea, IonSelect, IonModal, IonSelectOption, IonList, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManufacturerModelService } from '../../../services/manufacturer-model.service';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-create-model-modal',
  templateUrl: './create-model-modal.component.html',
  styleUrls: ['./create-model-modal.component.scss'],
  imports: [
    CommonModule,
    IonHeader, IonTextarea, IonSelect, IonModal, IonSelectOption, IonList, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem, FormsModule, ReactiveFormsModule
  ],
})
export class CreateModelModalComponent  implements OnInit {
  private modelServ = inject(ManufacturerModelService);
  private toast = inject(ToastService);
  manufacturers = input<any>(null);
  model = signal<any>(this.modelServ.createNew());
  form = computed(() => this.modelServ.buildForm(this.model()));
  trigger = input<string>();
  selectedManufacturer = signal<any>(null);
  modal = viewChild(IonModal);
  willDismiss = output<any>();
  errors = signal<any>(null);
  manufacturer = input<any>(null);
  constructor() { 
    addIcons({addOutline});
    effect(() => {
      this.form()?.get('manufacturer_uuid')?.valueChanges?.subscribe((value:any) => {
        const selectedManufacturer = this.manufacturers()?.find((manufacturer:any) => manufacturer.uuid === value);
        this.selectedManufacturer.set(selectedManufacturer || null);
      });
      // 
    });
  }

  ngOnInit() {}

  clearManufacturer(){
    this.form()?.get('manufacturer_uuid')?.setValue(null);
  }

  updateManufacturer(event:any){
    // 
  }

  onWillDismiss(event:any){
    this.willDismiss.emit(event);
  }

  cancel(){
    this.modal()?.dismiss(null, 'cancel');
  }

  async confirm(){
    if(this.form()?.valid){
      const model = this.form()?.value;
      const results:any = await this.modelServ.save(model);
      if(results?.success){
        this.toast.present(results?.message || "Manufacturer saved successfully.");
        this.modal()?.dismiss(model, 'confirm');
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
