import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { CaretDownPopoverComponent } from '../../../components/caret-down-popover/caret-down-popover.component';

@Component({
  selector: 'app-contract-show',
  templateUrl: './contract-show.page.html',
  styleUrls: ['./contract-show.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, RouterLink, CaretDownPopoverComponent, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonBreadcrumb, IonGrid, IonRow, IonCol, 
    IonCard, IonCardContent, IonList, IonItem, IonLabel, IonText, IonNote, IonIcon, IonButtons, 
    IonButton, 
  ]
})
export class ContractShowPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private contractServ = inject(ContractService);
  contract = signal<any>(null);
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const uuid:any = this.activatedRoute.snapshot.paramMap.get('uuid');
    const contract = await this.contractServ.show(uuid);
    this.contract.set(contract);
  }

  async delete(uuid:string){
    // 
  }

}
