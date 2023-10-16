import { Card } from '../models/card';

export interface CardMapperService {
  map<T>(model: T): Card;
  map(model: unknown): Card;
}
