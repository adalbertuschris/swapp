import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, forkJoin, map, takeUntil } from 'rxjs';
import { CardPlayer } from '../models/card-player';
import { RESOURCE_CARD, ResourceCardService } from './resource-card.service';
import { Card } from '../models/card';

interface CardState {
  player1: CardPlayer;
  player2: CardPlayer;
}

const initialState: CardState = {
  player1: { score: 0, isLoading: false, win: false },
  player2: { score: 0, isLoading: false, win: false }
};

@Injectable()
export class CardService implements OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _store: BehaviorSubject<CardState> = new BehaviorSubject(initialState);
  readonly state$ = this._store.asObservable();
  readonly player1$ = this.state$.pipe(map((state) => state.player1));
  readonly player2$ = this.state$.pipe(map((state) => state.player2));
  readonly isLoading$ = this.state$.pipe(map((state) => state.player1.isLoading || state.player2.isLoading));

  constructor(@Inject(RESOURCE_CARD) private readonly resourceCardService: ResourceCardService) {}

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  draw(): void {
    this.updateState((state) => ({
      ...state,
      player1: { ...state.player1, isLoading: true, card: null, win: false },
      player2: { ...state.player2, isLoading: true, card: null, win: false }
    }));

    forkJoin([this.getDrawAction(), this.getDrawAction()])
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (result) => {
          this.handleDrawSuccess(result);
        },
        error: () => {
          this.handleDrawFailure();
        }
      });
  }

  private handleDrawSuccess([card1, card2]: [Card, Card]): void {
    const winner = this.resourceCardService.compare(card1, card2);
    const isCard1Winner = [0, 1].includes(winner);
    const isCard2Winner = [0, -1].includes(winner);

    this.updateState((state) => ({
      ...state,
      player1: {
        ...state.player1,
        card: card1,
        win: isCard1Winner,
        isLoading: false,
        score: state.player1.score + (isCard1Winner ? 1 : 0)
      },
      player2: {
        ...state.player2,
        card: card2,
        win: isCard2Winner,
        isLoading: false,
        score: state.player2.score + (isCard2Winner ? 1 : 0)
      }
    }));
  }

  private handleDrawFailure(): void {
    this.updateState((state) => ({
      ...state,
      player1: { ...state.player1, isLoading: false, card: null, win: false },
      player2: { ...state.player2, isLoading: false, card: null, win: false }
    }));
  }

  private updateState(updater: (state: CardState) => CardState): void {
    this._store.next(updater(this._store.getValue()));
  }

  private getDrawAction(): Observable<Card> {
    return this.resourceCardService.getCard();
  }
}
