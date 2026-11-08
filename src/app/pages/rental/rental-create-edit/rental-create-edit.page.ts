import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { ToastService } from '../../../services/toast.service';
import { RentalService } from '../../../services/rental.service';
import { addIcons } from 'ionicons';
import { addOutline, closeOutline } from 'ionicons/icons';
import { CreateContractModalComponent } from '../../../components/contract/create-contract-modal/create-contract-modal.component';
import { NavService } from '../../../services/nav.service';
import { EquipmentService } from '../../../services/equipment.service';
import { EllipsisVerticalPopoverComponent } from '../../../components/ellipsis-vertical-popover/ellipsis-vertical-popover.component';
import { AlertService } from '../../../services/alert.service';
import { RentalEquipmentService } from '../../../services/rental-equipment.service';
import { CaretDownPopoverComponent } from '../../../components/caret-down-popover/caret-down-popover.component';
import { EquipmentSelectModalComponent } from '../../../components/equipment/equipment-select-modal/equipment-select-modal.component';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-rental-create-edit',
  templateUrl: './rental-create-edit.page.html',
  styleUrls: ['./rental-create-edit.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, ReactiveFormsModule, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonTitle, 
    IonCard, IonCardContent, IonList, IonButtons, IonButton, IonIcon, IonLabel, IonNote, IonText, 
    IonInput, IonCheckbox, IonTextarea, IonSelect, IonSelectOption, IonBreadcrumb, 
    CreateContractModalComponent, EllipsisVerticalPopoverComponent, CaretDownPopoverComponent, 
    EquipmentSelectModalComponent, IonCardHeader, IonCardTitle, IonCardSubtitle, 
  ]
})
export class RentalCreateEditPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private rentalServ = inject(RentalService);
  private contractServ = inject(ContractService);
  private equipmentServ = inject(EquipmentService);
  private rentalEquipmentServ = inject(RentalEquipmentService);
  private toast = inject(ToastService);
  private navServ = inject(NavService);
  private alert = inject(AlertService);

  uuid:any;
  contractUuid:any;
  contractModalTrigger:string = uuid();
  equipmentModalTrigger:string = uuid();

  data = signal<any>(null);

  contract = signal<any>(null);
  contracts = signal<any>(null);
  equipment = signal<any>(null);
  rental = signal<any>(null);
  rentalEquipment = signal<any>(null);

  form = computed(() => this.rentalServ.buildForm(this.rental(), this.rentalEquipment()));

  selectedContract = signal<any>(null);

  constructor() { 
    addIcons({addOutline, closeOutline});
    effect(() => {
      if(this.data()){
        this.contract.set(this.data()?.contract || null);
        this.contracts.set(this.data()?.contracts || []);
        this.equipment.set(this.data()?.equipment || []);
        this.rental.set(this.data()?.rental || null);
        this.rentalEquipment.set(this.data()?.rentalEquipment || []);
      }
      if(this.contract()){
        this.selectedContract.set(this.contract());
        this.form()?.patchValue({contract_uuid: this.contract()?.uuid || null});
      }
    });
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') as unknown as string;
    this.contractUuid = this.activatedRoute.snapshot.paramMap.get('contract_uuid') as unknown as string;
    const data:any = this.uuid ? await this.rentalServ.edit(this.uuid) : await this.rentalServ.create();
    this.data.set(data);
  }

  onContractSelectChange(event:any){
    const contractUuid:any = event?.detail?.value || null;
    if(contractUuid){
      const contract:any = this.contracts()?.find((contract:any) => contract?.uuid == contractUuid);
      this.selectedContract.set(contract || null);
      this.form()?.patchValue({contract_uuid: contractUuid || null});
    }else{
      this.clearContract();
    }
  }

  clearContract(){
      this.selectedContract.set(null);
      this.form()?.patchValue({contract_uuid: null});
  }

  cancel(){
    this.navServ.back();
  }

  async onSubmit(){
    if(this.form()?.valid){
      const rental:any = this.form()?.value;
      // 
    }else{
      this.toast.present("Please complete the form to continue.");
    }
  }

}
