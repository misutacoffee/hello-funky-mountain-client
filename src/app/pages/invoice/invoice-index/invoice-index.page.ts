import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular';
import { ContractService } from '../../../services/contract.service';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';
import { InvoiceService } from '../../../services/invoice.service';
import { ToastService } from '../../../services/toast.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-invoice-index',
  templateUrl: './invoice-index.page.html',
  styleUrls: ['./invoice-index.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, RouterLink, EllipsisVerticalPopoverComponent, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
    IonCardContent, IonList, IonItem, IonTitle, IonButtons, IonButton, IonIcon, IonLabel, 
    IonNote, IonText, IonBreadcrumb, 
  ]
})
export class InvoiceIndexPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private invoiceServ = inject(InvoiceService);
  private toast = inject(ToastService);
  private alert = inject(AlertService);
  contractUuid:any;
  rentalUuid:any;
  data = signal<any>(null);
  invoices = computed(() => this.data()?.invoices);
  contract = computed(() => this.data()?.contract);
  rental = computed(() => this.data()?.rental);
  activeOnly = signal<boolean>(true);
  filterOptions = signal<any>({
    activeOnly: true, 
  });
  filteredInvoices = computed(() => this.invoiceServ.filterInvoices(this.invoices(), this.filterOptions()));
  displayInvoices = computed(() => this.filteredInvoices()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
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
    this.rentalUuid = this.activatedRoute.snapshot.paramMap.get('rental_uuid');
    let promise:any = this.invoiceServ.index();
    if(this.contractUuid){
      promise = this.invoiceServ.indexByContract(this.contractUuid);
    }else if(this.rentalUuid){
      promise = this.invoiceServ.indexByRental(this.rentalUuid);
    }
    const data = await promise;
    this.data.set(data);
  }

  async delete(invoice:any){
    const ok:any = await this.alert.present(
      `Delete ${invoice?.id || 'Unlinked Rental'}`, 
      "Are you sure you want to delete this rental? This action can not be undone."
    );
    if(ok){
      const results:any = await this.invoiceServ.delete(invoice?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Rental successfully deleted from the database.");
        const filtered:any = this.invoices()?.filter((m:any) => m?.uuid !== invoice?.uuid);
        this.data.set({...this.data, invoices: filtered});
      }
    }
  }

}
