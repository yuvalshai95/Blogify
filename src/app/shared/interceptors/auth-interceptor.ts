import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { PersistanceService } from '../services/persistance.service';
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const persistanceService = inject(PersistanceService);
  const token = persistanceService.getFromLocalStorage('accessToken');
  req = req.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  });

  return next(req);
}