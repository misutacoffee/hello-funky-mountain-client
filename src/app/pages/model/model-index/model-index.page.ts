import { Component, OnInit, signal, computed, inject } from '@angular/core';
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
import { v4 as uuid } from 'uuid';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

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
  manufacturerUuid:any;
  models = signal<any>(null);
  manufacturer = signal<any>(null);
  constructor() { 
    addIcons({addOutline});
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.manufacturerUuid = this.activatedRoute.snapshot.paramMap.get('manufacturer_uuid') as unknown as string;
    const models:any = await this.modelServ.getAll();
    this.models.set(models);
  }

  async delete(modelUuid:string){
    console.log(modelUuid);
  }

}
