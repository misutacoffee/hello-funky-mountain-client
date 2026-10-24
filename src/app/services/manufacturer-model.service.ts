import { Service, inject } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Service()
export class ManufacturerModelService {
  private apiServ = inject(ApiService);

  async create(){
    const data = await this.apiServ.get(`/models/create`);
    return data
  }

  async editByUuid(uuid:string){
    const data = await this.apiServ.get(`/models/${uuid}/edit`);
    return data
  }

  async getAll(){
    const models:any = await this.apiServ.get('/models');
    return models
  }

  async getAllByManufacturerUuid(manufacturerUuid:string){
    const manufacturer = await this.apiServ.get(`/manufacturers/${manufacturerUuid}/models`);
    return manufacturer
  }

  async getByUuid(uuid:string){
    const model:any = await this.apiServ.get(`/models/${uuid}`);
    return model
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
    const results:any = await this.apiServ.put(`/models/${model?.uuid}`, model);
    return results
  }

}
