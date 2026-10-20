import { Component, OnInit } from '@angular/core';
import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPopover } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline } from 'ionicons/icons';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-ellipsis-vertical-popover',
  templateUrl: './ellipsis-vertical-popover.component.html',
  styleUrls: ['./ellipsis-vertical-popover.component.scss'],
  imports: [
    IonButton, IonList, IonPopover, IonIcon, IonContent, IonItem, 
  ],
})
export class EllipsisVerticalPopoverComponent  implements OnInit {
  trigger:string = uuid();
  nestedTrigger:string = uuid();
  constructor() { 
    addIcons({ellipsisVerticalOutline});
  }

  ngOnInit() {}

}
