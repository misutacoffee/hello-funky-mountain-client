import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
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
import { v4 as uuid } from 'uuid';
import { InvoiceService } from '../../../services/invoice.service';

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
  private invoiceServ = inject(InvoiceService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private navServ = inject(NavService);

  equipmentModalTrigger:string = uuid();

  data = signal<any>(null);

  rental = signal<any>(null);
  invoices = signal<any>(null);
  rentalEquipment = signal<any>(null);
  contract = signal<any>(null);
  equipment = signal<any>(null);

  equipmentActiveOnly = signal<boolean>(true);
  equipmentFilterOptions = signal<any>({
    activeOnly: this.equipmentActiveOnly(), 
  });
  filteredEquipment = computed(() => this.equipmentServ.filterEquipment(this.equipment(), this.equipmentFilterOptions()));
  displayEquipment = computed(() => this.filteredEquipment()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
  selectableEquipment = computed(() => this.rentalEquipmentServ.prepareSelectableEquipment(this.displayEquipment(), this.rental()));
  constructor() { 
    effect(() => {
      if(this.data()){
        this.rental.set(this.data()?.rental || null);
        this.invoices.set(this.data()?.invoices || null);
        this.rentalEquipment.set(this.data()?.rentalEquipment || null);
        this.contract.set(this.data()?.contract || null);
        this.equipment.set(this.data()?.equipment || null);
      }
    })
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const uuid:any = this.activatedRoute.snapshot.paramMap.get('uuid');
    const data = await this.rentalServ.show(uuid);
    this.data.set(data);
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
    const ok:any = await this.alert.present(
      `Delete ${invoice?.id || 'Unlinked Invoice'}`, 
      "Are you sure you want to delete this invoice? This action can not be undone."
    );
    if(ok){
      const results:any = await this.invoiceServ.delete(invoice?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Invoice successfully deleted from the database.");
        const filtered:any = this.invoices()?.filter((m:any) => m?.uuid !== invoice?.uuid);
        this.invoices.set(filtered);
      }
    }
  }

}
