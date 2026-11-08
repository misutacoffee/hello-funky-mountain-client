import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CaretDownPopoverComponent } from '../../../components/caret-down-popover/caret-down-popover.component';
import { InvoiceService } from '../../../services/invoice.service';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';
import { AlertService } from '../../../services/alert.service';
import { ToastService } from '../../../services/toast.service';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-invoice-show',
  templateUrl: './invoice-show.page.html',
  styleUrls: ['./invoice-show.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, RouterLink, CaretDownPopoverComponent, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonBreadcrumb, IonGrid, IonRow, IonCol, 
    IonCard, IonCardContent, IonList, IonItem, IonLabel, IonText, IonNote, IonIcon, IonButtons, 
    IonButton, EllipsisVerticalPopoverComponent, 
  ]
})
export class InvoiceShowPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private invoiceServ = inject(InvoiceService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private navServ = inject(NavService);
  invoice = signal<any>(null);
  contract = computed(() => this.invoice()?.contract);
  rental = computed(() => this.invoice()?.rental);
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const uuid:any = this.activatedRoute.snapshot.paramMap.get('uuid');
    const invoice = await this.invoiceServ.show(uuid);
    this.invoice.set(invoice);
  }

  async delete(invoice:any){
    const ok:any = await this.alert.present(
      `Delete Invoice ${invoice?.id || 'Unlinked Invoice'}?`, 
      "Are you sure you want to delete this invoice? This action can not be undone.", 
    );
    if(ok){
      const results:any = await this.invoiceServ.delete(invoice?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Invoice successfully deleted from the database.");
        this.navServ.back();
      }else{
        this.toast.present(results?.error || "An error has occurred.");
      }
    }
  }

}
