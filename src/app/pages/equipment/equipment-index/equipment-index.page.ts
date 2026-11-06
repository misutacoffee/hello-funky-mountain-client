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
import { AlertService } from '../../../services/alert.service';
import { ToastService } from '../../../services/toast.service';

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
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  data = signal<any>(null);
  equipment = computed(() => this.data()?.equipment);
  activeOnly = signal<boolean>(true);
  filterOptions = signal<any>({
    activeOnly: this.activeOnly(), 
  });
  filteredEquipment = computed(() => this.equipmentServ.filterEquipment(this.equipment(), this.filterOptions()));
  displayEquipment = computed(() => this.filteredEquipment()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
  constructor() { 
    addIcons({addOutline});
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const data:any = await this.equipmentServ.index();
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
        const filtered = this.equipment()?.filter((e:any) => e?.uuid !== equipment?.uuid);
        this.data.set({...this.data(), equipment: filtered});
      }else{
        this.toast.present(results?.error || "An error has occurred.");
      }
    }
  }

}
