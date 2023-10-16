import { TestBed } from '@angular/core/testing';
import { PeopleApiService } from '@api/people';
import { PeopleCardService } from '../../../../cards/people/services/people-card.service';

describe('PeopleCardService', () => {
  let peopleCardService: PeopleCardService;

  beforeEach(() => {
    const fakeApiService = jasmine.createSpyObj<PeopleApiService>('PeopleApiService', ['get', 'getAll']);

    TestBed.configureTestingModule({
      providers: [PeopleCardService, { provide: PeopleApiService, useValue: fakeApiService }]
    });

    peopleCardService = TestBed.inject(PeopleCardService);
  });

  describe('compare', () => {
    it('return 0 when card1.mass is unknown and card2.mass is equal 0', () => {
      const card1 = { title: '', properties: { mass: { translationKey: '', value: '', rawValue: 'unknown' } } };
      const card2 = { title: '', properties: { mass: { translationKey: '', value: '', rawValue: '0' } } };
      const result = peopleCardService.compare(card1, card2);

      expect(result).toBe(0);
    });

    it('return -1 when card1.mass is lower than card2.mass', () => {
      const card1 = { title: '', properties: { mass: { translationKey: '', value: '', rawValue: '20' } } };
      const card2 = { title: '', properties: { mass: { translationKey: '', value: '', rawValue: '40' } } };
      const result = peopleCardService.compare(card1, card2);

      expect(result).toBe(-1);
    });

    it('return 0 when card1.mass is equal to card2.mass', () => {
      const card1 = { title: '', properties: { mass: { translationKey: '', value: '', rawValue: '40' } } };
      const card2 = { title: '', properties: { mass: { translationKey: '', value: '', rawValue: '40' } } };
      const result = peopleCardService.compare(card1, card2);

      expect(result).toBe(0);
    });

    it('return 1 when card1.mass is greater than card2.mass', () => {
      const card1 = { title: '', properties: { mass: { translationKey: '', value: '', rawValue: '60' } } };
      const card2 = { title: '', properties: { mass: { translationKey: '', value: '', rawValue: '40' } } };
      const result = peopleCardService.compare(card1, card2);

      expect(result).toBe(1);
    });
  });
});
