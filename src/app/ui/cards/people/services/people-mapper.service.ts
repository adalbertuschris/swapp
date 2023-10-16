import { Injectable } from '@angular/core';
import { PeopleDetailResult } from '@api/people';
import { camelToSnake } from '@common';
import { Card, CardProperty } from '../../base/models/card';
import { CardMapperService } from '../../base/services/card-mapper.service';
import { PeopleProps } from '../models/people-props';

const cardPropertyKeys: PeopleProps[] = ['eyeColor', 'mass', 'gender'];

@Injectable({ providedIn: 'root' })
export class PeopleMapperService implements CardMapperService {
  map(model: PeopleDetailResult): Card {
    if (!model) {
      return null;
    }

    return {
      title: model.name,
      properties: cardPropertyKeys.reduce(
        (prev, key: PeopleProps) => ({
          ...prev,
          [key]: this.mapToCardProperty(key, model[key])
        }),
        {}
      )
    };
  }

  private mapToCardProperty(key: PeopleProps, value: unknown): CardProperty {
    return {
      translationKey: this.getTranslationKey(key),
      value: this.getValue(value),
      rawValue: value
    };
  }

  private getTranslationKey(key: PeopleProps): string {
    const translationKey = camelToSnake(key).toUpperCase();

    return `CARDS.PEOPLE.${translationKey}`;
  }

  private getValue<T>(value: T): string {
    return value?.toString();
  }
}
