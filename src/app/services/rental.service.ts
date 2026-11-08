import { Service, inject, computed } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { v4 as uuid } from 'uuid';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RentalEquipmentService } from './rental-equipment.service';

@Service()
export class RentalService {
  private apiServ = inject(ApiService);
  private authServ = inject(AuthService);
  private rentalEquipmentServ = inject(RentalEquipmentService);
  user = computed(() => this.authServ.user());
  
  filterRentals(rentals:any, filterOptions:any){
    return rentals
  }

  createNew(){
    return {
      rental_date: null, 
      return_date: null, 
      description: null, 
      note: null, 
      contract_uuid: null, 
      user_uuid: this.user()?.uuid || null, 
      uuid: uuid(), 
    }
  }

  buildForm(rental:any, rentalEquipment:any[] = []){
    return new FormGroup({
      rental_date: new FormControl(rental?.rental_date),
      return_date: new FormControl(rental?.return_date),
      description: new FormControl(rental?.description),
      note: new FormControl(rental?.note),
      contract_uuid: new FormControl(rental?.contract_uuid, [Validators.required]),
      user_uuid: new FormControl(rental?.user_uuid, [Validators.required]),
      uuid: new FormControl(rental?.uuid, [Validators.required]),
      rental_equipment: new FormArray(rentalEquipment?.map((rentalEquipment:any) => this.rentalEquipmentServ.buildForm(rentalEquipment)) || []), 
    });
  }

  async index(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('rentals').subscribe({
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

  async indexByContract(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`contracts/${uuid}/rentals`).subscribe({
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

  async show(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`rentals/${uuid}`).subscribe({
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
      this.apiServ.get('rentals/create').subscribe({
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
      this.apiServ.get(`rentals/${uuid}/edit`).subscribe({
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
      this.apiServ.post('rentals', contract).subscribe({
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
      this.apiServ.put(`rentals/${contract?.uuid}`, contract).subscribe({
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
      this.apiServ.delete(`rentals/${uuid}`).subscribe({
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
