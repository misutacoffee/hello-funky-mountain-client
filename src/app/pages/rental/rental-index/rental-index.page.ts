import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  private activatedRoute = inject(ActivatedRoute);
  private rentalServ = inject(RentalService);
  contractUuid:any;
  data = signal<any>(null);
  contract = computed(() => this.data()?.contract || null);
  rentals = computed(() => this.data()?.rentals || null);
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
    this.contractUuid = this.activatedRoute.snapshot.paramMap.get('contract_uuid');
    const data = this.contractUuid ? await this.rentalServ.indexByContract(this.contractUuid) : await this.rentalServ.index();
    this.data.set(data);
  }

  async delete(uuid:string){
    // 
  }

}
