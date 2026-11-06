import { Service, inject, computed } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { v4 as uuid } from 'uuid';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Service()
export class RentalEquipmentService {
  private apiServ = inject(ApiService);
  private authServ = inject(AuthService);
  user = computed(() => this.authServ.user());

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

  createNew(){
    return {
      rental_uuid: null, 
      equipment_uuid: null, 
      quantity: null, 
      unit_price: null, 
      total_price: null, 
      note: null, 
      uuid: uuid(), 
    }
  }

  buildForm(rentalEquipment:any){
    return new FormGroup({
      rental_uuid: new FormControl(rentalEquipment?.rental_uuid, [Validators.required]),
      equipment_uuid: new FormControl(rentalEquipment?.equipment_uuid, [Validators.required]),
      quantity: new FormControl(rentalEquipment?.quantity),
      unit_price: new FormControl(rentalEquipment?.unit_price),
      total_price: new FormControl(rentalEquipment?.total_price),
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
