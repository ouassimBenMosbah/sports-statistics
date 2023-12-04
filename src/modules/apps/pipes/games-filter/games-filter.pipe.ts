import { Pipe, PipeTransform } from '@angular/core';
import { IGame } from 'src/interfaces/interfaces';

@Pipe({
  name: 'gamesFilter',
})
export class GamesFilterPipe implements PipeTransform {
  public transform(games: IGame[], searchText?: string): IGame[] {
    if (!searchText) {
      return games;
    }
    return games.filter((game) => {
      const gameName = `${game.homeTeam} - ${game.awayTeam}`;
      return gameName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    });
  }
}
