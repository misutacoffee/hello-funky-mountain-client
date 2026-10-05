import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonInput,
  IonLabel,
  IonList, 
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/angular';
import { EquipmentService } from '../../../services/equipment.service';

@Component({
  selector: 'app-equipment-create-edit',
  templateUrl: './equipment-create-edit.page.html',
  styleUrls: ['./equipment-create-edit.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonButtons, IonIcon, IonInput, IonLabel, IonItem, IonSelect,
    IonSelectOption, IonTextarea, IonList, ReactiveFormsModule, 
  ]
})
export class EquipmentCreateEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private equipmentService = inject(EquipmentService);
  uuid:any;
  equipment = signal<any>(null);
  form = computed<FormGroup>(() => this.equipmentService.buildForm(this.equipment()));
  constructor() { }

  async ngOnInit() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    const equipment:any = this.uuid ? await this.equipmentService.getByUuid(this.uuid) : this.equipmentService.createNew();
    this.equipment.set(equipment);
  }

  async onSubmit() {
    if (this.form().valid) {
      const equipment = this.equipmentService.trimObject(this.form().value);
      const results = await this.equipmentService.save(equipment);
    }
  }

}
