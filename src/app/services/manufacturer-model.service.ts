import { Service, inject } from '@angular/core';
import { ApiService } from './api.service';

@Service()
export class ManufacturerModelService {
  private apiServ = inject(ApiService);

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
      description: obj?.description, 
      note: obj?.note, 
      is_active: obj?.is_active, 
      manufacturer_uuid: obj?.manufacturer_uuid, 
      uuid: obj?.uuid, 
    }
  }
}
