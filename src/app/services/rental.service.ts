import { Service, inject, signal, computed } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { v4 as uuid } from 'uuid';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Service()
export class RentalService {
  private apiServ = inject(ApiService);
  private authServ = inject(AuthService);
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

  buildForm(contract:any){
    return new FormGroup({
      rental_date: new FormControl(contract?.rental_date),
      return_date: new FormControl(contract?.return_date),
      description: new FormControl(contract?.description),
      note: new FormControl(contract?.note),
      contract_uuid: new FormControl(contract?.contract_uuid, [Validators.required]),
      user_uuid: new FormControl(contract?.user_uuid, [Validators.required]),
      uuid: new FormControl(contract?.uuid, [Validators.required]),
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
          let rental:any = this.createNew();
          rental.contracts = results?.contracts;
          resolve(rental);
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

}
