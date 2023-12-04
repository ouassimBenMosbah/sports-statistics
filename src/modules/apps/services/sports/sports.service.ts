import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ISport } from '../../../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SportsService {
  public sports: Record<string, ISport> = {};
  public sportsGamesFetched: { id: string; updateDate: Date }[] = [];

  public gamesFetched(sport: ISport): { id: string; updateDate: Date }[] {
    this.sportsGamesFetched = this.sportsGamesFetched
      .filter(({ id }) => id !== sport.id)
      .concat({ id: sport.id, updateDate: new Date() });
    return this.sportsGamesFetched;
  }

  public fetchSports(): Observable<ISport[]> {
    const sports = [
      { id: 'football', label: 'Football' },
      { id: 'tennis', label: 'Tennis' },
      { id: 'rugby', label: 'Rugby' },
      { id: 'basketball', label: 'Basketball' },
      { id: 'handball', label: 'Handball' },
      { id: 'volleyball', label: 'Volleyball' },
      { id: 'hockey sur glace', label: 'Hockey sur glace' },
      { id: 'boxe', label: 'Boxe' },
    ];

    return of(sports).pipe(
      tap((sportsResults) => {
        this.sports = sportsResults.reduce((acc, curr) => {
          return { ...acc, [curr.id]: curr };
        }, {});
      })
    );
  }

  public addEventToSport(sportId: string, eventId: string): void {
    this.sports[sportId] = {
      ...this.sports[sportId],
      eventsIds:
        this.sports[sportId].eventsIds !== undefined
          ? [...new Set(this.sports[sportId].eventsIds).add(eventId)]
          : [eventId],
    };
  }
}
