import { HttpParams } from '@angular/common/http';

export const getCollectionParams = <
  T extends { [param: string]: string | number | boolean | readonly (string | number | boolean)[] }
>(
  params: T
): HttpParams => {
  if (!params) {
    return null;
  }

  return new HttpParams({ fromObject: params });
};
