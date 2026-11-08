import { Component, OnInit, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonText, IonHeader, IonTitle, IonToolbar, IonBreadcrumb, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonLabel, IonCardTitle, IonList, IonItem, IonButtons, IonIcon, IonButton, IonNote } from '@ionic/angular';
import { EquipmentService } from '../../../services/equipment.service';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { CaretDownPopoverComponent } from '../../../components/caret-down-popover/caret-down-popover.component';
import { AlertService } from '../../../services/alert.service';
import { ToastService } from '../../../services/toast.service';
import { NavService } from '../../../services/nav.service';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';

@Component({
  selector: 'app-equipment-show',
  templateUrl: './equipment-show.page.html',
  styleUrls: ['./equipment-show.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, 
    IonRow, IonText, IonCol, IonCard, IonCardContent, IonLabel, IonCardTitle, IonList, IonItem, 
    IonButtons, IonIcon, IonButton, IonNote, RouterLink, IonBreadcrumb, BreadcrumbsComponent, 
    CaretDownPopoverComponent, EllipsisVerticalPopoverComponent, 
  ]
})
export class EquipmentShowPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private equipmentServ = inject(EquipmentService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private navServ = inject(NavService);
  uuid:any;
  data = signal<any>(null);
  equipment = signal<any>(null);
  rentals = signal<any>(null);
  constructor() { 
    effect(() => {
      if(this.data()){
        this.equipment.set(this.data()?.equipment);
        this.rentals.set(this.data()?.rentals);
      }
    });
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    const data:any = await this.equipmentServ.show(this.uuid);
    this.data.set(data);
  }

  async delete(equipment:any){
    const ok:any = await this.alert.present(
      `Delete ${equipment?.name || 'Unknown Equipment'}?`, 
      "Are you sure you want to delete this equipment? This action can not be undone.", 
    );
    if(ok){
      const results:any = await this.equipmentServ.delete(equipment?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Equipment successfully deleted from the database.");
        this.navServ.back();
      }else{
        this.toast.present(results?.error || "An error has occurred.");
      }
    }
  }

}
