import { Service } from '@angular/core';

@Service()
export class TokenService {
  private readonly storageKey = 'auth_token';

  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.storageKey, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.storageKey);
  }

  hasToken(): boolean {
    return this.getToken() !== null;
  }
  
}
