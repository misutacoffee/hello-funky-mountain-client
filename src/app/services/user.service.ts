import { Service, inject } from '@angular/core';
import { StorageService } from './storage.service';

@Service()
export class UserService {
  private storageServ = inject(StorageService);
  private readonly storageKey = 'user';

  async getUser(){
    return localStorage.getItem(this.storageKey);
  }

  async setUser(user:any){
    localStorage.setItem(this.storageKey, user);
  }

  async clearUser(){
    // 
  }
}
