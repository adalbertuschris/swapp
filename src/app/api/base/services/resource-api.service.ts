import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionParams } from '../models/collection-params';
import { CollectionResult } from '../models/collection-result';

export const RESOURCE_API = new InjectionToken<ResourceApiService>('ResourceApi');

export type ResourceApiService = {
  getAll(params?: CollectionParams): Observable<CollectionResult>;
  get<R>(id: number): Observable<R>;
  get(id: number): Observable<unknown>;
};
