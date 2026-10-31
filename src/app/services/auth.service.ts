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
        this._token.set(null);
        this._user.set(null);
        return
      }
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
    this.userServ.clearUser();
    this._token.set(null);
    this._user.set(null);
  }

  async login(credentials:any){
    return new Promise((resolve) => {
      this.apiServ.post('login', credentials).subscribe({
        next: (results:any) => {
          if(results?.success){
            const token:string = results?.token;
            const user:any = results?.user;
            this.tokenServ.setToken(token);
            this.userServ.setUser(user);
            this._token.set(token);
            this._user.set(user);
          }
          resolve(results);
        }, 
        error: (error:any) => {
          resolve(error);
        }, 
      });
    });
  }

  async logout(){
    this.clearSession();
    return new Promise((resolve) => {
      this.apiServ.post('logout', null).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          resolve(error);
        }, 
      });
    });
  }

  async register(user:any){
    return new Promise((resolve) => {
      this.apiServ.post('register', user).subscribe({
        next: (results:any) => {
          const token:string = results?.token;
          const user:any = results?.user;
          this.tokenServ.setToken(token);
          this.userServ.setUser(user);
          this._token.set(token);
          this._user.set(user);
          resolve(results);
        }, 
        error: (error:any) => {
          resolve(error);
        }, 
      });
    });
  }

  async forgotPassword(form:any){
    return new Promise((resolve, reject) => {
      this.apiServ.post('forgot-password', form).subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }, 
      });
    });
  }

  async resetPassword(form:any){
    return new Promise((resolve, reject) => {
      this.apiServ.post('reset-password', form).subscribe({
        next: (results:any) => {
          if(results?.success){
            const token:string = results?.token;
            const user:any = results?.user;
            this.tokenServ.setToken(token);
            this.userServ.setUser(user);
            this._token.set(token);
            this._user.set(user);
          }
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }, 
      });
    });
  }

  buildLoginForm(){
    return new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]), 
      'password': new FormControl(null, Validators.required), 
    });
  }

  buildRegisterForm(){
    return new FormGroup({
      'name': new FormControl(null, Validators.required), 
      'email': new FormControl(null, [Validators.required, Validators.email]), 
      'password': new FormControl(null, Validators.required), 
      'confirm_password': new FormControl(null, Validators.required), 
      'uuid': new FormControl(uuid(), Validators.required), 
    });
  }

  buildPasswordResetForm(){
    return new FormGroup({
      'token': new FormControl(null, Validators.required), 
      'email': new FormControl(null, [Validators.required, Validators.email]), 
      'password': new FormControl(null, Validators.required), 
      'confirm_password': new FormControl(null, Validators.required), 
    }); 
  }

  buildForgotPasswordForm(){
    return new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]), 
    });
  }
  
}
