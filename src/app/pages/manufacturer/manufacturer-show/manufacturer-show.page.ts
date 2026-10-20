import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, 
  IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButtons, IonButton, 
  IonIcon, IonList, IonItem, IonNote, IonBreadcrumb, IonLabel,
  IonText, 
 } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { CaretDownPopoverComponent } from '../../../components/caret-down-popover/caret-down-popover.component';

@Component({
  selector: 'app-manufacturer-show',
  templateUrl: './manufacturer-show.page.html',
  styleUrls: ['./manufacturer-show.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, CaretDownPopoverComponent, 
    IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButtons, IonButton, 
    IonIcon, IonList, IonItem, IonNote, IonBreadcrumb, IonLabel, IonText, 
  ]
})
export class ManufacturerShowPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private manufacturerServ = inject(ManufacturerService);
  uuid:any;
  manufacturer = signal<any>(null);
  models = computed<any>(() => this.manufacturer()?.manufacturer_models);
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') as unknown as string;
    const manufacturer = await this.manufacturerServ.getByUuid(this.uuid);
    this.manufacturer.set(manufacturer);
  }

  async delete(uuid:string){
    console.log(uuid);
  }

}
