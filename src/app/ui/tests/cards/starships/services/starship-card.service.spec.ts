import { TestBed } from '@angular/core/testing';
import { StarshipApiService } from '@api/starships';
import { StarshipCardService } from '../../../../cards/starships/services/starship-card.service';

describe('StarshipCardService', () => {
  let starshipCardService: StarshipCardService;

  beforeEach(() => {
    const fakeApiService = jasmine.createSpyObj<StarshipApiService>('StarshipApiService', ['get', 'getAll']);

    TestBed.configureTestingModule({
      providers: [StarshipCardService, { provide: StarshipApiService, useValue: fakeApiService }]
    });

    starshipCardService = TestBed.inject(StarshipCardService);
  });

  describe('compare', () => {
    it('return 0 when card1.crew is unknown and card2.crew is equal 0', () => {
      const card1 = { title: '', properties: { crew: { translationKey: '', value: '', rawValue: 'unknown' } } };
      const card2 = { title: '', properties: { crew: { translationKey: '', value: '', rawValue: '0' } } };
      const result = starshipCardService.compare(card1, card2);

      expect(result).toBe(0);
    });

    it('return -1 when card1.crew is lower than card2.crew', () => {
      const card1 = { title: '', properties: { crew: { translationKey: '', value: '', rawValue: '20' } } };
      const card2 = { title: '', properties: { crew: { translationKey: '', value: '', rawValue: '40' } } };
      const result = starshipCardService.compare(card1, card2);

      expect(result).toBe(-1);
    });

    it('return 0 when card1.crew is equal to card2.crew', () => {
      const card1 = { title: '', properties: { crew: { translationKey: '', value: '', rawValue: '40' } } };
      const card2 = { title: '', properties: { crew: { translationKey: '', value: '', rawValue: '40' } } };
      const result = starshipCardService.compare(card1, card2);

      expect(result).toBe(0);
    });

    it('return 1 when card1.crew is greater than card2.crew', () => {
      const card1 = { title: '', properties: { crew: { translationKey: '', value: '', rawValue: '60' } } };
      const card2 = { title: '', properties: { crew: { translationKey: '', value: '', rawValue: '40' } } };
      const result = starshipCardService.compare(card1, card2);

      expect(result).toBe(1);
    });
  });
});
