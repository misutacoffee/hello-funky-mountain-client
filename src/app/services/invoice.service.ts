import { Service, inject, signal, computed } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { v4 as uuid } from 'uuid';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Service()
export class InvoiceService {
  private apiServ = inject(ApiService);
  private authServ = inject(AuthService);
  user = computed(() => this.authServ.user());
  
  filterInvoices(invoices:any, filterOptions:any){
    return invoices
  }

  createNew(){
    return {
      purchase_order_number: null, 
      invoice_date: null, 
      amount: null, 
      tax: null, 
      due_date: null, 
      paid_date: null, 
      rental_uuid: null, 
      contract_uuid: null, 
      user_uuid: this.user()?.uuid || null, 
      uuid: uuid(), 
    }
  }

  buildForm(contract:any){
    return new FormGroup({
      purchase_order_number: new FormControl(contract?.purchase_order_number),
      invoice_date: new FormControl(contract?.invoice_date),
      amount: new FormControl(contract?.amount),
      tax: new FormControl(contract?.tax),
      due_date: new FormControl(contract?.due_date),
      paid_date: new FormControl(contract?.paid_date),
      rental_uuid: new FormControl(contract?.rental_uuid, [Validators.required]),
      contract_uuid: new FormControl(contract?.contract_uuid, [Validators.required]),
      user_uuid: new FormControl(contract?.user_uuid, [Validators.required]),
      uuid: new FormControl(contract?.uuid, [Validators.required]),
    });
  }

  async index(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('invoices').subscribe({
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
      this.apiServ.get(`contracts/${uuid}/invoices`).subscribe({
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

  async indexByRental(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`rentals/${uuid}/invoices`).subscribe({
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
      this.apiServ.get(`invoices/${uuid}`).subscribe({
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
      this.apiServ.get('invoices/create').subscribe({
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

  async createByContract(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`contracts/${uuid}/invoices/create`).subscribe({
        next: (results:any) => {
          resolve({
            contract: results?.contract, 
            invoice: this.createNew(), 
          });
        }, 
        error: (results:any) => {
          resolve(results?.error);
          reject(results);
        }
      });
    });
  }

  async createByRental(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`rentals/${uuid}/invoices/create`).subscribe({
        next: (results:any) => {
          resolve({
            contract: results?.contract, 
            invoice: this.createNew(), 
            rental: results?.rental, 
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
      this.apiServ.get(`invoices/${uuid}/edit`).subscribe({
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
      this.apiServ.post('invoices', contract).subscribe({
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
      this.apiServ.put(`invoices/${contract?.uuid}`, contract).subscribe({
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
