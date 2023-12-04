import { Injectable } from '@angular/core';
import { IOdd } from 'src/interfaces/interfaces';
import { BookmakersService } from '../bookmakers/bookmakers.service';

@Injectable({
  providedIn: 'root',
})
export class OddsService {
  public odds: Record<string, IOdd> = {};

  constructor(private bookmakersService: BookmakersService) {}

  public findOddsInHTML(
    matchInfoTableRow: HTMLTableRowElement,
    gameId: string,
    acc: string[] = []
  ): string[] {
    const tableRow =
      matchInfoTableRow.nextElementSibling as HTMLTableRowElement;
    if (!tableRow || tableRow.classList.contains('trout') === false) {
      return acc;
    }
    const gameOdds = this.parseGameOdds(tableRow);
    const bookMakerId = this.bookmakersService.parseBookmakerFromHTML(tableRow);
    if (bookMakerId) {
      const oddId = this.addOdds(gameOdds, gameId, bookMakerId);
      acc.push(oddId);
    }
    return this.findOddsInHTML(tableRow, gameId, acc);
  }

  private parseGameOdds(tableRow: HTMLTableRowElement): {
    homeTeamOdd: number;
    awayTeamOdd: number;
    drawOdd?: number;
  } {
    const odds: number[] = [];
    (
      tableRow.querySelectorAll('td.bet') as NodeListOf<HTMLTableCellElement>
    ).forEach((node) => {
      odds.push(+node.innerText);
    });
    if (odds.length === 3) {
      return {
        homeTeamOdd: odds[0],
        drawOdd: odds[1],
        awayTeamOdd: odds[2],
      };
    }
    return {
      homeTeamOdd: odds[0],
      awayTeamOdd: odds[1],
    };
  }

  private addOdds(
    odd: {
      homeTeamOdd: number;
      awayTeamOdd: number;
      drawOdd?: number;
    },
    gameId: string,
    bookmakerId: string
  ): string {
    const oddId = this.buildId(gameId, bookmakerId);
    this.odds[oddId] = {
      id: oddId,
      bookmakerId,
      gameId,
      oddAwayTeam: odd.awayTeamOdd,
      oddHomeTeam: odd.homeTeamOdd,
      oddDraw: odd.drawOdd,
    };
    return oddId;
  }

  private buildId(gameId: string, bookmakerId: string): string {
    return `${bookmakerId}-${gameId}`;
  }
}
