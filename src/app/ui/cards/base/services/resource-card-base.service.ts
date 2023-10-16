import { Injectable } from '@angular/core';
import { Observable, map, shareReplay, switchMap, throwError } from 'rxjs';
import { ResourceApiService } from '@api';
import { getRandom } from '@common';
import { CardMapperService } from './card-mapper.service';
import { Card } from '../models/card';

@Injectable()
export abstract class ResourceCardBaseService {
  private _totalPages$: Observable<number>;

  constructor(
    protected readonly apiService: ResourceApiService,
    protected readonly mapperService: CardMapperService
  ) {}

  // Records in db are not incremental, so:
  // first we have to fetch info about total pages (page: 1, limit: 1),
  // next we have to fetch random page with limit 1
  // from fetched list we have to take first item and we have to fetch details
  getCard(): Observable<Card> {
    return this.getRandomDetails().pipe(map((details) => this.mapperService.map(details)));
  }

  private getRandomDetails(): Observable<unknown> {
    return this.getTotalPages().pipe(
      switchMap((totalPages) =>
        this.apiService.getAll({
          page: this.getRandomPage(totalPages),
          limit: 1
        })
      ),
      switchMap((result) => {
        const itemId = result?.items?.[0]?.uid;
        if (itemId && !isNaN(+itemId)) {
          return this.apiService.get(+itemId);
        } else {
          return throwError(() => new Error('no items'));
        }
      })
    );
  }

  private getTotalPages(): Observable<number> {
    if (this._totalPages$ == null) {
      this._totalPages$ = this.apiService.getAll({ page: 1, limit: 1 }).pipe(
        map((result) => result.totalPages),
        shareReplay(1)
      );
    }

    return this._totalPages$;
  }

  private getRandomPage(range: number): number {
    return getRandom(1, range);
  }
}
