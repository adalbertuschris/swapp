import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes as cardRoutes } from './ui/cards/routes';
import { HomePageComponent } from './ui/main/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'cards',
    children: cardRoutes
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
