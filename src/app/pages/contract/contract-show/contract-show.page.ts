import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonRow, IonText, IonTitle, IonToolbar, NavController } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { CaretDownPopoverComponent } from '../../../components/caret-down-popover/caret-down-popover.component';
import { AlertService } from '../../../services/alert.service';
import { ToastService } from '../../../services/toast.service';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';

@Component({
  selector: 'app-contract-show',
  templateUrl: './contract-show.page.html',
  styleUrls: ['./contract-show.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, RouterLink, CaretDownPopoverComponent, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonBreadcrumb, IonGrid, IonRow, IonCol, 
    IonCard, IonCardContent, IonList, IonItem, IonLabel, IonText, IonNote, IonIcon, IonButtons, 
    IonButton, EllipsisVerticalPopoverComponent, 
  ]
})
export class ContractShowPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private contractServ = inject(ContractService);
  private alert = inject(AlertService);
  private toast = inject(ToastService);
  private navCtl = inject(NavController);
  contract = signal<any>(null);
  rentals = computed(() => this.contract()?.rentals);
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const uuid:any = this.activatedRoute.snapshot.paramMap.get('uuid');
    const contract = await this.contractServ.show(uuid);
    this.contract.set(contract);
  }

  async delete(contract:any){
    const ok:any = await this.alert.present(`Delete ${contract?.name} as a contract?`, "Would you like to delete this contract? This action can not be undone.");
    if(ok){
      const results:any = await this.contractServ.delete(contract?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Contract successfully deleted.");
        this.navCtl.back();
      }else{
        this.toast.present("An error has occurred.");
      }
    }
  }

  async deleteRental(rental:any){

  }

}
