import { Component, OnInit, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonText, IonHeader, IonTitle, IonToolbar, IonBreadcrumb, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonLabel, IonCardTitle, IonList, IonItem, IonButtons, IonIcon, IonButton, IonNote } from '@ionic/angular';
import { EquipmentService } from '../../../services/equipment.service';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-equipment-show',
  templateUrl: './equipment-show.page.html',
  styleUrls: ['./equipment-show.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, 
    IonRow, IonText, IonCol, IonCard, IonCardContent, IonLabel, IonCardTitle, IonList, IonItem, 
    IonButtons, IonIcon, IonButton, IonNote, RouterLink, IonBreadcrumb, BreadcrumbsComponent, 
  ]
})
export class EquipmentShowPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private equipmentServ = inject(EquipmentService);
  uuid:any;
  equipment = signal<any>(null);
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    const equipment:any = await this.equipmentServ.getByUuid(this.uuid);
    this.equipment.set(equipment);
  }

}
