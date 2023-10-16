import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CardService } from '../../../base/services/card.service';
import { RESOURCE_CARD } from '../../../base/services/resource-card.service';
import { TwoPlayersCardsLayoutComponent } from '../../../base/components/two-players-cards-layout/two-players-cards-layout.component';
import { PeopleCardService } from '../../services/people-card.service';

@Component({
  selector: 'sw-people-page',
  standalone: true,
  imports: [TranslateModule, TwoPlayersCardsLayoutComponent],
  providers: [{ provide: RESOURCE_CARD, useClass: PeopleCardService }, CardService],
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent {}
