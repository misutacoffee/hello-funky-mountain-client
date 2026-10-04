import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Service()
export class EquipmentService {

  async getByUuid(uuid: string) {
    // Implement the logic to retrieve equipment by UUID from your data source
  }

  trimObject(obj: any) {
    return {
      name: obj?.name?.trim() || '',
      description: obj?.description?.trim() || '',
      type: obj?.type?.trim() || '',
      status: obj?.status?.trim() || '',
      uuid: obj?.uuid || uuid(),
    }
  }

  createNew(){
    return {
      name: '',
      description: '',
      type: '',
      status: '',
      uuid: uuid(), 
    }
  }

  buildForm(equipment:any = null){
    return new FormGroup({
      name: new FormControl(equipment?.name || '', [Validators.required]),
      description: new FormControl(equipment?.description || '', [Validators.required]),
      type: new FormControl(equipment?.type || '', [Validators.required]),
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
