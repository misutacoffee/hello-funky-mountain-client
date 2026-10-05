import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Service()
export class EquipmentService {

  async getAll() {
    // Implement the logic to retrieve all equipment from your data source
    return []
  }

  async getByUuid(uuid: string) {
    // Implement the logic to retrieve equipment by UUID from your data source
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
      is_active: obj?.is_active?.trim() || '',
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
      type: new FormControl(equipment?.type || '', [Validators.required]),
      description: new FormControl(equipment?.description || '', [Validators.required]),
      note: new FormControl(equipment?.note || '', [Validators.required]),
      rental_rate: new FormControl(equipment?.rental_rate || '', [Validators.required]),
      rental_unit: new FormControl(equipment?.rental_unit || '', [Validators.required]),
      is_active: new FormControl(equipment?.is_active || '', [Validators.required]),
      user_uuid: new FormControl(equipment?.user_uuid || '', [Validators.required]),
      manufacturer_model_uuid: new FormControl(equipment?.manufacturer_model_uuid || '', [Validators.required]),
      status: new FormControl(equipment?.status || '', [Validators.required]),
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
