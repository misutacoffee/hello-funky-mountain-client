import { Component, OnInit, input, inject, computed } from '@angular/core';
import { IonBreadcrumbs, IonBreadcrumb, IonIcon, IonButtons, IonButton, IonItem, IonLabel } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { caretBackOutline } from 'ionicons/icons';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  imports: [
    IonBreadcrumbs, IonBreadcrumb, IonIcon, IonButtons, IonButton, IonItem, IonLabel, 
  ],
})
export class BreadcrumbsComponent  implements OnInit {
  private navServ = inject(NavService);
  breadcrumbs = input<any[]>(['']);
  constructor() { 
    addIcons({caretBackOutline})
  }

  ngOnInit() {}

  back(){
    this.navServ.back();
  }

}
