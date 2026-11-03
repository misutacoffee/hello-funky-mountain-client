import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonBreadcrumb, 
  IonCard, IonCardContent, IonText, IonList, IonItem, IonLabel, IonNote, IonButtons, IonButton, 
  IonIcon, 
 } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { ManufacturerModelService } from '../../../services/manufacturer-model.service';
import { CaretDownPopoverComponent } from '../../../components/caret-down-popover/caret-down-popover.component';

@Component({
  selector: 'app-model-show',
  templateUrl: './model-show.page.html',
  styleUrls: ['./model-show.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, RouterLink, CaretDownPopoverComponent, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonBreadcrumb, 
    IonCard, IonCardContent, IonText, IonList, IonItem, IonLabel, IonNote, IonButtons, IonButton, 
    IonIcon, 
  ]
})
export class ModelShowPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private modelServ = inject(ManufacturerModelService);
  uuid:any;
  manufacturerUuid:any;
  model = signal<any>(null);
  manufacturer = computed(() => this.model()?.manufacturer);
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') as unknown as string;
    this.manufacturerUuid = this.activatedRoute.snapshot.paramMap.get('manufacturer_uuid') as unknown as string;
    const model:any = await this.modelServ.show(this.uuid);
    this.model.set(model);
  }

  async delete(uuid:string){
    // 
  }

}
