import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonNote, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CaretDownPopoverComponent } from '../../../components/caret-down-popover/caret-down-popover.component';
import { RentalService } from '../../../services/rental.service';
import { EquipmentSelectModalComponent } from '../../../components/equipment/equipment-select-modal/equipment-select-modal.component';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';
import { AlertService } from '../../../services/alert.service';
import { ToastService } from '../../../services/toast.service';
import { NavService } from '../../../services/nav.service';
import { RentalEquipmentService } from '../../../services/rental-equipment.service';
import { EquipmentService } from '../../../services/equipment.service';

@Component({
  selector: 'app-rental-show',
  templateUrl: './rental-show.page.html',
  styleUrls: ['./rental-show.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, RouterLink, CaretDownPopoverComponent, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonBreadcrumb, IonGrid, IonRow, IonCol, 
    IonCard, IonCardContent, IonList, IonItem, IonLabel, IonText, IonNote, IonIcon, IonButtons, 
    IonButton, EquipmentSelectModalComponent, IonItemDivider, EllipsisVerticalPopoverComponent, 
  ]
})
export class RentalShowPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private equipmentServ = inject(EquipmentService);
  private rentalServ = inject(RentalService);
  private rentalEquipmentServ = inject(RentalEquipmentService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private navServ = inject(NavService);
  data = signal<any>(null);
  rental = computed(() => this.data()?.rental || null);
  invoices = computed(() => this.data()?.invoices || null);
  rentalEquipment = computed(() => this.rental()?.rental_equipment || null);
  contract = computed(() => this.rental()?.contract);
  equipment = computed(() => this.data()?.equipment);
  equipmentActiveOnly = signal<boolean>(true);
  equipmentFilterOptions = signal<any>({
    activeOnly: this.equipmentActiveOnly(), 
  });
  filteredEquipment = computed(() => this.equipmentServ.filterEquipment(this.equipment(), this.equipmentFilterOptions()));
  displayEquipment = computed(() => this.filteredEquipment()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
  selectableEquipment = computed(() => this.rentalEquipmentServ.prepareSelectableEquipment(this.displayEquipment(), this.rental()));
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const uuid:any = this.activatedRoute.snapshot.paramMap.get('uuid');
    const data = await this.rentalServ.show(uuid);
    this.data.set(data);
  }

  onEquipmentSelectDismiss(event:any){
    const selectedEquipmentUuids:any = event?.detail?.data;
    const selection:any = this.equipment()?.filter((equipment:any) => selectedEquipmentUuids.includes(equipment?.uuid));
    const rentalEquipment = selection?.map((equipment:any) => this.rentalEquipmentServ.createNew({rental_uuid: this.rental()?.uuid, equipment_uuid: equipment?.uuid}));
  }

  async delete(rental:any){
    const ok:any = await this.alert.present(
      `Delete ${rental?.id || 'Unlinked Rental'}?`, 
      "Are you sure you want to delete this rental? This action can not be undone.", 
    );
    if(ok){
      const results:any = await this.rentalServ.delete(rental?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Rental successfully deleted from the database.");
        this.navServ.back();
      }else{
        this.toast.present(results?.error || "An error has occurred.");
      }
    }
  }

  async deleteInvoice(invoice:any){
    // 
  }

}
