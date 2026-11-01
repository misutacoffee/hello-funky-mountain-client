import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { IonHeader, IonSelectOption, IonList, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManufacturerModelService } from '../../../services/manufacturer-model.service';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-create-model-modal',
  templateUrl: './create-model-modal.component.html',
  styleUrls: ['./create-model-modal.component.scss'],
  imports: [
    IonHeader, IonSelectOption, IonList, IonButtons, IonIcon, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonLabel, IonItem, FormsModule, ReactiveFormsModule
  ],
})
export class CreateModelModalComponent  implements OnInit {
  private modelServ = inject(ManufacturerModelService);
  manufacturers = signal<any>(null);
  model = signal<any>(this.modelServ.createNew());
  form = computed(() => this.modelServ.buildForm(this.model()));
  constructor() { 
    addIcons({addOutline});
  }

  ngOnInit() {}

  updateManufacturer(event:any){
    // 
  }

  cancel(){
    // 
  }

  confirm(){
    // 
  }

}
