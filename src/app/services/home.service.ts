import { Service, inject } from '@angular/core';
import { ApiService } from './api.service';

@Service()
export class HomeService {
  private apiServ = inject(ApiService);

  async getHomeData() {
    return new Promise((resolve, reject) => {
      this.apiServ.get('home').subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }
  
}
