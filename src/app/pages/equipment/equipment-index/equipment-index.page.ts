import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, IonBreadcrumb } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-equipment-index',
  templateUrl: './equipment-index.page.html',
  styleUrls: ['./equipment-index.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, CommonModule, FormsModule, RouterLink, BreadcrumbsComponent, IonBreadcrumb
  ]
})
export class EquipmentIndexPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
