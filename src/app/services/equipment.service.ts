import { Service, inject, computed } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Service()
export class EquipmentService {
  private apiServ = inject(ApiService);
  private authServ = inject(AuthService);
  user = computed(() => this.authServ.user());

  filterEquipment(equipment:any, filterOptions:any){
    return equipment
  }

  createNew(){
    return {
      name: '',
      serial_number: '',
      type: '',
      description: '',
      note: '',
      rental_rate: '',
      rental_unit: '',
      status: '', 
      is_active: '',
      user_uuid: this.user()?.uuid ?? '',
      manufacturer_model_uuid: '',
      uuid: uuid(), 
    }
  }

  buildForm(equipment:any = null){
    return new FormGroup({
      name: new FormControl(equipment?.name || '', [Validators.required]),
      serial_number: new FormControl(equipment?.serial_number || ''),
      type: new FormControl(equipment?.type || ''),
      description: new FormControl(equipment?.description || ''),
      note: new FormControl(equipment?.note || ''),
      rental_rate: new FormControl(equipment?.rental_rate || ''),
      rental_unit: new FormControl(equipment?.rental_unit || ''),
      status: new FormControl(equipment?.status || ''),
      is_active: new FormControl(equipment?.is_active || true, [Validators.required]),
      user_uuid: new FormControl(equipment?.user_uuid || '', [Validators.required]),
      manufacturer_model_uuid: new FormControl(equipment?.manufacturer_model_uuid || '', [Validators.required]),
      uuid: new FormControl(equipment?.uuid || '', [Validators.required]),
    }); 
  }

  async index() {
    return new Promise((resolve, reject) => {
      this.apiServ.get('equipment').subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

  async show(uuid: string) {
    return new Promise((resolve, reject) => {
      this.apiServ.get(`equipment/${uuid}`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

  async create(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('equipment/create').subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

  async edit(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`equipment/${uuid}/edit`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

  async store(equipment:any){
    return new Promise((resolve, reject) => {
      this.apiServ.post(`equipment/${equipment?.uuid}`, equipment).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

  async update(equipment:any){
    return new Promise((resolve, reject) => {
      this.apiServ.put(`equipment/${equipment?.uuid}`, equipment).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

  async delete(uuid:string){
    // Implement the logic to delete equipment by UUID from your data source
  }

}
