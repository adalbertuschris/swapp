import { TestBed } from '@angular/core/testing';
import { StarshipDetailResult } from '@api/starships';
import { StarshipMapperService } from '../../../../cards/starships/services/starship-mapper.service';

describe('StarshipMapperService', () => {
  let starshipMapperService: StarshipMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [StarshipMapperService] });

    starshipMapperService = TestBed.inject(StarshipMapperService);
  });

  describe('map', () => {
    it('return null if model is null or undefined', () => {
      expect(starshipMapperService.map(null)).toBe(null);
      expect(starshipMapperService.map(undefined)).toBe(null);
    });

    it('map StarshipDetailResult without any common attribute to Card', () => {
      const model = {
        name: 'Death Star'
      } as StarshipDetailResult;

      const expectedModel = {
        title: 'Death Star',
        subtitle: undefined,
        properties: {
          crew: { translationKey: 'CARDS.STARSHIPS.CREW', value: undefined, rawValue: undefined },
          starshipClass: { translationKey: 'CARDS.STARSHIPS.STARSHIP_CLASS', value: undefined, rawValue: undefined },
          length: { translationKey: 'CARDS.STARSHIPS.LENGTH', value: undefined, rawValue: undefined }
        }
      };

      expect(starshipMapperService.map(model)).toEqual(expectedModel);
    });

    it('map StarshipDetailResult with all common attributes to Card', () => {
      const model = {
        model: 'DS-1 Orbital Battle Station',
        starshipClass: 'Deep Space Mobile Battlestation',
        crew: '342,953',
        length: '120000',
        name: 'Death Star'
      } as StarshipDetailResult;

      const expectedModel = {
        title: 'Death Star',
        subtitle: 'DS-1 Orbital Battle Station',
        properties: {
          crew: { translationKey: 'CARDS.STARSHIPS.CREW', value: '342,953', rawValue: '342,953' },
          starshipClass: {
            translationKey: 'CARDS.STARSHIPS.STARSHIP_CLASS',
            value: 'Deep Space Mobile Battlestation',
            rawValue: 'Deep Space Mobile Battlestation'
          },
          length: { translationKey: 'CARDS.STARSHIPS.LENGTH', value: '120000', rawValue: '120000' }
        }
      };

      expect(starshipMapperService.map(model)).toEqual(expectedModel);
    });
  });
});
