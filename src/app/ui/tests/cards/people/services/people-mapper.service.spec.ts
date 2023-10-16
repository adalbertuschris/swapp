import { TestBed } from '@angular/core/testing';
import { PeopleDetailResult } from '@api/people';
import { PeopleMapperService } from '../../../../cards/people/services/people-mapper.service';

describe('PeopleMapperService', () => {
  let peopleMapperService: PeopleMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PeopleMapperService] });

    peopleMapperService = TestBed.inject(PeopleMapperService);
  });

  describe('map', () => {
    it('return null if model is null or undefined', () => {
      expect(peopleMapperService.map(null)).toBe(null);
      expect(peopleMapperService.map(undefined)).toBe(null);
    });

    it('map PeopleDetailResult without any common attribute to Card', () => {
      const model = {
        name: 'Shmi Skywalker'
      } as PeopleDetailResult;

      const expectedModel = {
        title: 'Shmi Skywalker',
        properties: {
          eyeColor: { translationKey: 'CARDS.PEOPLE.EYE_COLOR', value: undefined, rawValue: undefined },
          gender: { translationKey: 'CARDS.PEOPLE.GENDER', value: undefined, rawValue: undefined },
          mass: { translationKey: 'CARDS.PEOPLE.MASS', value: undefined, rawValue: undefined }
        }
      };

      expect(peopleMapperService.map(model)).toEqual(expectedModel);
    });

    it('map PeopleDetailResult with all common attributes to Card', () => {
      const model = {
        mass: '40',
        eyeColor: 'brown',
        gender: 'male',
        name: 'Shmi Skywalker'
      } as PeopleDetailResult;

      const expectedModel = {
        title: 'Shmi Skywalker',
        properties: {
          eyeColor: { translationKey: 'CARDS.PEOPLE.EYE_COLOR', value: 'brown', rawValue: 'brown' },
          gender: { translationKey: 'CARDS.PEOPLE.GENDER', value: 'male', rawValue: 'male' },
          mass: { translationKey: 'CARDS.PEOPLE.MASS', value: '40', rawValue: '40' }
        }
      };

      expect(peopleMapperService.map(model)).toEqual(expectedModel);
    });
  });
});
