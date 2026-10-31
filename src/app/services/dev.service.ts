import { Service, inject } from '@angular/core';
import { ApiService } from './api.service';

@Service()
export class DevService {
  private apiServ = inject(ApiService);

  async authenticatedTestRequest(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('authenticated-test-request').subscribe({
        next: (results:any) => {
          resolve(results);
        }, 
        error: (error:any) => {
          reject(error);
        }
      })
    });
  }
  
  async unauthenticatedTestRequest(){
    return new Promise((resolve, reject) => {
      this.apiServ.get('unauthenticated-test-request').subscribe({
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
