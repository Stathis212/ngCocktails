import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { APIUrl } from '@shared/helpers'
import { CocktailListResponse } from '@shared/models'

@Injectable()
export class CocktailDetailsService {

  constructor(
    private http: HttpClient
  ) { }

  public getCocktailDetailsById(id: string): Observable<CocktailListResponse> {
    return this.http.get<CocktailListResponse>(`${APIUrl}/lookup.php?i=${id}`);
  }

}
