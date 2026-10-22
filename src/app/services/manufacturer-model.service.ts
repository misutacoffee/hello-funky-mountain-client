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

  }

  async getByUuid(uuid:string){

  }
}
