import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { mapResponseToCamelCase } from '../utils/response.util';
import { CollectionApiResult } from '../models/collection-api-result';
import { CollectionResult } from '../models/collection-result';
import { DetailApiResult } from '../models/detail-api-result';
import { environment } from '@env';

@Injectable()
export class BaseApiService {
  protected readonly baseUrl = environment.apiUrl;
  protected readonly httpClient: HttpClient = inject(HttpClient);

  protected adaptToDetailResult<T extends object, R>(model: T): R | null {
    if (!model) {
      return null;
    }

    const mappedResponse = mapResponseToCamelCase<T, DetailApiResult<Omit<R, 'id'>>>(model);

    return (
      mappedResponse.result &&
      ({
        id: mappedResponse.result.uid,
        ...mappedResponse.result.properties
      } as R)
    );
  }

  protected adaptToCollectionResult<T extends object, R extends CollectionResult>(model: T): R | null {
    if (!model) {
      return null;
    }

    const mappedResponse = mapResponseToCamelCase<T, CollectionApiResult>(model);

    return {
      totalItems: mappedResponse.totalRecords,
      totalPages: mappedResponse.totalPages,
      items: mappedResponse.results
    } as R;
  }
}
