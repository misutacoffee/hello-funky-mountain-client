import { Service, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { ApiService } from './api.service';

@Service()
export class EquipmentService {
  private apiServ = inject(ApiService);

  async getAll() {
    const results = await this.apiServ.get('equipment');
    return results
  }

  async getByUuid(uuid: string) {
    const results = await this.apiServ.get(`equipment/${uuid}`);
    return results
  }

  trimObject(obj: any) {
    return {
      name: obj?.name?.trim() || '',
      serial_number: obj?.serial_number?.trim() || '',
      type: obj?.type?.trim() || '',
      description: obj?.description?.trim() || '',
      note: obj?.note?.trim() || '',
      rental_rate: obj?.rental_rate?.trim() || '',
      rental_unit: obj?.rental_unit?.trim() || '',
      is_active: obj?.is_active,
      user_uuid: obj?.user_uuid?.trim() || '',
      manufacturer_model_uuid: obj?.manufacturer_model_uuid?.trim() || '',
      uuid: obj?.uuid || uuid(),
    }
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
      is_active: '',
      user_uuid: '',
      manufacturer_model_uuid: '',
      uuid: uuid(), 
    }
  }

  buildForm(equipment:any = null){
    return new FormGroup({
      name: new FormControl(equipment?.name || '', [Validators.required]),
      serial_number: new FormControl(equipment?.serial_number || '', [Validators.required]),
      type: new FormControl(equipment?.type || ''),
      description: new FormControl(equipment?.description || ''),
      note: new FormControl(equipment?.note || ''),
      rental_rate: new FormControl(equipment?.rental_rate || ''),
      rental_unit: new FormControl(equipment?.rental_unit || ''),
      is_active: new FormControl(equipment?.is_active || true, [Validators.required]),
      user_uuid: new FormControl(equipment?.user_uuid || '', [Validators.required]),
      manufacturer_model_uuid: new FormControl(equipment?.manufacturer_model_uuid || '', [Validators.required]),
      status: new FormControl(equipment?.status || ''),
      uuid: new FormControl(equipment?.uuid || '', [Validators.required]),
    }); 
  }

  async save(equipment:any){
    // Implement the logic to save equipment to your data source
  }

  async delete(uuid:string){
    // Implement the logic to delete equipment by UUID from your data source
  }

}
