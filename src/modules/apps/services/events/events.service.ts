import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IEvent, ISport } from '../../../../interfaces/interfaces';
import { SportsService } from '../sports/sports.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  public events: Record<string, IEvent> = {};
  constructor(private http: HttpClient, private sportsService: SportsService) {}

  public fetchEvents(sport: ISport): Observable<IEvent[]> {
    return this.http
      .get(
        `http://www.comparateur-de-cotes.fr/comparateur/${encodeURI(sport.id)}`,
        { responseType: 'text' }
      )
      .pipe(
        map((html: string) => {
          return this.parseEventsInHtml(html, sport);
        }),
        tap((events) => {
          this.events = events.reduce((acc, curr) => {
            this.sportsService.addEventToSport(sport.id, curr.id);
            return { ...acc, [curr.id]: curr };
          }, this.events);
        })
      );
  }

  public addGameToEvent(eventId: string, gameId: string): void {
    this.events[eventId] = {
      ...this.events[eventId],
      gamesIds:
        this.events[eventId].gamesIds !== undefined
          ? [...new Set(this.events[eventId].gamesIds).add(gameId)]
          : [gameId],
    };
  }

  private parseEventsInHtml(html: string, sport: ISport): IEvent[] {
    const parser = new DOMParser().parseFromString(html, 'text/html');

    const sportName = encodeURI(sport.id).replaceAll('%20', '-');

    const eventsLinksElements = parser.querySelectorAll(
      `a[href^="comparateur/${sportName}/"]`
    );

    const events: IEvent[] = [];
    eventsLinksElements.forEach((e) => {
      const url: string = e.getAttribute('href') ?? '';
      events.push({
        id: url.split('-').pop() ?? url,
        label: ((e as HTMLElement).innerText as string)?.trim(),
        url,
        sportId: sport.id,
      });
    });
    return events;
  }
}
