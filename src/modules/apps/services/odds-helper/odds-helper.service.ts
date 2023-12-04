import { Injectable } from '@angular/core';
import { IOdd } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OddsHelperService {
  public computeTRJ(
    odd: Pick<IOdd, 'oddHomeTeam' | 'oddDraw' | 'oddAwayTeam'>
  ): number {
    return (
      1 /
      (1 / odd.oddHomeTeam +
        1 / odd.oddAwayTeam +
        (odd.oddDraw ? 1 / odd.oddDraw : 0))
    );
  }

  public computeBestBookmakersTRJ(
    odds: (Pick<IOdd, 'oddHomeTeam' | 'oddDraw' | 'oddAwayTeam'> & {
      bookmakerLabel: string;
    })[]
  ): {
    trj: number;
    bestOddHomeTeam: { odd: number; bookmakersLabel: string[] };
    bestOddAwayTeam: { odd: number; bookmakersLabel: string[] };
    bestOddDraw?: { odd: number; bookmakersLabel: string[] };
  } {
    const bestOdds = this.getBookmakersBestOdds(odds);
    return {
      ...bestOdds,
      trj: this.computeTRJ({
        oddHomeTeam: bestOdds.bestOddHomeTeam.odd,
        oddAwayTeam: bestOdds.bestOddAwayTeam.odd,
        oddDraw: bestOdds.bestOddDraw?.odd,
      }),
    };
  }

  private getBookmakersBestOdds(
    odds: (Pick<IOdd, 'oddHomeTeam' | 'oddDraw' | 'oddAwayTeam'> & {
      bookmakerLabel: string;
    })[]
  ): {
    bestOddHomeTeam: { odd: number; bookmakersLabel: string[] };
    bestOddAwayTeam: { odd: number; bookmakersLabel: string[] };
    bestOddDraw?: { odd: number; bookmakersLabel: string[] };
  } {
    const oddsDraw = odds.filter((odd) => !!odd.oddDraw) as {
      oddDraw: number;
      bookmakerLabel: string;
    }[];
    return {
      bestOddHomeTeam: this.getBookmakersBestOdd(
        odds.map((odd) => ({
          odd: odd.oddHomeTeam,
          bookmakerLabel: odd.bookmakerLabel,
        }))
      ) as {
        odd: number;
        bookmakersLabel: string[];
      },
      bestOddAwayTeam: this.getBookmakersBestOdd(
        odds.map((odd) => ({
          odd: odd.oddAwayTeam,
          bookmakerLabel: odd.bookmakerLabel,
        }))
      ) as {
        odd: number;
        bookmakersLabel: string[];
      },
      bestOddDraw:
        oddsDraw.length === 0
          ? undefined
          : (this.getBookmakersBestOdd(
              oddsDraw.map((odd) => ({
                odd: odd.oddDraw,
                bookmakerLabel: odd.bookmakerLabel,
              }))
            ) as {
              odd: number;
              bookmakersLabel: string[];
            }),
    };
  }

  private getBookmakersBestOdd(
    odds: { odd: number; bookmakerLabel: string }[]
  ): {
    odd?: number;
    bookmakersLabel: string[];
  } {
    return odds.reduce(
      (acc, curr) => {
        if (!acc.odd) {
          return { odd: curr.odd, bookmakersLabel: [curr.bookmakerLabel] };
        }
        if (curr.odd > acc.odd) {
          return { odd: curr.odd, bookmakersLabel: [curr.bookmakerLabel] };
        }
        if (curr.odd === acc.odd) {
          return {
            odd: curr.odd,
            bookmakersLabel: acc.bookmakersLabel.concat(curr.bookmakerLabel),
          };
        }
        return acc;
      },
      {
        odd: undefined,
        bookmakersLabel: [],
      } as {
        odd?: number;
        bookmakersLabel: string[];
      }
    );
  }
}
