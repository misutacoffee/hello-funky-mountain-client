import { Service, inject } from '@angular/core';
import { StorageService } from './storage.service';

@Service()
export class UserService {
  private readonly storageKey = 'user';

  getUser(){
    const value:any = localStorage.getItem(this.storageKey);
    const user:any = JSON.parse(value);
    return user
  }

  setUser(user:any){
    const value:string = JSON.stringify(user);
    localStorage.setItem(this.storageKey, value);
  }

  clearUser(){
    localStorage.removeItem(this.storageKey);
  }

}
