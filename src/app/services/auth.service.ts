import { Service, inject, signal, computed } from '@angular/core';
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
  private _user = signal<any>(null);
  private _token = signal<any>(null);
  private _loading = signal<boolean>(true);
  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  async initialize(){
    this._loading.set(true);
    try{
      const token:any = this.tokenServ.getToken();
      const user:any = this.userServ.getUser();
      if(!token){
        this._user.set(null);
        return
      }
      // user
      this._token.set(token);
      this._user.set(user);
    }catch{
      this.clearSession();
    }finally{
      this._loading.set(false);
    }
  }

  clearSession(){
    this.tokenServ.clearToken();
    this._user.set(null);
  }

  async login(credentials:any){
    return new Promise((resolve, reject) => {
      this.apiServ.post('login', credentials).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          resolve(error);
        }, 
      })
    })
  }

  async register(user:any){
    return new Promise((resolve, reject) => {
      this.apiServ.post('register', user).subscribe({
        next: (results:any) => {
          // setUser
          // setToken
          this.tokenServ.setToken(results?.token);
          this.userServ.setUser(results?.user);
          console.log(results);
          resolve(results);
        }, 
        error: (error:any) => {
          resolve(error);
        }, 
      });
    });
  }

  buildLoginForm(){
    return new FormGroup({
      'email': new FormControl('bbkarker@example.com', Validators.required), 
      'password': new FormControl('Bananaman5000!1', Validators.required), 
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
