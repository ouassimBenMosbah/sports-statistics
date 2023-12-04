import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { Observable, merge } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { IBookmaker, IGame, ISport } from 'src/interfaces/interfaces';
import { BookmakersService } from '../../services/bookmakers/bookmakers.service';
import { EventsService } from '../../services/events/events.service';
import { GamesService } from '../../services/games/games.service';
import { SportsService } from '../../services/sports/sports.service';

@Component({
  selector: 'app-specific-game-bonus',
  templateUrl: './specific-game-bonus.component.html',
  styleUrls: ['./specific-game-bonus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecificGameBonusComponent implements OnInit, AfterViewInit {
  public bookmakersList: IBookmaker[] = [];
  public sportsList: ISport[] = [];
  public form = new FormGroup({
    bookmakerId: new FormControl(null, [Validators.required]),
    minBet: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0.01),
    ]),
    minOdd: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1.01),
    ]),
    sportId: new FormControl(null, [Validators.required]),
    game: new FormControl(null, [Validators.required]),
  });
  public games$?: Observable<IGame[]>;

  @ViewChild('bookmakerSelectionList')
  public bookmakerSelectionList?: MatSelectionList;

  @ViewChild('sportsSelectionList')
  public sportsSelectionList?: MatSelectionList;

  @ViewChild('gamesSelectionList')
  public gamesSelectionList?: MatSelectionList;

  constructor(
    private bookmakersService: BookmakersService,
    private sportsService: SportsService,
    private eventsService: EventsService,
    private gamesService: GamesService
  ) {}

  public ngOnInit(): void {
    this.bookmakersList = Object.values(this.bookmakersService.bookmakers).sort(
      (bookmakerA, bookmakerB) =>
        bookmakerA.label.localeCompare(bookmakerB.label)
    );

    this.sportsList = this.sportsService.sportsGamesFetched.map(
      ({ id }) => this.sportsService.sports[id]
    );
  }

  public ngAfterViewInit(): void {
    if (
      !this.bookmakerSelectionList ||
      !this.sportsSelectionList ||
      !this.form.get('minBet') ||
      !this.form.get('minOdd')
    ) {
      return;
    }

    this.games$ = this.sportsSelectionList.selectionChange.asObservable().pipe(
      filter(() => {
        return this.sportsSelectionList?.selectedOptions.selected.at(0)?.value
          .id;
      }),
      tap(() => {
        this.gamesSelectionList?.deselectAll();
      }),
      map(() => {
        return Object.values(this.eventsService.events)
          .filter((event) => {
            return (
              event.sportId ===
              this.sportsSelectionList?.selectedOptions.selected.at(0)?.value.id
            );
          })
          .map(({ gamesIds }) => {
            return gamesIds;
          })
          .flatMap((gamesIds) => {
            return (
              gamesIds?.map((gameId) => this.gamesService.games[gameId]) ?? []
            );
          });
      }),
      shareReplay(1)
    );

    merge(
      this.bookmakerSelectionList.selectionChange.asObservable(),
      this.sportsSelectionList.selectionChange.asObservable(),
      (this.form.get('minBet') as FormControl).valueChanges,
      (this.form.get('minOdd') as FormControl).valueChanges
    )
      .pipe(
        tap(() => {
          this.form.patchValue({
            bookmakerId:
              this.bookmakerSelectionList?.selectedOptions?.selected.at(0)
                ?.value.id,
            sportId:
              this.sportsSelectionList?.selectedOptions?.selected.at(0)?.value
                .id,
          });
        }),
        filter(() => {
          return this.form.valid;
        })
      )
      .subscribe();
  }

  public onSelectedGameChange(): void {
    this.form
      .get('game')
      ?.setValue(
        this.gamesSelectionList?.selectedOptions.selected.at(0)?.value
      );
  }

  public computeOptimalBets(): void {
    console.log(this.form.get('game')?.value);
  }
}
