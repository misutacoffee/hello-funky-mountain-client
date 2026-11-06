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
import { ToastService } from '../../../services/toast.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-contract-index',
  templateUrl: './contract-index.page.html',
  styleUrls: ['./contract-index.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, RouterLink, EllipsisVerticalPopoverComponent, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
    IonCardContent, IonList, IonItem, IonTitle, IonButtons, IonButton, IonIcon, IonLabel, 
    IonNote, IonText, IonBreadcrumb, 
  ]
})
export class ContractIndexPage implements OnInit {
  private contractServ = inject(ContractService);
  private toast = inject(ToastService);
  private alert = inject(AlertService);
  contracts = signal<any>(null);
  activeOnly = signal<boolean>(true);
  filterOptions = signal<any>({
    activeOnly: this.activeOnly(), 
  });
  filteredContracts = computed(() => this.contractServ.filterContracts(this.contracts(), this.filterOptions()));
  displayContracts = computed(() => this.filteredContracts()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
  constructor() { 
    addIcons({addOutline});
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const contracts = await this.contractServ.index();
    this.contracts.set(contracts);
  }

  async delete(contract:any){
    const ok:any = await this.alert.present(`Delete ${contract?.name} as a contract?`, "Would you like to delete this contract? This action can not be undone.");
    if(ok){
      const results:any = await this.contractServ.delete(contract?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Contract successfully deleted.");
        const filtered:any = this.contracts()?.filter((c:any) => c?.uuid !== contract?.uuid);
        this.contracts.set(filtered);
      }else{
        this.toast.present("An error has occurred.");
      }
    }
  }

}
