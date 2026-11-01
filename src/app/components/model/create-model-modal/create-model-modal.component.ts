import { Component, OnInit, inject, signal, computed, input, effect } from '@angular/core';
import { IonHeader, IonTextarea, IonSelect, IonModal, IonSelectOption, IonList, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManufacturerModelService } from '../../../services/manufacturer-model.service';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

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
  manufacturers = input<any>(null);
  model = signal<any>(this.modelServ.createNew());
  form = computed(() => this.modelServ.buildForm(this.model()));
  trigger = input<string>();
  selectedManufacturer = signal<any>(null);

  constructor() { 
    addIcons({addOutline});
    effect(() => {
      this.form()?.get('manufacturer_uuid')?.valueChanges?.subscribe((value:any) => {
        const selectedManufacturer = this.manufacturers()?.find((manufacturer:any) => manufacturer.uuid === value);
        this.selectedManufacturer.set(selectedManufacturer || null);
      });
    });
  }

  ngOnInit() {}

  onWillDismiss(event:any){
    // 
  }

  clearManufacturer(){
    this.form()?.get('manufacturer_uuid')?.setValue(null);
  }

  updateManufacturer(event:any){
    // 
  }

  cancel(){
    // 
  }

  confirm(){
    // 
  }

}
