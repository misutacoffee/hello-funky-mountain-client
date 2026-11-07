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
  data = signal<any>(null);
  rental = computed(() => this.data()?.rental);
  form = computed<FormGroup>(() => this.rentalServ.buildForm(this.rental()));
  errors = signal<any>(null);
  contracts = computed(() => this.data()?.contracts);
  activeOnly = signal<boolean>(true);
  filterOptions = signal<any>({
    activeOnly: this.activeOnly(), 
  });
  filteredContracts = computed(() => this.contractServ.filterContracts(this.contracts(), this.filterOptions()));
  displayContracts = computed(() => this.filteredContracts()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
  contract = signal<any>(null);
  equipment = computed(() => this.data()?.equipment);
  equipmentActiveOnly = signal<boolean>(true);
  equipmentFilterOptions = signal<any>({
    activeOnly: this.activeOnly(), 
  });
  filteredEquipment = computed(() => this.equipmentServ.filterEquipment(this.equipment(), this.equipmentFilterOptions()));
  displayEquipment = computed(() => this.filteredEquipment()?.sort((a:any, b:any) => a?.name?.localeCompare(b?.name)));
  selectableEquipment = computed(() => this.rentalEquipmentServ.prepareSelectableEquipment(this.displayEquipment(), this.rental()))
  // 
  constructor() { 
    addIcons({addOutline, closeOutline});
  }
  get rentalEquipment():FormArray{
    return this.form()?.get('rental_equipment') as FormArray;
  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') as unknown as string;
    this.contractUuid = this.activatedRoute.snapshot.paramMap.get('contract_uuid') as unknown as string;
    const data:any = this.uuid ? await this.rentalServ.edit(this.uuid) : await this.rentalServ.create();
    this.data.set(data);
    this.contract.set(data?.rental?.contract || null);
    if(!this.uuid && this.contractUuid){
      const contract = this.contracts()?.find((contract:any) => contract?.uuid == this.contractUuid) || null;
      this.contract.set(contract);
      this.form()?.patchValue({contract_uuid: this.contractUuid});
    }
  }

  async removeRentalEquipment(equipment:any){

  }

  getEquipment(equipmentUuid:any){
    return this.equipment()?.find((equipment:any) => equipment?.uuid == equipmentUuid) || null;
  }

  onEquipmentSelectModalDismiss(event:any){
    const selectedEquipmentUuids = event?.detail?.data || [];
    const selectedEquipment:any = this.equipment()?.filter((equipment:any) => selectedEquipmentUuids.includes(equipment?.uuid));
    selectedEquipment?.forEach((equipment:any) => {
      const rentalEquipment:any = this.rentalEquipmentServ.createNew({rental_uuid: this.rental()?.uuid, equipment_uuid: equipment?.uuid});
      const formGroup = this.rentalEquipmentServ.buildForm(rentalEquipment);
      this.rentalEquipment.push(formGroup);
    })
  }

  toggleEquipmentSelect(event:any, equipment:any){
    const isChecked:boolean = event?.detail?.checked;
    if(isChecked){
      // create OR add rentalEquipment formGroup, add to formArray
    }
  }

  contractSelectChange(event:any){
    const uuid = event?.detail?.value || null;
    const contract = this.contracts()?.find((contract:any) => contract?.uuid == uuid) || null;
    this.contract.set(contract);
    this.form()?.patchValue({contract_uuid: uuid});
  }

  onContractDismiss(event:any){
    const contract:any = event?.detail?.data || null;
    if(contract){
      const contracts = [...this.contracts() || [], contract];
      this.data.set({...this.rental(), contracts: contracts});
      this.contract.set(contract);
      this.form()?.patchValue({contract_uuid: contract?.uuid || null});
    }
  }

  deselectContract(){
      this.contract.set(null);
      this.form()?.patchValue({contract_uuid: null});
  }

  async onSubmit(){
    if(this.form()?.valid){
      const contract = this.form()?.value;
      const results:any = this.uuid ? await this.rentalServ.update(contract) : await this.rentalServ.store(contract);
      if(results?.success){
        this.toast.present(results?.message ?? `Rental successfully ${this.uuid ? 'updated' : 'stored'} to the database.`);
        this.navServ.back();
      }else if(results?.error){
        const error:any = results?.error;
        this.errors.set(error?.errors);
        this.toast.present(error?.message ?? "An error has occurred.");
      }else{
        this.toast.present(results?.message ?? "An error has occurred.");
      }
    }else{
      this.toast.present("Please complete the form to continue.");
    }
  }

  cancel(){
    this.navServ.back();
  }

  async deleteEquipment(equipment:any){
    const ok:any = await this.alert.present(
      `Delete ${equipment?.name || 'Unknown Equipment'}?`, 
      "Are you sure you want to delete this equipment? This action can not be undone.", 
    );
    if(ok){
      const results:any = await this.equipmentServ.delete(equipment?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Equipment successfully deleted from the database.");
        const filtered = this.equipment()?.filter((e:any) => e?.uuid !== equipment?.uuid);
        this.data.set({...this.data(), equipment: filtered});
      }else{
        this.toast.present(results?.error || "An error has occurred.");
      }
    }
  }

  async delete(rental:any){
    const ok:any = await this.alert.present(
      `Delete ${rental?.id || 'Unlinked Rental'}?`, 
      "Are you sure you want to delete this rental? This action can not be undone.", 
    );
    if(ok){
      const results:any = await this.rentalServ.delete(rental?.uuid);
      if(results?.success){
        this.toast.present(results?.message || "Rental successfully deleted from the database.");
        this.navServ.back();
      }else{
        this.toast.present(results?.error || "An error has occurred.");
      }
    }
  }

}
