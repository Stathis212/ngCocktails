import { Injectable } from '@angular/core'

import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http'

import { Observable } from 'rxjs'

import { LoaderService } from '../services/loader.service'

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor( private loaderService: LoaderService ) { }

  public removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    setTimeout(() => {
      this.loaderService.isLoaderVisible$.next(this.requests.length > 0);
    }, 300);
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.isLoaderVisible$.next(true);

    return new Observable(observer => {
      const subscription = next.handle(req)
        .subscribe(
          (event: any) => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          (err: any) => {
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });

      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
