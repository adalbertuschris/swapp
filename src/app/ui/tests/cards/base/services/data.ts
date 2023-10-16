import { ResourceApiService } from '@api';
import { ResourceCardBaseService } from '../../../../cards/base/services/resource-card-base.service';
import { ResourceCardService } from '../../../../cards/base/services/resource-card.service';
import { CardMapperService } from '../../../../cards/base/services/card-mapper.service';

export class FakeResourceCardService extends ResourceCardBaseService implements ResourceCardService {
  constructor(apiService: ResourceApiService, mapperService: CardMapperService) {
    super(apiService, mapperService);
  }

  compare(): number {
    return 0;
  }
}

export const resourceItems = {
  items: [{ uid: '1', name: 'Luke Skywalker', url: '' }],
  totalPages: 82,
  totalItems: 82
};

export const resourceItem = {
  name: 'Luke Skywalker',
  gender: 'male',
  eyeColor: 'brown',
  mass: '40'
};

export const cards = [
  {
    title: 'Luke Skywalker',
    properties: {
      eyeColor: { translationKey: 'CARDS.PEOPLE.EYE_COLOR', value: 'brown', rawValue: 'brown' },
      gender: { translationKey: 'CARDS.PEOPLE.GENDER', value: 'male', rawValue: 'male' },
      mass: { translationKey: 'CARDS.PEOPLE.MASS', value: '40', rawValue: '40' }
    }
  },
  {
    title: 'Luke Skywalker 2',
    properties: {
      eyeColor: { translationKey: 'CARDS.PEOPLE.EYE_COLOR', value: 'brown', rawValue: 'brown' },
      gender: { translationKey: 'CARDS.PEOPLE.GENDER', value: 'male', rawValue: 'male' },
      mass: { translationKey: 'CARDS.PEOPLE.MASS', value: '40', rawValue: '60' }
    }
  }
];
