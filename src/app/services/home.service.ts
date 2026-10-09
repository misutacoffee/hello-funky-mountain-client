import { Service, inject } from '@angular/core';
import { ApiService } from './api.service';

@Service()
export class HomeService {
  private apiServ = inject(ApiService);

  async getHomeData() {
    this.apiServ.get('home').subscribe((data:any) => {
      console.log('home data', data);
      return data
    });
  }
}
