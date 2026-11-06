import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular';
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

@Component({
  selector: 'app-rental-create-edit',
  templateUrl: './rental-create-edit.page.html',
  styleUrls: ['./rental-create-edit.page.scss'],
  imports: [
    CommonModule, FormsModule, BreadcrumbsComponent, ReactiveFormsModule, RouterLink, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonTitle, 
    IonCard, IonCardContent, IonList, IonButtons, IonButton, IonIcon, IonLabel, IonNote, IonText, 
    IonInput, IonCheckbox, IonTextarea, IonSelect, IonSelectOption, IonBreadcrumb, 
    CreateContractModalComponent, EllipsisVerticalPopoverComponent, 
  ]
})
export class RentalCreateEditPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private rentalServ = inject(RentalService);
  private contractServ = inject(ContractService);
  private equipmentServ = inject(EquipmentService);
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
  constructor() { 
    addIcons({addOutline, closeOutline});
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

}
