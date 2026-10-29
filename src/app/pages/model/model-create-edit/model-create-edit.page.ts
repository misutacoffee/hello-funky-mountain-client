import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonBreadcrumb, 
  IonList, IonItem, IonLabel, IonNote, IonText, IonIcon, IonButtons, IonButton, IonInput, 
  IonCheckbox, IonTextarea, IonSelect, IonSelectOption, IonCard, IonCardContent,
  NavController, 
 } from '@ionic/angular';
import { ManufacturerModelService } from '../../../services/manufacturer-model.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { ToastService } from '../../../services/toast.service';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-model-create-edit',
  templateUrl: './model-create-edit.page.html',
  styleUrls: ['./model-create-edit.page.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, BreadcrumbsComponent, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonBreadcrumb, 
    IonList, IonItem, IonLabel, IonNote, IonText, IonIcon, IonButtons, IonButton, IonInput, 
    IonCheckbox, IonTextarea, IonSelect, IonSelectOption, IonCard, IonCardContent, 
  ]
})
export class ModelCreateEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private modelServ = inject(ManufacturerModelService);
  private navCtl = inject(NavController);
  private toast = inject(ToastService);
  uuid:any;
  manufacturerUuid:any;
  manufacturer = signal<any>(null);
  manufacturers = signal<any>(null);
  model = signal<any>(null);
  form = computed<FormGroup>(() => this.modelServ.buildForm(this.model()));
  constructor() { 
    addIcons({addOutline});
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') as unknown as string;
    this.manufacturerUuid = this.activatedRoute.snapshot.paramMap.get('manufacturer_uuid') as unknown as string;
    if(this.uuid){
      // edit
      const data:any = await this.modelServ.editByUuid(this.uuid);
      const manufacturers = data?.manufacturers;
      const model:any = data?.model;
      const manufacturer = model?.manufacturer;
      this.manufacturer.set(manufacturer);
      this.manufacturers.set(manufacturers);
      this.model.set(model);
    }else{
      // create 
      const data:any = await this.modelServ.create();
      const manufacturers:any = data?.manufacturers;
      const model:any = this.modelServ.createNew(this.manufacturerUuid);
      const manufacturer:any = manufacturers?.find((manufacturer:any) => this.manufacturerUuid && manufacturer?.uuid == this.manufacturerUuid) ?? null;
      this.manufacturer.set(manufacturer);
      this.manufacturers.set(manufacturers);
      this.model.set(model);
    }
  }

  updateManufacturer(event:any){
    const manufacturerUuid:any = event?.detail?.value;
    // 
  }

  async save(){
    if(this.form()?.valid){
      const model:any = this.form()?.value;
      const results:any = await this.modelServ.save(model);
      if(results?.success){
        this.toast.present('bottom', results?.message ?? "Model successfully saved to the database.");
        this.navCtl.back();
      }else{
        this.toast.present('middle', results?.message ?? "An error has occurred.");
      }
    }else{
        this.toast.present('middle', "Please complete the form to continue.");
    }
  }

  async cancel(){
    // check for changes and confirm
    this.navCtl.back();
  }

}
