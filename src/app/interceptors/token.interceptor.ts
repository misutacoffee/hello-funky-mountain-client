import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }
  const token = auth.token();
  if (!token) {
    return next(req);
  }
  const authenticatedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  });
  return next(authenticatedRequest);
};
