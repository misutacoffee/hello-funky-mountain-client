import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Service()
export class EquipmentService {

  createNew(){
    return {
      name: '',
      description: '',
      type: '',
      status: '',
      uuid: null, 
    }
  }

  buildForm(equipment:any = null){
    return new FormGroup({
      name: new FormControl(equipment?.name || '', [Validators.required]),
      description: new FormControl(equipment?.description || '', [Validators.required]),
      type: new FormControl(equipment?.type || '', [Validators.required]),
      status: new FormControl(equipment?.status || '', [Validators.required]),
    }); 
  }
}
