import { Service, inject } from '@angular/core';
import { ApiService } from './api.service';

@Service()
export class HomeService {
  private apiServ = inject(ApiService);

  async getHomeData() {
    const results = await this.apiServ.get('home');
    return results;
  }
}
