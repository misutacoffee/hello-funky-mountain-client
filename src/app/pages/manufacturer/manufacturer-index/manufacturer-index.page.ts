import { Component, OnInit, inject, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonBreadcrumb, IonToolbar, IonGrid, 
  IonRow, IonCol, IonItem, IonCard, IonCardContent, IonList, IonLabel, 
  IonButtons, IonButton, IonIcon, IonCardTitle, IonNote, IonText, 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, ellipsisVerticalOutline } from 'ionicons/icons';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { RouterLink } from '@angular/router';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';
import { AlertService } from '../../../services/alert.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-manufacturer-index',
  templateUrl: './manufacturer-index.page.html',
  styleUrls: ['./manufacturer-index.page.scss'],
  imports: [
    IonContent, IonHeader, RouterLink, IonTitle, IonBreadcrumb, BreadcrumbsComponent, 
    IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonCard, IonCardContent, 
    IonList, IonLabel, IonButtons, IonButton, IonIcon, IonCardTitle, IonNote, IonText, 
    CommonModule, FormsModule, EllipsisVerticalPopoverComponent, 
  ]
})
export class ManufacturerIndexPage implements OnInit {
  private manufacturerServ = inject(ManufacturerService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  data = signal<any>(null);
  manufacturers = computed(() => this.data()?.manufacturers);
  filteredManufacturers = computed(() => this.manufacturerServ.filterManufacturers(this.manufacturers(), this.filterOptions()));
  displayManufacturers = computed(() => this.filteredManufacturers()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
  filterOptions = signal<any>({
    activeOnly: true, 
  });
  activeOnly = signal<boolean>(true);
  constructor() { 
    addIcons({addOutline, ellipsisVerticalOutline});
    effect(() => {
      this.filterOptions.set({
        activeOnly: this.activeOnly(), 
      });
    });
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const data = await this.manufacturerServ.index();
    this.data.set(data);
  }

  async delete(manufacturer:any){
    const ok:any = await this.alert.present(
      `Delete ${manufacturer?.name || 'Unknown Manufacturer'}`, 
      "Are you sure you want to delete this manufacturer? This action can not be undone."
    );
    if(ok){
      const results:any = await this.manufacturerServ.delete(manufacturer?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Manufacturer successfully deleted from the database.");
        this.data.set({...this.data, manufacturers: this.manufacturers()?.filter((m:any) => m?.uuid !== manufacturer?.uuid)});
      }
    }
  }

}
