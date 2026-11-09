import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authServ = inject(AuthService);
  return next(req).pipe(catchError((error) => {
    if(error?.status === 401){
      authServ.clearSession();
      router.navigateByUrl('/login');
    }else if(error?.status == 403){
      router.navigateByUrl('/email-verification');
    }
    return throwError(() => error);
  }));
};
