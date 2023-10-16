import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

export const RESOURCE_CARD = new InjectionToken<ResourceCardService>('ResourceCard');

export interface ResourceCardService {
  getCard(): Observable<Card>;
  compare(card1: Card, card2: Card): number;
}
