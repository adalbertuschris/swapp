import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { ResourceApiService } from '@api';
import { ResourceCardBaseService } from '../../../../cards/base/services/resource-card-base.service';
import { CardMapperService } from '../../../../cards/base/services/card-mapper.service';
import { FakeResourceCardService, cards, resourceItem, resourceItems } from './data';

describe('ResourceCardBaseService', () => {
  let apiService: jasmine.SpyObj<ResourceApiService>;
  let mapperService: jasmine.SpyObj<CardMapperService>;
  let resourceCardService: ResourceCardBaseService;

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ResourceApiService>('ResourceApiService', ['get', 'getAll']);
    mapperService = jasmine.createSpyObj<CardMapperService>('CardMapperService', ['map']);

    TestBed.configureTestingModule({
      providers: [
        { provide: FakeResourceCardService, useValue: new FakeResourceCardService(apiService, mapperService) }
      ]
    });

    resourceCardService = TestBed.inject(FakeResourceCardService);
  });

  it('return observable with card', () => {
    apiService.getAll.and.returnValue(cold('--(a|)', { a: resourceItems }));
    apiService.get.and.returnValue(cold('--(a|)', { a: resourceItem }));
    mapperService.map.and.returnValue(cards[0]);

    expect(resourceCardService.getCard()).toBeObservable(cold('------(a|)', { a: cards[0] }));
    expect(resourceCardService.getCard()).toBeObservable(cold('----------(a|)', { a: cards[0] }));
    expect(apiService.getAll.calls.count()).toBe(3);
    expect(apiService.get.calls.count()).toBe(2);
  });

  it('throw error if has no items', () => {
    apiService.getAll.and.returnValue(cold('--(a|)', { a: { totalPages: 0, totalItems: 0, items: [] } }));
    apiService.get.and.returnValue(cold('--(a|)', { a: resourceItem }));
    mapperService.map.and.returnValue(cards[0]);

    const result = resourceCardService.getCard();

    expect(result).toBeObservable(cold('----#', null, new Error('no items')));
  });
});
