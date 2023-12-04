import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IEvent, IGame } from 'src/interfaces/interfaces';
import { EventsService } from '../events/events.service';
import { OddsService } from '../odds/odds.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  public games: Record<string, IGame> = {};
  constructor(
    private http: HttpClient,
    private eventsService: EventsService,
    private oddsService: OddsService
  ) {}

  public fetchGames(event: IEvent): Observable<IGame[]> {
    return this.http
      .get(`http://www.comparateur-de-cotes.fr/${event.url}`, {
        responseType: 'text',
      })
      .pipe(
        map((html: string) => {
          return this.parseGamesInHtml(html, event);
        }),
        tap((games) => {
          games.forEach((game) => {
            this.eventsService.addGameToEvent(event.id, game.id);
          });
          this.games = games.reduce((acc, curr) => {
            return { ...acc, [curr.id]: curr };
          }, this.games);
        })
      );
  }

  private parseGamesInHtml(html: string, event: IEvent): IGame[] {
    const games: IGame[] = [];
    const parser = new DOMParser().parseFromString(html, 'text/html');
    const matchesInfoTableRow = (
      parser.querySelector('table.bettable') as HTMLTableElement
    ).querySelectorAll('tr:not(.trout)') as NodeListOf<HTMLTableRowElement>;

    matchesInfoTableRow.forEach((matchInfoTableRow) => {
      const teamsLabels = this.getTeamsLabelFromHtml(matchInfoTableRow);
      const date: Date = this.getDateFromHtml(matchInfoTableRow);
      const gameId = this.buildId(event.sportId, date, teamsLabels);
      const oddsIds = this.oddsService.findOddsInHTML(
        matchInfoTableRow,
        gameId
      );
      const game: IGame = {
        eventId: event.id,
        id: gameId,
        date,
        ...teamsLabels,
        oddsIds,
      };
      games.push(game);
    });
    return games;
  }

  private buildId(
    sportId: string,
    date: Date,
    teamsLabels: Pick<IGame, 'awayTeam' | 'homeTeam'>
  ): string {
    return `${sportId}_${date.getTime()}_${teamsLabels.homeTeam}-${
      teamsLabels.awayTeam
    }`;
  }

  private getDateFromHtml(tableRowElement: HTMLTableRowElement): Date {
    let dateStringArr: string[] = (
      (
        tableRowElement.querySelector('h2.matchname') as HTMLHeadingElement
      ).nextSibling?.nodeValue
        ?.replaceAll('\n', '')
        .trim()
        .replace(/\s+/g, ' ') ?? new Date().toDateString()
    )
      .split(' ')
      .slice(1, 4);
    const monthsArr = [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ];
    dateStringArr[1] = monthsArr.indexOf(dateStringArr[1]).toString();

    return new Date(+dateStringArr[2], +dateStringArr[1], +dateStringArr[0]);
  }

  private getTeamsLabelFromHtml(
    tableRowElement: HTMLTableRowElement
  ): Pick<IGame, 'awayTeam' | 'homeTeam'> {
    const teamLabels: NodeListOf<HTMLElement> = (
      tableRowElement.querySelector('h2.matchname') as HTMLHeadingElement
    ).querySelectorAll('a.otn');
    return {
      homeTeam: teamLabels.item(0).innerText,
      awayTeam: teamLabels.item(1).innerText,
    };
  }
}
