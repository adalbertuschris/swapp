import { Injectable } from '@angular/core';
import { StarshipDetailResult } from '@api/starships';
import { camelToSnake } from '@common';
import { Card, CardProperty } from '../../base/models/card';
import { CardMapperService } from '../../base/services/card-mapper.service';
import { StarshipProps } from '../models/starship-props';

const cardPropertyKeys: StarshipProps[] = ['length', 'starshipClass', 'crew'];

@Injectable({ providedIn: 'root' })
export class StarshipMapperService implements CardMapperService {
  map(model: StarshipDetailResult): Card {
    if (!model) {
      return null;
    }

    return {
      title: model.name,
      subtitle: model.model,
      properties: cardPropertyKeys.reduce(
        (prev, key: StarshipProps) => ({
          ...prev,
          [key]: this.mapToCardProperty(key, model[key])
        }),
        {}
      )
    };
  }

  private mapToCardProperty(key: StarshipProps, value: unknown): CardProperty {
    return {
      translationKey: this.getTranslationKey(key),
      value: this.getValue(value),
      rawValue: value
    };
  }

  private getTranslationKey(key: StarshipProps): string {
    const translationKey = camelToSnake(key).toUpperCase();

    return `CARDS.STARSHIPS.${translationKey}`;
  }

  private getValue<T>(value: T): string {
    return value?.toString();
  }
}
