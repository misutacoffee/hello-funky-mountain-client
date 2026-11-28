import { CommonModule } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPopover, IonText } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-nav-profile-popover',
  templateUrl: './nav-profile-popover.component.html',
  styleUrls: ['./nav-profile-popover.component.scss'],
  imports: [
    RouterLink, CommonModule, 
    IonButton, IonIcon, IonPopover, IonContent, IonItem, IonLabel, 
    IonList, IonText, 
  ],
})
export class NavProfilePopoverComponent  implements OnInit {
  // just move this into the layout
  user = input<any>(null);
  trigger:string = uuid();
  constructor() { 
    addIcons({personCircleOutline});
  }

  ngOnInit() {}

}
