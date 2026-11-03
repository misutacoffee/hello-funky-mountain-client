import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonCard, IonCardContent, IonTitle, IonToolbar, IonGrid, IonRow, IonIcon, IonCol, IonList, IonItem, IonLabel, IonBreadcrumb, IonButtons, IonButton, IonText } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { EquipmentService } from '../../../services/equipment.service';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';

@Component({
  selector: 'app-equipment-index',
  templateUrl: './equipment-index.page.html',
  styleUrls: ['./equipment-index.page.scss'],
  imports: [
    IonContent, IonHeader, IonCard, IonCardContent, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonList, 
    IonItem, IonLabel, CommonModule, FormsModule, RouterLink, IonIcon, EllipsisVerticalPopoverComponent, 
    BreadcrumbsComponent, IonBreadcrumb, IonButtons, IonButton, IonText, 
  ]
})
export class EquipmentIndexPage implements OnInit {
  private equipmentServ = inject(EquipmentService);
  equipment = signal<any>(null);
  constructor() { 
    addIcons({addOutline});
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const equipment:any = await this.equipmentServ.index();
    this.equipment.set(equipment);
  }

  async delete(uuid:string){
    // 
  }

}
