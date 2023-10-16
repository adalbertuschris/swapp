import { Injectable } from '@angular/core';
import { StarshipApiService } from '@api/starships';
import { convertStringNumberToNumber } from '@common';
import { Card } from '../../base/models/card';
import { ResourceCardBaseService } from '../../base/services/resource-card-base.service';
import { ResourceCardService } from '../../base/services/resource-card.service';
import { StarshipMapperService } from './starship-mapper.service';
import { StarshipProps } from '../models/starship-props';

const scorePropertyKeys: StarshipProps[] = ['crew'];

@Injectable()
export class StarshipCardService extends ResourceCardBaseService implements ResourceCardService {
  constructor(apiService: StarshipApiService, mapperService: StarshipMapperService) {
    super(apiService, mapperService);
  }

  compare(card1: Card, card2: Card): number {
    const card1Points = this.getPoints(card1);
    const card2Points = this.getPoints(card2);

    if (card1Points === card2Points) {
      return 0;
    }

    return card1Points > card2Points ? 1 : -1;
  }

  private getPoints(card: Card): number {
    return scorePropertyKeys.reduce((result, key) => {
      if (key === 'crew') {
        return result + convertStringNumberToNumber(card.properties[key].rawValue as string);
      } else {
        return result;
      }
    }, 0);
  }
}
