import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  IBookmaker,
  IEvent,
  IGame,
  IOdd,
  ISport,
} from 'src/interfaces/interfaces';
import { BookmakersService } from '../../services/bookmakers/bookmakers.service';
import { EventsService } from '../../services/events/events.service';
import { GamesService } from '../../services/games/games.service';
import { OddsService } from '../../services/odds/odds.service';
import { SportsService } from '../../services/sports/sports.service';

@Component({
  selector: 'app-data-initializer',
  templateUrl: './data-initializer.component.html',
  styleUrls: ['./data-initializer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataInitializerComponent implements OnInit {
  public bookMakersOptions$?: Observable<IBookmaker[]>;
  public sportsOptions$?: Observable<ISport[]>;
  public events$?: Observable<{
    bookmakers: Record<string, IBookmaker>;
    events: Record<string, IEvent>;
    games: Record<string, IGame>;
    numberEvents: number;
    odds: Record<string, IOdd>;
  }>;

  private onFetchOdds: Subject<void> = new Subject();

  @ViewChild('sportsList') sportsList?: MatSelectionList;

  constructor(
    private bookmakersService: BookmakersService,
    private eventsService: EventsService,
    private gamesService: GamesService,
    private oddsService: OddsService,
    private sportsService: SportsService
  ) {}

  public ngOnInit(): void {
    this.sportsOptions$ = this.sportsService.fetchSports();

    this.events$ = this.onFetchOdds.pipe(
      switchMap(() => {
        return this.bookmakersService.fetchBookmakers();
      }),
      switchMap(() => {
        return this.eventsService.fetchEvents(
          this.sportsList?.selectedOptions.selected[0].value
        );
      }),
      switchMap((events) => {
        return combineLatest(
          Object.values(events).map((e) => {
            return this.gamesService.fetchGames(e);
          })
        ).pipe(
          map(() => {
            return {
              bookmakers: this.bookmakersService.bookmakers,
              events: this.eventsService.events,
              games: this.gamesService.games,
              numberEvents: events.length,
              odds: this.oddsService.odds,
            };
          })
        );
      }),
      tap(() => {
        this.sportsService.gamesFetched(
          this.sportsList?.selectedOptions.selected[0].value
        );
      })
    );
  }

  public fetchOdds(): void {
    this.onFetchOdds.next();
  }
}
