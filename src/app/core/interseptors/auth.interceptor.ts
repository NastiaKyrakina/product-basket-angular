import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserState } from '../../state/user/user.state';
import { Store } from '@ngxs/store';
import { ResetUserAction } from '../../state/user/user.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private store: Store
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!UserState.accessToken) {
      return next.handle(request);
    }
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${UserState.accessToken}`)
    });
    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log('Server response');
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              console.log('Unauthorized');
              this.store.dispatch(new ResetUserAction());
            }
          }
        }
      )
    )
  }
}
