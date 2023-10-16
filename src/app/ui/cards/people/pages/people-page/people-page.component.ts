import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CardService } from '../../../base/services/card.service';
import { CardsLayoutComponent } from '../../../base/components/cards-layout/cards-layout.component';
import { RESOURCE_CARD } from '../../../base/services/resource-card.service';
import { CardPlayer } from '../../../base/models/card-player';
import { CardPlayerComponent } from '../../../base/components/card-player/card-player.component';
import { PeopleCardService } from '../../services/people-card.service';

@Component({
  selector: 'sw-people-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, CardPlayerComponent, CardsLayoutComponent],
  providers: [{ provide: RESOURCE_CARD, useClass: PeopleCardService }, CardService],
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent {
  private readonly cardService = inject(CardService);
  player1$: Observable<CardPlayer> = this.cardService.player1$;
  player2$: Observable<CardPlayer> = this.cardService.player2$;
  isLoading$: Observable<boolean> = this.cardService.isLoading$;

  draw(): void {
    this.cardService.draw();
  }
}
