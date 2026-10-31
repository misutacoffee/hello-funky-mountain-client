import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonInput,
  IonLabel,
  IonList, 
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonBreadcrumb,
  NavController, 
  IonCheckbox, 
} from '@ionic/angular';
import { EquipmentService } from '../../../services/equipment.service';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-equipment-create-edit',
  templateUrl: './equipment-create-edit.page.html',
  styleUrls: ['./equipment-create-edit.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonButtons, IonIcon, IonInput, IonLabel, IonItem, IonSelect, RouterLink, 
    IonSelectOption, IonTextarea, IonList, ReactiveFormsModule, BreadcrumbsComponent, IonBreadcrumb, 
    IonCheckbox, 
  ]
})
export class EquipmentCreateEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private equipmentServ = inject(EquipmentService);
  private authServ = inject(AuthService);
  private toast = inject(ToastService);
  private navCtl = inject(NavController);
  uuid:any;
  equipmentData = signal<any>(null);
  equipment = computed<any>(() => this.equipmentData()?.equipment ?? this.equipmentServ.createNew());
  form = computed<FormGroup>(() => this.equipmentServ.buildForm(this.equipment()));
  user = computed<any>(() => this.authServ.user());
  manufacturers = computed(() => this.equipmentData()?.manufacturers);
  models = computed(() => this.equipmentData()?.models);
  constructor() { }

  async ngOnInit() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    const equipmentData:any = this.uuid ? await this.equipmentServ.editByUuid(this.uuid) : await this.equipmentServ.create();
    this.equipmentData.set(equipmentData);
  }

  manufacturerSelectChange(event:any){
    // 
  }

  modelSelectChange(event:any){
    // 
  }

  async onSubmit() {
    if (this.form().valid) {
      const equipment = this.equipmentServ.trimObject(this.form().value);
      const results = await this.equipmentServ.save(equipment);
    }else{
      this.toast.present("Please complete the form to proceed.");
    }
  }

  cancel(){
    // alert if changes
    this.navCtl.back();
  }

}
