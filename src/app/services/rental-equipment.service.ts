import { Service, inject, computed } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { v4 as uuid } from 'uuid';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Service()
export class RentalEquipmentService {
  private apiServ = inject(ApiService);
  private authServ = inject(AuthService);
  user = computed(() => this.authServ.user());

  prepareSelectableEquipment(equipment:any, rental:any){
    const existing:any = rental?.rental_equipment;
    return equipment?.map((equipment:any) => {
      const match:any = existing?.find((rentalEquipment:any) => 
        rentalEquipment?.equipment_uuid == equipment?.uuid && 
        rentalEquipment?.rental_uuid == rental?.uuid
      );
      if(match){
        return {
          ...equipment, 
          isSelected: true, 
          rentalEquipment: match, 
        }
      }else{
        let rentalEquipment:any = this.createNew();
        rentalEquipment.equipment_uuid = equipment?.uuid || null;
        rentalEquipment.rental_uuid = rental?.uuid || null;
        return {
          ...equipment, 
          isSelected: false, 
          rentalEquipment: rentalEquipment, 
        }
      }
    });
  }

  buildSelection(equipment:any, rentalEquipment:any){
    return equipment?.map((equipment:any) => {
      const rentalItem = rentalEquipment?.find((re:any) => re?.equipment_uuid == equipment?.uuid);
      return {
        ...equipment, 
        isSelected: rentalItem ? true : false, 
        rental_equipment: rentalItem || null, 
      }
    });
  }
  
  filterRentals(rentalEquipment:any, filterOptions:any){
    return rentalEquipment
  }

  createNew(values:any = null){
    return {
      rental_uuid: values?.rental_uuid || null, 
      equipment_uuid: values?.equipment_uuid || null, 
      quantity: null, 
      unit: null, 
      price: null, 
      total: null, 
      note: null, 
      uuid: uuid(), 
    }
  }

  buildForm(rentalEquipment:any){
    return new FormGroup({
      rental_uuid: new FormControl(rentalEquipment?.rental_uuid, [Validators.required]),
      equipment_uuid: new FormControl(rentalEquipment?.equipment_uuid, [Validators.required]),
      quantity: new FormControl(rentalEquipment?.quantity),
      unit: new FormControl(rentalEquipment?.unit),
      price: new FormControl(rentalEquipment?.price),
      total: new FormControl(rentalEquipment?.total),
      note: new FormControl(rentalEquipment?.note),
      uuid: new FormControl(rentalEquipment?.uuid, [Validators.required]),
    });
  }

  async index(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('rental-equipment').subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (results:any) => {
          resolve(results?.error);
          reject(results);
        }
      })
    });
  }

  async show(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`rental-equipment/${uuid}`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (results:any) => {
          resolve(results?.error);
          reject(results);
        }
      });
    });
  }

  async create(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('rental-equipment/create').subscribe({
        next: (results:any) => {
          resolve({
            ...results, 
            rental: this.createNew(), 
          });
        }, 
        error: (results:any) => {
          resolve(results?.error);
          reject(results);
        }
      });
    });
  }

  async edit(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`rental-equipment/${uuid}/edit`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (results:any) => {
          resolve(results?.error);
          reject(results);
        }
      });
    });
  }

  async store(contract:any){
    return new Promise((resolve, reject) => {
      this.apiServ.post('rental-equipment', contract).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (results:any) => {
          resolve(results?.error);
          reject(results);
        }
      });
    });
  }

  async update(contract:any){
    return new Promise((resolve, reject) => {
      this.apiServ.put(`rental-equipment/${contract?.uuid}`, contract).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (results:any) => {
          resolve(results?.error);
          reject(results);
        }
      });
    });
  }

  async delete(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.delete(`rental-equipment/${uuid}`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (results:any) => {
          resolve(results?.error);
          reject(results);
        }
      });
    });
  }

}
