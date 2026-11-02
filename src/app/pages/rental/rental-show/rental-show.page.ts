import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CaretDownPopoverComponent } from '../../../components/caret-down-popover/caret-down-popover.component';
import { RentalService } from '../../../services/rental.service';

@Component({
  selector: 'app-rental-show',
  templateUrl: './rental-show.page.html',
  styleUrls: ['./rental-show.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, RouterLink, CaretDownPopoverComponent, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonBreadcrumb, IonGrid, IonRow, IonCol, 
    IonCard, IonCardContent, IonList, IonItem, IonLabel, IonText, IonNote, IonIcon, IonButtons, 
    IonButton, 
  ]
})
export class RentalShowPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private rentalServ = inject(RentalService);
  rental = signal<any>(null);
  constructor() { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const uuid:any = this.activatedRoute.snapshot.paramMap.get('uuid');
    const rental = await this.rentalServ.show(uuid);
    this.rental.set(rental);
  }

  async delete(uuid:string){
    // 
  }

}
