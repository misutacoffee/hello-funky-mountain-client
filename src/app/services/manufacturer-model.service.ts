import { Service, inject } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Service()
export class ManufacturerModelService {
  private apiServ = inject(ApiService);

  async create(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('models/create').subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

  async editByUuid(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`models/${uuid}/edit`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

  async getAll(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('models').subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

  async getAllByManufacturerUuid(manufacturerUuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`manufacturers/${manufacturerUuid}/models`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

  async getByUuid(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`models/${uuid}`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

  trimObject(obj:any){
    return {
      name: obj?.name, 
      type: obj?.type, 
      description: obj?.description, 
      note: obj?.note, 
      is_active: obj?.is_active, 
      manufacturer_uuid: obj?.manufacturer_uuid, 
      uuid: obj?.uuid, 
    }
  }

  buildForm(model:any){
    return new FormGroup({
      name: new FormControl(model?.name, Validators.required), 
      type: new FormControl(model?.type),
      description: new FormControl(model?.description),
      note: new FormControl(model?.note), 
      is_active: new FormControl(model?.is_active, Validators.required), 
      manufacturer_uuid: new FormControl(model?.manufacturer_uuid, Validators.required), 
      uuid: new FormControl(model?.uuid, Validators.required), 
    });
  }

  createNew(manufacturerUuid:any = null){
    return {
      name: null, 
      type: null, 
      description: null, 
      note: null, 
      is_active: true, 
      manufacturer_uuid: manufacturerUuid || null, 
      uuid: uuid(), 
    }
  }

  async save(model:any){
    return new Promise((resolve, reject) => {
      this.apiServ.put(`models/${model?.uuid}`, model).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }

}
