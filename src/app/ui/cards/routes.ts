import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'people',
    loadComponent: () => import('./people/pages/people-page/people-page.component').then((m) => m.PeoplePageComponent)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
