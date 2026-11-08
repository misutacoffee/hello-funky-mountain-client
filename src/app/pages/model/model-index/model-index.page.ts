import { Component, OnInit, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
  IonCardContent, IonList, IonItem, IonLabel, IonNote, IonButtons, IonButton, IonIcon, 
  IonText, IonBreadcrumb, 
 } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ManufacturerModelService } from '../../../services/manufacturer-model.service';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { AlertService } from '../../../services/alert.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-model-index',
  templateUrl: './model-index.page.html',
  styleUrls: ['./model-index.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
    IonCardContent, IonList, IonItem, IonLabel, IonNote, IonButtons, IonButton, IonIcon, 
    IonText, IonBreadcrumb, EllipsisVerticalPopoverComponent, 
  ]
})
export class ModelIndexPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private modelServ = inject(ManufacturerModelService);
  private manufacturerServ = inject(ManufacturerService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  manufacturerUuid:any;

  data = signal<any>(null);

  models = signal<any>(null);
  manufacturer = signal<any>(null);
  
  activeOnly = signal<boolean>(true);
  filterOptions = signal<any>({
    activeOnly: this.activeOnly(), 
  });
  filteredModels = computed(() => this.filterModels(this.models(), this.filterOptions()));
  displayModels = computed(() => this.filteredModels()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
  constructor() { 
    addIcons({addOutline});
    effect(() => {
      this.filterOptions.set({
        activeOnly: this.activeOnly(), 
      });
      if(this.data()){
        this.manufacturer.set(this.data()?.manufacturer || null);
        this.models.set(this.data()?.models || null);
      }
    });
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.manufacturerUuid = this.activatedRoute.snapshot.paramMap.get('manufacturer_uuid') as unknown as string;
    const data = this.manufacturerUuid ? await this.modelServ.indexByManufacturer(this.manufacturerUuid) :  await this.modelServ.index();
    this.data.set(data);
  }

  filterModels(models:any, filterOptions:any){
    let filtered:any = models;
    if(filterOptions?.activeOnly){
      filtered = filtered?.filter((model:any) => model?.is_active);
    }
    return filtered;
  }

  async delete(model:any){
    const ok:any = await this.alert.present(
      `Delete ${model?.name || 'Unknown Model'}`, 
      "Are you sure you want to delete this model? This action can not be undone."
    );
    if(ok){
      const results:any = await this.modelServ.delete(model?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Model successfully deleted from the database.");
        this.models.set(this.models()?.filter((m:any) => m?.uuid !== model?.uuid));
      }
    }
  }

}
