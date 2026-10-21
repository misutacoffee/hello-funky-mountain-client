import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
  IonCardContent, IonList, IonRadio, IonRadioGroup, IonItem, IonLabel, IonNote, 
  IonInput, IonButtons, IonButton, IonBreadcrumb
 } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    CommonModule, FormsModule, RouterLink, BreadcrumbsComponent, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
    IonCardContent, IonList, IonRadio, IonRadioGroup, IonItem, IonLabel, IonNote, 
  IonInput, IonButtons, IonButton, IonBreadcrumb
  ]
})
export class SettingsPage implements OnInit {
  private settingsServ = inject(SettingsService);
  constructor() { }

  ngOnInit() {
  }

}
