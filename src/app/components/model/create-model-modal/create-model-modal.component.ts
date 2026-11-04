import { Component, OnInit, inject, signal, computed, input, effect, output, viewChild } from '@angular/core';
import { IonHeader, IonTextarea, IonSelect, IonModal, IonSelectOption, IonList, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManufacturerModelService } from '../../../services/manufacturer-model.service';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { CreateManufacturerModalComponent } from '../../manufacturer/create-manufacturer-modal/create-manufacturer-modal.component';

@Component({
  selector: 'app-create-model-modal',
  templateUrl: './create-model-modal.component.html',
  styleUrls: ['./create-model-modal.component.scss'],
  imports: [
    CommonModule, CreateManufacturerModalComponent, 
    IonHeader, IonTextarea, IonSelect, IonModal, IonSelectOption, IonList, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem, FormsModule, ReactiveFormsModule, 
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
  newManufacturer = output<any>();
  constructor() { 
    addIcons({addOutline});
    effect(() => {
      if(this.manufacturer()){
        this.selectedManufacturer.set(this.manufacturer() || null);
        this.form()?.patchValue({manufacturer_uuid: this.manufacturer()?.uuid || null});
      }
    });
  }

  ngOnInit() {}

  onManufacturerDismiss(event:any){
    const manufacturer:any = event?.detail?.data;
    if(manufacturer){
      this.selectedManufacturer.set(manufacturer || null);
      this.form()?.patchValue({manufacturer_uuid: manufacturer?.uuid || null});
      // add to selectable options
      this.newManufacturer.emit(event);
    }
  }

  deselectManufacturer(){
    this.selectedManufacturer.set(null);
    this.form()?.patchValue({manufacturer_uuid: null});
  }

  manufacturerSelectChange(event:any){
    const manufacturerUuid:any = event?.detail?.value;
    const manufacturer = this.manufacturers()?.find((manufacturer:any) => manufacturer?.uuid == manufacturerUuid) || null;
    this.selectedManufacturer.set(manufacturer);
    this.form()?.patchValue({manufacturer_uuid: manufacturerUuid});
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
      const results:any = await this.modelServ.store(model);
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
