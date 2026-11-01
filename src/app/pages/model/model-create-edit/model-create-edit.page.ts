import { Component, OnInit, inject, computed, signal, effect } from '@angular/core';
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
import { addOutline, closeOutline } from 'ionicons/icons';
import { CreateManufacturerModalComponent } from '../../../components/manufacturer/create-manufacturer-modal/create-manufacturer-modal.component';

@Component({
  selector: 'app-model-create-edit',
  templateUrl: './model-create-edit.page.html',
  styleUrls: ['./model-create-edit.page.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, BreadcrumbsComponent, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonBreadcrumb, 
    IonList, IonItem, IonLabel, IonNote, IonText, IonIcon, IonButtons, IonButton, IonInput, 
    IonCheckbox, IonTextarea, IonSelect, IonSelectOption, IonCard, IonCardContent, 
    CreateManufacturerModalComponent,
  ]
})
export class ModelCreateEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private modelServ = inject(ManufacturerModelService);
  private manufacturerServ = inject(ManufacturerService);
  private navCtl = inject(NavController);
  private toast = inject(ToastService);
  uuid:any;
  manufacturerUuid:any;
  manufacturer = signal<any>(null);
  manufacturers = signal<any>(null);
  model = signal<any>(null);
  form = computed<FormGroup>(() => this.modelServ.buildForm(this.model()));
  filteredManufacturers = computed(() => this.manufacturerServ.filterManufacturers(this.manufacturers(), this.filterOptions()));
  displayManufacturers = computed(() => this.filteredManufacturers()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
  filterOptions = signal<any>({
    activeOnly: true, 
  });
  activeOnly = signal<boolean>(true);
  constructor() { 
    addIcons({addOutline, closeOutline});
    effect(() => {
      this.filterOptions.set({
        activeOnly: this.activeOnly(), // manufacturers 
      });
    });
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

  onManufacturerDismiss(event:any){
    const manufacturer:any = event?.detail?.data;
    if(manufacturer){
      const manufacturers = [...this.manufacturers() || [], manufacturer];
      this.manufacturers.set(manufacturers);
      this.manufacturer.set(manufacturer);
      this.form()?.patchValue({manufacturer_uuid: manufacturer?.uuid});
    }
  }

  updateManufacturer(event:any){
    const manufacturerUuid:any = event?.detail?.value;
    const manufacturer:any = this.manufacturers()?.find((manufacturer:any) => manufacturer?.uuid == manufacturerUuid) ?? null;
    this.manufacturer.set(manufacturer);
  }

  clearManufacturer(){
    this.form()?.patchValue({manufacturer_uuid: null});
    this.manufacturer.set(null);
  }

  async addManufacturer(){
    // 
  }

  async save(){
    if(this.form()?.valid){
      const model:any = this.form()?.value;
      const results:any = await this.modelServ.save(model);
      if(results?.success){
        this.toast.present(results?.message ?? "Model successfully saved to the database.");
        this.navCtl.back();
      }else{
        this.toast.present(results?.message ?? "An error has occurred.");
      }
    }else{
        this.toast.present("Please complete the form to continue.");
    }
  }

  async cancel(){
    // check for changes and confirm
    this.navCtl.back();
  }

}
