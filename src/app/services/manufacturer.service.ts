import { Service, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { ApiService } from './api.service';

@Service()
export class ManufacturerService {
  private apiServ = inject(ApiService);

  async getAll() {
    const results = await this.apiServ.get('manufacturers');
    return results
  }

  async getByUuid(uuid: string) {
    const results = await this.apiServ.get(`manufacturers/${uuid}`);
    return results
  }

  trimObject(obj: any) {
    return {
      name: obj?.name?.trim() || '',
      description: obj?.description?.trim() || '',
      note: obj?.note?.trim() || '',
      is_active: obj?.is_active || true,
      uuid: obj?.uuid || uuid(),
    }
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

  async save(manufacturer:any){
    // Implement the logic to save manufacturer to your data source
    const results = await this.apiServ.put(`manufacturers/${manufacturer.uuid}`, manufacturer);
    return results
  }

  async delete(uuid:string){
    // Implement the logic to delete manufacturer by UUID from your data source
  }

}
