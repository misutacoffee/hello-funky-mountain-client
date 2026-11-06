import { Service, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { ApiService } from './api.service';

@Service()
export class ManufacturerService {
  private apiServ = inject(ApiService);

  filterManufacturers(manufacturers:any, filterOptions:any){
    let filtered:any = manufacturers;
    if(filterOptions?.activeOnly){
      filtered = filtered?.filter((manufacturer:any) => manufacturer?.is_active);
    }
    return filtered
  }

  createNew(){
    return {
      name: '',
      description: '',
      note: '',
      is_active: '',
      uuid: uuid(), 
    }
  }

  buildForm(manufacturer:any = null){
    return new FormGroup({
      name: new FormControl(manufacturer?.name || '', [Validators.required]),
      description: new FormControl(manufacturer?.description || ''),
      note: new FormControl(manufacturer?.note || ''),
      is_active: new FormControl(manufacturer?.is_active || true, [Validators.required]),
      uuid: new FormControl(manufacturer?.uuid || '', [Validators.required]),
    }); 
  }

  async index() {
    return new Promise((resolve, reject) => {
      this.apiServ.get('manufacturers').subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      });
    });
  }

  async show(uuid: string) {
    return new Promise((resolve, reject) => {
      this.apiServ.get(`manufacturers/${uuid}`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      });
    });
  }

  async create(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('manufacturers/create').subscribe({
        next: (results:any) => {
          resolve(this.createNew());
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      });
    });
  }

  async edit(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`manufacturers/${uuid}/edit`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      });
    });
  }

  async store(manufacturer:any){
    return new Promise((resolve, reject) => {
      this.apiServ.post('manufacturers', manufacturer).subscribe({
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

  async update(manufacturer:any){
    return new Promise((resolve, reject) => {
      this.apiServ.put(`manufacturers/${manufacturer.uuid}`, manufacturer).subscribe({
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
      this.apiServ.delete(`manufacturers/${uuid}`).subscribe({
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
