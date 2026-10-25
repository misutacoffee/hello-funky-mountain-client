import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Service()
export class AuthService {
  buildLoginForm(){
    return new FormGroup({
      'email': new FormControl(null, Validators.required), 
      'password': new FormControl(null, Validators.required), 
    });
  }

  buildRegisterForm(){
    return new FormGroup({
      'name': new FormControl(null, Validators.required), 
      'email': new FormControl(null, Validators.required), 
      'password': new FormControl(null, Validators.required), 
      'confirm_password': new FormControl(null, Validators.required), 
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
