import { Service, inject, signal, computed } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { v4 as uuid } from 'uuid';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Service()
export class ContractService {
  private apiServ = inject(ApiService);
  private authServ = inject(AuthService);
  user = computed(() => this.authServ.user());
  
  filterContracts(contracts:any, filterOptions:any){
    return contracts
  }

  createNew(){
    return {
      name: null, 
      display_name: null, 
      phone: null, 
      email: null, 
      primary_address: null, 
      secondary_address: null, 
      tertiary_address: null, 
      city: null, 
      state: null, 
      zip: null, 
      description: null, 
      note: null, 
      is_active: true, 
      user_uuid: this.user()?.uuid || null, 
      uuid: uuid(), 
    }
  }

  buildForm(contract:any){
    return new FormGroup({
      name: new FormControl(contract?.name, [Validators.required]),
      display_name: new FormControl(contract?.display_name),
      phone: new FormControl(contract?.phone),
      email: new FormControl(contract?.email),
      primary_address: new FormControl(contract?.primary_address),
      secondary_address: new FormControl(contract?.secondary_address),
      tertiary_address: new FormControl(contract?.tertiary_address),
      city: new FormControl(contract?.city),
      state: new FormControl(contract?.state),
      zip: new FormControl(contract?.zip),
      description: new FormControl(contract?.description),
      note: new FormControl(contract?.note),
      is_active: new FormControl(contract?.is_active, [Validators.required]),
      user_uuid: new FormControl(contract?.user_uuid, [Validators.required]),
      uuid: new FormControl(contract?.uuid, [Validators.required]),
    });
  }

  async index(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('contracts').subscribe({
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
      this.apiServ.get(`contracts/${uuid}`).subscribe({
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
      this.apiServ.get('contracts/create').subscribe({
        next: (results:any) => {
          resolve(this.createNew());
          resolve(results);
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
      this.apiServ.get(`contracts/${uuid}/edit`).subscribe({
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
      this.apiServ.post('contracts', contract).subscribe({
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
      this.apiServ.put(`contracts/${contract?.uuid}`, contract).subscribe({
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
      this.apiServ.delete(`contracts/${uuid}`).subscribe({
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
