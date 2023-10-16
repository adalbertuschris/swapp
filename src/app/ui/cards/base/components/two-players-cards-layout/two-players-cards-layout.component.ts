import { Component, Input, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CardsLayoutComponent } from '../cards-layout/cards-layout.component';
import { CardService } from '../../services/card.service';
import { CardPlayer } from '../../models/card-player';
import { CardPlayerComponent } from '../card-player/card-player.component';

@Component({
  selector: 'sw-two-players-cards-layout',
  standalone: true,
  imports: [AsyncPipe, TranslateModule, CardsLayoutComponent, CardPlayerComponent],
  templateUrl: './two-players-cards-layout.component.html',
  styleUrls: ['./two-players-cards-layout.component.scss']
})
export class TwoPlayersCardsLayoutComponent {
  @Input() title: string;

  private readonly cardService = inject(CardService);

  player1$: Observable<CardPlayer> = this.cardService.player1$;
  player2$: Observable<CardPlayer> = this.cardService.player2$;
  isLoading$: Observable<boolean> = this.cardService.isLoading$;

  draw(): void {
    this.cardService.draw();
  }
}
