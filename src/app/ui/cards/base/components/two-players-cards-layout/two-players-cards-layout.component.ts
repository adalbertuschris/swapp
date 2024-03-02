import { ChangeDetectionStrategy, Component, Input, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { CardsLayoutComponent } from '../cards-layout/cards-layout.component';
import { CardService } from '../../services/card.service';
import { CardPlayer } from '../../models/card-player';
import { CardPlayerComponent } from '../card-player/card-player.component';

@Component({
  selector: 'sw-two-players-cards-layout',
  standalone: true,
  imports: [TranslateModule, CardsLayoutComponent, CardPlayerComponent],
  templateUrl: './two-players-cards-layout.component.html',
  styleUrls: ['./two-players-cards-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwoPlayersCardsLayoutComponent {
  @Input() title: string;

  private readonly cardService = inject(CardService);

  player1: Signal<CardPlayer> = toSignal(this.cardService.player1$);
  player2: Signal<CardPlayer> = toSignal(this.cardService.player2$);
  isLoading: Signal<boolean> = toSignal(this.cardService.isLoading$);

  draw(): void {
    this.cardService.draw();
  }
}
