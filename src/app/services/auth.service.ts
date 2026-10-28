import { Service, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { v4 as uuid } from 'uuid';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Service()
export class AuthService {
  private apiServ = inject(ApiService);
  private tokenServ = inject(TokenService);
  private userServ = inject(UserService);

  async register(user:any){
    return new Promise((resolve, reject) => {
      this.apiServ.post('register', user).subscribe({
        next: (results:any) => {
          // setUser
          // setToken
          this.tokenServ.setToken(results?.token);
          this.userServ.setUser(results?.user);
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
