import { Component, OnInit, inject, computed, signal, effect } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonBreadcrumb, 
  IonList, IonItem, IonLabel, IonNote, IonText, IonIcon, IonButtons, IonButton, IonInput, 
  IonCheckbox, IonTextarea, IonSelect, IonSelectOption, IonCard, IonCardContent,
} from '@ionic/angular';
import { ManufacturerModelService } from '../../../services/manufacturer-model.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { ToastService } from '../../../services/toast.service';
import { addIcons } from 'ionicons';
import { addOutline, closeOutline } from 'ionicons/icons';
import { CreateManufacturerModalComponent } from '../../../components/manufacturer/create-manufacturer-modal/create-manufacturer-modal.component';
import { NavService } from '../../../services/nav.service';

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
  private navServ = inject(NavService);
  private toast = inject(ToastService);
  private location = inject(Location);
  uuid:any;
  manufacturerUuid:any;
  data = signal<any>(null);
  model = computed(() => this.data()?.model);
  manufacturer = signal<any>(null);
  manufacturers = computed(() => this.data()?.manufacturers);
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
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') || null;
    this.manufacturerUuid = this.activatedRoute.snapshot.paramMap.get('manufacturer_uuid') || null;
    const data:any = this.uuid ? await this.modelServ.edit(this.uuid) : await this.modelServ.create(this.manufacturerUuid);
    this.data.set(data);
    // 
    if(this.manufacturerUuid){
      const manufacturer:any = data?.manufacturers?.find((manufacturer:any) => manufacturer?.uuid == this.manufacturerUuid) || null;
      this.manufacturer.set(manufacturer);
    }
  }

  onManufacturerDismiss(event:any){ // create manufacturer modal
    const manufacturer:any = event?.detail?.data;
    if(manufacturer){
      const manufacturers = [...this.manufacturers() || [], manufacturer];
      this.data.set({...this.data(), manufacturers});
      this.manufacturer.set(manufacturer);
      this.form()?.patchValue({manufacturer_uuid: manufacturer?.uuid});
      if(this.manufacturerUuid){
        this.manufacturerUuid = manufacturer?.uuid;
        const url:string = this.uuid ? `/manufacturers/${this.manufacturerUuid}/${this.uuid}/edit` : `/manufacturers/${this.manufacturerUuid}/create`;
        this.location.replaceState(url);
      }
    }
  }

  manufacturerSelectChange(event:any){
    const manufacturerUuid:any = event?.detail?.value;
    const manufacturer:any = this.manufacturers()?.find((manufacturer:any) => manufacturer?.uuid == manufacturerUuid) ?? null;
    this.form()?.patchValue({manufacturer_uuid: manufacturerUuid});
    this.manufacturer.set(manufacturer);
    if(this.manufacturerUuid){
      this.manufacturerUuid = manufacturer?.uuid;
      const url:string = this.uuid ? `/manufacturers/${this.manufacturerUuid}/${this.uuid}/edit` : `/manufacturers/${this.manufacturerUuid}/create`;
      this.location.replaceState(url);
    }
  }

  clearManufacturer(){
    this.form()?.patchValue({manufacturer_uuid: null});
    this.manufacturer.set(null);
  }

  async addManufacturer(){
    // 
  }

  async onSubmit(){
    if(this.form()?.valid){
      const model:any = this.form()?.value;
      const results:any = this.uuid ? await this.modelServ.update(model) : await this.modelServ.store(model);
      if(results?.success){
        this.toast.present(results?.message ?? "Model successfully saved to the database.");
        this.navServ.back();
      }else{
        this.toast.present(results?.message ?? "An error has occurred.");
      }
    }else{
        this.toast.present("Please complete the form to continue.");
    }
  }

  async cancel(){
    // check for changes and confirm
    this.navServ.back();
  }

}
