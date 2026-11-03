import { Component, OnInit, inject, signal, computed, input, viewChild, output } from '@angular/core';
import { IonHeader, IonModal, IonList, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem, IonTextarea, IonSelect, IonSelectOption, IonCheckbox, IonText, IonNote } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { EquipmentService } from '../../../services/equipment.service';

@Component({
  selector: 'app-equipment-select-modal',
  templateUrl: './equipment-select-modal.component.html',
  styleUrls: ['./equipment-select-modal.component.scss'],
  imports: [
    IonHeader, IonList, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem, FormsModule, ReactiveFormsModule, 
    IonButtons, IonTextarea, IonSelect, IonSelectOption, IonButton, IonIcon, IonInput, IonLabel, IonItem, FormsModule, ReactiveFormsModule, CommonModule, IonModal, 
    IonCheckbox, IonText, IonNote, 
  ],
})
export class EquipmentSelectModalComponent  implements OnInit {
  private equipmentServ = inject(EquipmentService);
  private toast = inject(ToastService);
  trigger = input<string>('modal-trigger');
  modal = viewChild(IonModal);
  willDismiss = output<any>();
  errors = signal<any>(null);
  activeOnly = signal<boolean>(true);
  filterOptions = signal<any>({
    activeOnly: this.activeOnly(), 
  });
  rentalEquipment = input<any>();
  equipment = input<any>();
  filteredEquipment = computed(() => this.equipmentServ.filterEquipment(this.equipment(), this.filterOptions()));
  displayEquipment = computed(() => this.equipmentServ.selectEquipment(this.filteredEquipment(), this.rentalEquipment()));
  constructor() { }

  ngOnInit() {}

  onWillDismiss(event:any){
    this.willDismiss.emit(event);
  }

  toggleSelect(uuid:string){
    this.equipment()?.forEach((equipment:any) => {
      if(equipment?.uuid == uuid){
        equipment.isSelected = !equipment.isSelected;
      }
    });
  }

  cancel(){
    this.modal()?.dismiss(null, 'cancel');
  }

  async confirm(){
    const selectedUuids:any = this.equipment()?.filter((equipment:any) => equipment?.isSelected)?.map((equipment:any) => equipment?.uuid);
    this.modal()?.dismiss(selectedUuids, 'confirm');
  }

}
