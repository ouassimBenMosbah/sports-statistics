import { Injectable } from '@angular/core';
import { IEvent, IGame, IOdd } from 'src/interfaces/interfaces';
import { BookmakersService } from '../bookmakers/bookmakers.service';
import { EventsService } from '../events/events.service';
import { GamesService } from '../games/games.service';
import { OddsHelperService } from '../odds-helper/odds-helper.service';
import { OddsService } from '../odds/odds.service';
import { SportsService } from '../sports/sports.service';

export type IGameDataItem = Pick<IGame, 'id' | 'date'> & {
  teamsNames: string;
  odds: Array<
    Pick<IOdd, 'id' | 'oddHomeTeam' | 'oddAwayTeam' | 'oddDraw'> & {
      bookmakerLabel: string;
      trj: number;
    }
  >;
  bestTRJ: {
    trj: number;
    bestOddHomeTeam: { odd: number; bookmakersLabel: string[] };
    bestOddAwayTeam: { odd: number; bookmakersLabel: string[] };
    bestOddDraw?: { odd: number; bookmakersLabel: string[] };
  };
  eventLabel?: string;
  sportLabel?: string;
};

type IGameDataSource = IGameDataItem[];

@Injectable({
  providedIn: 'root',
})
export class GamesOddsTableHelperService {
  constructor(
    private bookmakersService: BookmakersService,
    private eventsService: EventsService,
    private gamesService: GamesService,
    private oddsHelperService: OddsHelperService,
    private oddsService: OddsService,
    private sportsService: SportsService
  ) {}

  public fetchDataSource(): IGameDataSource {
    return Object.values(this.gamesService.games).map((game) => {
      const gameEvent = this.getGameEvent(game);
      const odds = this.getGameOdds(game);
      return {
        id: game.id,
        date: game.date,
        teamsNames: `${game.homeTeam} - ${game.awayTeam}`,
        odds,
        bestTRJ: this.oddsHelperService.computeBestBookmakersTRJ(odds),
        // optional
        eventLabel: gameEvent?.label,
        sportLabel: gameEvent?.sportId
          ? this.sportsService.sports[gameEvent?.sportId]?.label
          : undefined,
      };
    });
  }

  private getGameEvent(game: IGame): IEvent | undefined {
    return game.eventId ? this.eventsService.events[game.eventId] : undefined;
  }

  private getGameOdds(game: IGame): IGameDataItem['odds'] {
    return (
      game.oddsIds?.map((oddId) => {
        const odd = this.oddsService.odds[oddId];
        const bookmaker = this.bookmakersService.bookmakers[odd.bookmakerId];
        return {
          id: odd.id,
          oddHomeTeam: odd.oddHomeTeam,
          oddAwayTeam: odd.oddAwayTeam,
          oddDraw: odd.oddDraw,
          bookmakerLabel: bookmaker.label,
          trj: this.oddsHelperService.computeTRJ(odd),
        };
      }) ?? []
    );
  }
}
