import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../base/services/base-api.service';

@Injectable()
class FakeApiService extends BaseApiService {
  get(model: object): unknown {
    return this.adaptToDetailResult(model);
  }

  getAll(model: object): unknown {
    return this.adaptToCollectionResult(model);
  }
}

/*eslint-disable @typescript-eslint/naming-convention*/
describe('BaseApiService', () => {
  let apiService: FakeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: HttpClient, useValue: {} }, FakeApiService] });

    apiService = TestBed.inject(FakeApiService);
  });

  describe('adaptToDetailResult', () => {
    it('return null if model is null or undefined', () => {
      expect(apiService.get(null)).toBe(null);
      expect(apiService.get(undefined)).toBe(null);
    });

    it('return undefined if model has no result', () => {
      const model = {
        message: 'test'
      };

      expect(apiService.get(model)).toBe(undefined);
    });

    it('return model only with id if model has no properties', () => {
      const model = {
        message: 'test',
        result: {
          uid: '1'
        }
      };

      const expectedResult = {
        id: '1'
      };

      expect(apiService.get(model)).toEqual(expectedResult);
    });

    it('return adapted model with id and convertedProperties (from snake_case to camel_case)', () => {
      const model = {
        message: 'test',
        result: {
          properties: {
            eye_color: 'brown',
            gender: 'male'
          },
          description: 'description',
          _id: '1',
          uid: '2',
          __v: '3'
        }
      };

      const expectedResult = {
        id: '2',
        eyeColor: 'brown',
        gender: 'male'
      };

      expect(apiService.get(model)).toEqual(expectedResult);
    });
  });

  describe('adaptToCollectionResult', () => {
    it('return null if model is null or undefined', () => {
      expect(apiService.getAll(null)).toBe(null);
      expect(apiService.getAll(undefined)).toBe(null);
    });

    it('return adapted model if model has no results', () => {
      const model = {
        message: 'test'
      };

      const expectedResult = {
        totalItems: 0,
        totalPages: 0,
        items: []
      };

      expect(apiService.getAll(model)).toEqual(expectedResult);
    });

    it('return adapted model', () => {
      const model = {
        message: 'test',
        total_records: 2,
        total_pages: 1,
        previous: '',
        next: '',
        results: [
          { uid: '1', name: 'item 1', url: '' },
          { uid: '2', name: 'item 2', url: '' }
        ]
      };

      const expectedResult = {
        totalItems: 2,
        totalPages: 1,
        items: [
          { uid: '1', name: 'item 1', url: '' },
          { uid: '2', name: 'item 2', url: '' }
        ]
      };

      expect(apiService.getAll(model)).toEqual(expectedResult);
    });
  });
});
