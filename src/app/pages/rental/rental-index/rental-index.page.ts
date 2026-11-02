import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { RouterLink } from '@angular/router';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';
import { RentalService } from '../../../services/rental.service';

@Component({
  selector: 'app-rental-index',
  templateUrl: './rental-index.page.html',
  styleUrls: ['./rental-index.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, RouterLink, EllipsisVerticalPopoverComponent, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
    IonCardContent, IonList, IonItem, IonTitle, IonButtons, IonButton, IonIcon, IonLabel, 
    IonNote, IonText, IonBreadcrumb, 
  ]
})
export class RentalIndexPage implements OnInit {
  private rentalServ = inject(RentalService);
  rentals = signal<any>(null);
  activeOnly = signal<boolean>(true);
  filterOptions = signal<any>({
    activeOnly: true, 
  });
  filteredRentals = computed(() => this.rentalServ.filterRentals(this.rentals(), this.filterOptions()));
  displayRentals = computed(() => this.filteredRentals()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
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
    const rentals = await this.rentalServ.index();
    this.rentals.set(rentals);
  }

  async delete(uuid:string){
    // 
  }

}
