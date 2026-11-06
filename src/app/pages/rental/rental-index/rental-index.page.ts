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
import { AlertService } from '../../../services/alert.service';
import { ToastService } from '../../../services/toast.service';

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
  private alert = inject(AlertService);
  private  toast = inject(ToastService);
  contractUuid:any;
  data = signal<any>(null);
  contract = computed(() => this.data()?.contract || null);
  rentals = computed(() => this.data()?.rentals || null);
  activeOnly = signal<boolean>(true);
  filterOptions = signal<any>({
    activeOnly: this.activeOnly(), 
  });
  filteredRentals = computed(() => this.rentalServ.filterRentals(this.rentals(), this.filterOptions()));
  displayRentals = computed(() => this.filteredRentals()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
  constructor() { 
    addIcons({addOutline});
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.contractUuid = this.activatedRoute.snapshot.paramMap.get('contract_uuid');
    const data = this.contractUuid ? await this.rentalServ.indexByContract(this.contractUuid) : await this.rentalServ.index();
    this.data.set(data);
  }

  async delete(rental:any){
    const ok:any = await this.alert.present(
      `Delete ${rental?.id || 'Unlinked Rental'}`, 
      "Are you sure you want to delete this rental? This action can not be undone."
    );
    if(ok){
      const results:any = await this.rentalServ.delete(rental?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Rental successfully deleted from the database.");
        const filtered:any = this.rentals()?.filter((m:any) => m?.uuid !== rental?.uuid);
        this.data.set({...this.data, rentals: filtered});
      }
    }
  }

}
