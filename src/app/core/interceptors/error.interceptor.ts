import { Injectable } from '@angular/core'

import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http'

import { Observable, throwError, timer } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'

export const maxRetries = 3;
export const delayMs = 1000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  shouldRetry(error: HttpErrorResponse){
    if(error.status >= 500){
      return timer(delayMs);
    }
    throw error;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({count: maxRetries, delay: this.shouldRetry}),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
        } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
