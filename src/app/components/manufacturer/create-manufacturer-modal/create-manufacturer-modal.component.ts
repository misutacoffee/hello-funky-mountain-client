import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { IonHeader, IonList, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManufacturerService } from '../../../services/manufacturer.service';

@Component({
  selector: 'app-create-manufacturer-modal',
  templateUrl: './create-manufacturer-modal.component.html',
  styleUrls: ['./create-manufacturer-modal.component.scss'],
  imports: [
    IonHeader, IonList, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem, FormsModule, ReactiveFormsModule, 
    IonButtons, IonButton, IonIcon, IonInput, IonLabel, IonItem, FormsModule, ReactiveFormsModule
  ],
})
export class CreateManufacturerModalComponent  implements OnInit {
  private manufacturerServ = inject(ManufacturerService);
  manufacturer = signal<any>(this.manufacturerServ.createNew());
  form = computed(() => this.manufacturerServ.buildForm(this.manufacturer()));
  constructor() { }

  ngOnInit() {}

  cancel(){
    // 
  }

  confirm(){
    // 
  }

}
