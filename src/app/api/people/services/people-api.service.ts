import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CollectionParams } from '../../base/models/collection-params';
import { getCollectionParams } from '../../base/utils/params.util';
import { CollectionResult } from '../../base/models/collection-result';
import { ResourceApiService } from '../../base/services/resource-api.service';
import { BaseApiService } from '../../base/services/base-api.service';
import { PeopleDetailResult } from '../models/people-detail-result';

@Injectable({ providedIn: 'root' })
export class PeopleApiService extends BaseApiService implements ResourceApiService {
  private readonly resourceUrl = `${this.baseUrl}/people`;

  getAll(params?: CollectionParams): Observable<CollectionResult> {
    return this.httpClient
      .get(`${this.resourceUrl}`, {
        params: getCollectionParams(params)
      })
      .pipe(map((result) => this.adaptToCollectionResult(result)));
  }

  get(id: number): Observable<PeopleDetailResult> {
    return this.httpClient.get(`${this.resourceUrl}/${id}`).pipe(map((result) => this.adaptToDetailResult(result)));
  }
}
