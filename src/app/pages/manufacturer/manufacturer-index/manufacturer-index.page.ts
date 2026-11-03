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
  manufacturers = signal<any>(null);
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
    const manufacturers = await this.manufacturerServ.index();
    this.manufacturers.set(manufacturers);
  }

  async delete(uuid:string){
    // 
  }

}
