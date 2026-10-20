import { Component, OnInit, input, inject, computed } from '@angular/core';
import { IonBreadcrumbs, IonBreadcrumb, IonIcon, IonButtons, IonButton, IonItem, IonLabel, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { caretBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  imports: [
    IonBreadcrumbs, IonBreadcrumb, IonIcon, IonButtons, IonButton, IonItem, IonLabel, 
  ],
})
export class BreadcrumbsComponent  implements OnInit {
  private navCtl = inject(NavController);
  breadcrumbs = input<any[]>(['']);
  constructor() { 
    addIcons({caretBackOutline})
  }

  ngOnInit() {}

  back(){
    this.navCtl.back();
  }

}
