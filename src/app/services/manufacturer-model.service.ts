import { Service, inject } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Service()
export class ManufacturerModelService {
  private apiServ = inject(ApiService);

  filterModels(models:any, filterOptions:any){
    return models
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

  async index(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('models').subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      });
    });
  }

  async indexByManufacturer(manufacturerUuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`manufacturers/${manufacturerUuid}/models`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      });
    });
  }

  async show(uuid:string){
    return new Promise((resolve, reject) => {
      this.apiServ.get(`models/${uuid}`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      });
    });
  }

  async create(manufacturerUuid:any = null){
    return new Promise((resolve, reject) => {
      this.apiServ.get('models/create').subscribe({
        next: (results:any) => {
          const manufacturers:any = results?.manufacturers;
          const model:any = this.createNew(manufacturerUuid);
          resolve({
            manufacturers: manufacturers, 
            model: model, 
          });
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
      this.apiServ.get(`models/${uuid}/edit`).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      });
    });
  }

  async store(model:any){
    return new Promise((resolve, reject) => {
      this.apiServ.post('models', model).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      });
    });
  }

  async update(model:any){
    return new Promise((resolve, reject) => {
      this.apiServ.put(`models/${model?.uuid}`, model).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      });
    });
  }

  async delete(uuid:string){
    // 
  }

}
