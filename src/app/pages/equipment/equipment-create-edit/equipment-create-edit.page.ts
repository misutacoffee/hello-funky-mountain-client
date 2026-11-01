import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonModal, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons, IonIcon, IonInput, IonLabel, IonList, IonItem, IonSelect, IonSelectOption, IonTextarea, IonBreadcrumb, NavController, IonCheckbox } from '@ionic/angular';
import { EquipmentService } from '../../../services/equipment.service';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { addIcons } from 'ionicons';
import { closeOutline, addOutline } from 'ionicons/icons';
import { CreateModelModalComponent } from '../../../components/model/create-model-modal/create-model-modal.component';
import { CreateManufacturerModalComponent } from '../../../components/manufacturer/create-manufacturer-modal/create-manufacturer-modal.component';

@Component({
  selector: 'app-equipment-create-edit',
  templateUrl: './equipment-create-edit.page.html',
  styleUrls: ['./equipment-create-edit.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonButtons, IonIcon, IonInput, IonLabel, IonItem, IonSelect, RouterLink, 
    IonSelectOption, IonTextarea, IonList, ReactiveFormsModule, BreadcrumbsComponent, IonBreadcrumb, 
    IonCheckbox, FormsModule, ReactiveFormsModule, CreateManufacturerModalComponent, CreateModelModalComponent, IonModal, IonButton
  ]
})
export class EquipmentCreateEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private equipmentServ = inject(EquipmentService);
  private authServ = inject(AuthService);
  private toast = inject(ToastService);
  private navCtl = inject(NavController);
  uuid:any;
  equipmentData = signal<any>(null);
  equipment = computed<any>(() => this.equipmentData()?.equipment ?? this.equipmentServ.createNew());
  form = computed<FormGroup>(() => this.equipmentServ.buildForm(this.equipment()));
  user = computed<any>(() => this.authServ.user());
  manufacturers = computed(() => this.equipmentData()?.manufacturers);
  models = computed(() => this.equipmentData()?.models);
  selectedManufacturer = signal<any>(null);
  selectedModel = signal<any>(null);
  selectedManufacturerUuid = computed(() => this.selectedManufacturer()?.uuid ?? null);
  selectedModelUuid = computed(() => this.selectedModel()?.uuid ?? null);
  filteredModels = computed(() => this.models()?.filter((model:any) => model.manufacturer_uuid === this.selectedManufacturerUuid()));
  constructor() { 
    addIcons({closeOutline, addOutline});
  }

  async ngOnInit() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    const equipmentData:any = this.uuid ? await this.equipmentServ.editByUuid(this.uuid) : await this.equipmentServ.create();
    this.equipmentData.set(equipmentData);
  }

  async addManufacturer(){
    // 
  }

  async addModel(){
    // 
  }

  async onManufacturerModalDismiss(event:any){
    // 
  }

  manufacturerSelectChange(event:any){
    const manufacturerUuid = event?.detail?.value;
    const manufacturer:any = this.manufacturers()?.find((manufacturer:any) => manufacturer.uuid === manufacturerUuid);
    this.selectedManufacturer.set(manufacturer ?? null);
    if(this.selectedModel() && this.selectedModel()?.manufacturer_uuid !== manufacturerUuid){
      this.selectedModel.set(null);
      this.form()?.patchValue({manufacturer_model_uuid: null});

    }
  }

  modelSelectChange(event:any){
    const modelUuid = event?.detail?.value;
    const model:any = this.models()?.find((model:any) => model.uuid === modelUuid);
    const manufacturer:any = this.manufacturers()?.find((manufacturer:any) => manufacturer.uuid === model?.manufacturer_uuid);
    this.selectedManufacturer.set(manufacturer ?? null);
    this.selectedModel.set(model ?? null);
    this.form()?.patchValue({manufacturer_model_uuid: this.selectedModel()?.uuid ?? null});
  }

  clearManufacturer(){
    this.selectedManufacturer.set(null);
    this.selectedModel.set(null);
    this.form()?.patchValue({manufacturer_model_uuid: null});
  }

  clearModel(){
    this.selectedModel.set(null);
    this.form()?.patchValue({manufacturer_model_uuid: null});
  }

  async onSubmit() {
    if (this.form().valid) {
      const equipment = this.equipmentServ.trimObject(this.form().value);
      const results = await this.equipmentServ.save(equipment);
    }else{
      this.toast.present("Please complete the form to proceed.");
    }
  }

  cancel(){
    // alert if changes
    this.navCtl.back();
  }

}
