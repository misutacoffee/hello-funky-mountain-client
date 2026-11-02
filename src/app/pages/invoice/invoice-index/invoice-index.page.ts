import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular';
import { ContractService } from '../../../services/contract.service';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { RouterLink } from '@angular/router';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';
import { InvoiceService } from '../../../services/invoice.service';

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
  private contractServ = inject(ContractService);
  private invoiceServ = inject(InvoiceService);
  invoices = signal<any>(null);
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
    const contracts = await this.contractServ.index();
    this.invoices.set(contracts);
  }

  async delete(uuid:string){
    // 
  }

}
