import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CardService } from '../../../base/services/card.service';
import { StarshipCardService } from '../../services/starship-card.service';
import { RESOURCE_CARD } from '../../../base/services/resource-card.service';
import { TwoPlayersCardsLayoutComponent } from '../../../base/components/two-players-cards-layout/two-players-cards-layout.component';

@Component({
  selector: 'sw-starship-page',
  standalone: true,
  imports: [TranslateModule, TwoPlayersCardsLayoutComponent],
  providers: [{ provide: RESOURCE_CARD, useClass: StarshipCardService }, CardService],
  templateUrl: './starship-page.component.html',
  styleUrls: ['./starship-page.component.scss']
})
export class StarshipPageComponent {}
