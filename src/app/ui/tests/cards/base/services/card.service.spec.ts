import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { ResourceApiService } from '@api';
import { CardMapperService } from '../../../../cards/base/services/card-mapper.service';
import { RESOURCE_CARD, ResourceCardService } from '../../../../cards/base/services/resource-card.service';
import { CardService } from '../../../../cards/base/services/card.service';
import { FakeResourceCardService, cards } from './data';

describe('CardService', () => {
  let apiService: jasmine.SpyObj<ResourceApiService>;
  let mapperService: jasmine.SpyObj<CardMapperService>;
  let cardService: CardService;
  let resourceCardService: ResourceCardService;

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ResourceApiService>('ResourceApiService', ['get', 'getAll']);
    mapperService = jasmine.createSpyObj<CardMapperService>('CardMapperService', ['map']);

    TestBed.configureTestingModule({
      providers: [
        { provide: RESOURCE_CARD, useValue: new FakeResourceCardService(apiService, mapperService) },
        CardService
      ]
    });

    cardService = TestBed.inject(CardService);
    resourceCardService = TestBed.inject(RESOURCE_CARD);
  });

  it('set initial state', () => {
    expect(cardService.state$).toBeObservable(
      cold('a--', {
        a: {
          player1: { score: 0, isLoading: false, win: false },
          player2: { score: 0, isLoading: false, win: false }
        }
      })
    );
  });

  it('set state when draw success', () => {
    apiService.getAll.and.returnValue(cold('--(a|)', { a: { items: [{ uid: '1' }] } }));
    apiService.get.and.returnValue(cold('--(a|)', { a: {} }));
    mapperService.map.and.returnValues(cards[0], cards[1]);
    spyOn(resourceCardService, 'compare').and.returnValue(-1);

    cardService.draw();

    expect(cardService.state$).toBeObservable(
      cold('a-----b--', {
        a: {
          player1: { score: 0, isLoading: true, win: false, card: null },
          player2: { score: 0, isLoading: true, win: false, card: null }
        },
        b: {
          player1: { score: 0, isLoading: false, win: false, card: cards[0] },
          player2: { score: 1, isLoading: false, win: true, card: cards[1] }
        }
      })
    );
  });

  it('set state when draw failure', () => {
    apiService.getAll.and.returnValue(cold('--#'));

    cardService.draw();

    expect(cardService.state$).toBeObservable(
      cold('a-b--', {
        a: {
          player1: { score: 0, isLoading: true, win: false, card: null },
          player2: { score: 0, isLoading: true, win: false, card: null }
        },
        b: {
          player1: { score: 0, isLoading: false, win: false, card: null },
          player2: { score: 0, isLoading: false, win: false, card: null }
        }
      })
    );
  });
});
