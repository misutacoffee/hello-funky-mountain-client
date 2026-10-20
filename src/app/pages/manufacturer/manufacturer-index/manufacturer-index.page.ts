import { Component, OnInit, inject, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonBreadcrumb, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonCard, IonCardContent, IonList, IonLabel, IonButtons, IonButton, IonIcon, IonCardTitle, IonNote,  } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manufacturer-index',
  templateUrl: './manufacturer-index.page.html',
  styleUrls: ['./manufacturer-index.page.scss'],
  imports: [IonContent, IonHeader, RouterLink, IonTitle, IonBreadcrumb, BreadcrumbsComponent, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonCard, IonCardContent, IonList, IonLabel, IonButtons, IonButton, IonIcon, IonCardTitle, IonNote, CommonModule, FormsModule]
})
export class ManufacturerIndexPage implements OnInit {
  private manufacturerServ = inject(ManufacturerService);
  manufacturers = signal<any>(null);
  constructor() { 
    addIcons({addOutline});

  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    const manufacturers = await this.manufacturerServ.getAll();
    this.manufacturers.set(manufacturers);
  }

}
