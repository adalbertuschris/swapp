import { Observable } from 'rxjs';
import { CollectionParams } from '../models/collection-params';
import { CollectionResult } from '../models/collection-result';

export type ResourceApiService = {
  getAll(params?: CollectionParams): Observable<CollectionResult>;
  get<R>(id: number): Observable<R>;
  get(id: number): Observable<unknown>;
};
