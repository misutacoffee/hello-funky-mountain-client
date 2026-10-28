import { Service, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ToastService } from './toast.service';
import { v4 as uuid } from 'uuid';

@Service()
export class AuthService {
  private apiServ = inject(ApiService);
  private toast = inject(ToastService);

  async register(user:any){
    return new Promise((resolve, reject) => {
      this.apiServ.post('register', user).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          resolve(error);
        }
      });
    });
  }

  buildLoginForm(){
    return new FormGroup({
      'email': new FormControl(null, Validators.required), 
      'password': new FormControl(null, Validators.required), 
    });
  }

  buildRegisterForm(){
    return new FormGroup({
      'name': new FormControl('Ben Boulder', Validators.required), 
      'email': new FormControl(`${uuid()}@example.com`, Validators.required), 
      'password': new FormControl('Bananaman5000!1', Validators.required), 
      'confirm_password': new FormControl('Bananaman5000!1', Validators.required), 
      'uuid': new FormControl(uuid(), Validators.required), 
    });
  }

  buildPasswordResetForm(){
    return new FormGroup({
      'token': new FormControl(null, Validators.required), 
      'email': new FormControl(null, Validators.required), 
      'password': new FormControl(null, Validators.required), 
      'confirm_password': new FormControl(null, Validators.required), 
    }); 
  }

  buildForgotPasswordForm(){
    return new FormGroup({
      'email': new FormControl(null, Validators.required), 
    });
  }
  
}
