import { Injectable } from '@angular/core'
import { TestBed } from '@angular/core/testing'

import { HTTP_INTERCEPTORS, HttpClient, HttpInterceptor } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { LoaderService } from '../services/loader.service'
import { LoaderInterceptor } from './loader.interceptor'

@Injectable()
class DataService {
  ROOT_URL = `http://jsonplaceholder.typicode.com`;

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<any[]>(`${this.ROOT_URL}/posts`);
  }
}

function getInterceptorInstance<T extends HttpInterceptor>(interceptors: HttpInterceptor[], type: any): HttpInterceptor | null {
  let searchedInterceptor: HttpInterceptor | null = null;
  interceptors.forEach((interceptor: HttpInterceptor) => {
      if (interceptor instanceof type) {
          searchedInterceptor = interceptor;
      }
  });
  return searchedInterceptor;
}

describe(`LoaderInterceptor`, () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  let interceptorInstance: HttpInterceptor | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
        LoaderService
      ],
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
    interceptorInstance = getInterceptorInstance<LoaderInterceptor>(
      TestBed.inject(HTTP_INTERCEPTORS),
      LoaderInterceptor
    );
  });

  it('should test if interceptor instance defined', () => {
    expect(interceptorInstance).toBeDefined();
  });

  it('should have loader header & request array not empty', () => {
    service.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
    });

    if (interceptorInstance) {
      expect(interceptorInstance['requests' as keyof typeof interceptorInstance].length > 0).toEqual(true);
    }

  });

});
