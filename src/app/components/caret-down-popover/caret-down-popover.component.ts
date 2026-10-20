import { Component, OnInit } from '@angular/core';
import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPopover, IonText } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { caretDownOutline } from 'ionicons/icons';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-caret-down-popover',
  templateUrl: './caret-down-popover.component.html',
  styleUrls: ['./caret-down-popover.component.scss'],
  imports: [
    IonText, IonButton, IonList, IonPopover, IonIcon, IonContent, IonItem, 
  ],
})
export class CaretDownPopoverComponent  implements OnInit {
  trigger:string = uuid();
  constructor() { 
    addIcons({caretDownOutline});
  }

  ngOnInit() {}

}
