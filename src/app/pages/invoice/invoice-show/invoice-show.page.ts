import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CaretDownPopoverComponent } from '../../../components/caret-down-popover/caret-down-popover.component';
import { InvoiceService } from '../../../services/invoice.service';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';

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

  async delete(uuid:string){
    // 
  }

  async deleteContract(contract:any){
    // 
  }

  async deleteRental(rental:any){
    // 
  }

}
