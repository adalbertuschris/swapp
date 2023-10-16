import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CardPlayerComponent } from '../../../base/components/card-player/card-player.component';
import { CardsLayoutComponent } from '../../../base/components/cards-layout/cards-layout.component';
import { CardService } from '../../../base/services/card.service';
import { StarshipCardService } from '../../services/starship-card.service';
import { RESOURCE_CARD } from '../../../base/services/resource-card.service';
import { CardPlayer } from '../../../base/models/card-player';

@Component({
  selector: 'sw-starship-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, CardPlayerComponent, CardsLayoutComponent],
  providers: [{ provide: RESOURCE_CARD, useClass: StarshipCardService }, CardService],
  templateUrl: './starship-page.component.html',
  styleUrls: ['./starship-page.component.scss']
})
export class StarshipPageComponent {
  private readonly cardService = inject(CardService);
  player1$: Observable<CardPlayer> = this.cardService.player1$;
  player2$: Observable<CardPlayer> = this.cardService.player2$;
  isLoading$: Observable<boolean> = this.cardService.isLoading$;

  draw(): void {
    this.cardService.draw();
  }
}
