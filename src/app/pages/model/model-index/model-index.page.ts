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
  manufacturerUuid:any;
  models = signal<any>(null);
  manufacturer = signal<any>(null);
  filterOptions = signal<any>({
    activeOnly: true, 
  });
  filteredModels = computed(() => this.filterModels(this.models(), this.filterOptions()));
  displayModels = computed(() => this.filteredModels()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
  activeOnly = signal<boolean>(true);
  constructor() { 
    addIcons({addOutline});
    effect(() => {
      this.filterOptions.set({
        activeOnly: this.activeOnly(), 
      });
    });
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.manufacturerUuid = this.activatedRoute.snapshot.paramMap.get('manufacturer_uuid') as unknown as string;
    if(this.manufacturerUuid){
      const manufacturerData:any = await this.modelServ.getAllByManufacturerUuid(this.manufacturerUuid);
      const manufacturer = this.manufacturerServ.trimObject(manufacturerData);
      const models:any = manufacturerData?.manufacturer_models;
      this.manufacturer.set(manufacturer);
      this.models.set(models);
    }else{
      const models:any = await this.modelServ.getAll();
      this.manufacturer.set(null);
      this.models.set(models);
    }
  }

  filterModels(models:any, filterOptions:any){
    let filtered:any = models;
    if(filterOptions?.activeOnly){
      filtered = filtered?.filter((model:any) => model?.is_active);
    }
    return filtered;
  }

  async delete(modelUuid:string){
    // 
  }

}
