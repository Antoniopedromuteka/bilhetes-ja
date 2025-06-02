import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../services/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(TokenService);
  const token = auth.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
