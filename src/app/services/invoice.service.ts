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

  createNew(values:any = null){
    return {
      purchase_order_number: values?.purchase_order_number || null, 
      invoice_date: values?.invoice_date ||  null, 
      amount: values?.amount ||  null, 
      tax: values?.tax ||  null, 
      due_date: values?.due_date || null, 
      paid_date: values?.paid_date || null, 
      rental_uuid: values?.rental_uuid || null, 
      contract_uuid: values?.contract_uuid || null, 
      user_uuid: this.user()?.uuid || null, 
      uuid: uuid(), 
    }
  }

  buildForm(invoice:any){
    return new FormGroup({
      purchase_order_number: new FormControl(invoice?.purchase_order_number),
      invoice_date: new FormControl(invoice?.invoice_date),
      amount: new FormControl(invoice?.amount),
      tax: new FormControl(invoice?.tax),
      due_date: new FormControl(invoice?.due_date),
      paid_date: new FormControl(invoice?.paid_date),
      rental_uuid: new FormControl(invoice?.rental_uuid),
      contract_uuid: new FormControl(invoice?.contract_uuid, Validators.required),
      user_uuid: new FormControl(invoice?.user_uuid, Validators.required),
      uuid: new FormControl(invoice?.uuid, Validators.required),
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
          resolve({
            ...results, 
            invoice: this.createNew(), 
          });
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
            ...results, 
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
            ...results, 
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

  async delete(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.delete(`invoices/${uuid}`).subscribe({
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
