import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IBookmaker } from '../../../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookmakersService {
  public bookmakers: Record<string, IBookmaker> = {};

  public fetchBookmakers(): Observable<IBookmaker[]> {
    const bookmakers = [
      { id: 'winamax', label: 'Winamax', domain: 'winamax' },
      { id: 'betclic', label: 'Betclic', domain: 'eacdn' },
      { id: 'betstars', label: 'Pokerstars', domain: 'starsaffiliateclub' },
      { id: 'bwin', label: 'Bwin', domain: 'bwin' },
      { id: 'netbet', label: 'Netbet', domain: 'livepartners' },
      { id: 'parionsweb', label: 'Parions Sport', domain: 'tradedoubler' },
      { id: 'pmu', label: 'PMU', domain: 'awin1' },
      { id: 'unibet', label: 'Unibet', domain: 'unibet' },
      { id: 'vbet', label: 'Vbet', domain: 'vbet' },
      { id: 'zebet', label: 'Zebet', domain: 'zebet' },
    ];

    return of(bookmakers).pipe(
      tap((books) => {
        this.bookmakers = books.reduce((acc, curr) => {
          return { ...acc, [curr.id]: curr };
        }, {});
      })
    );
  }

  public parseBookmakerFromHTML(
    tableRow: HTMLTableRowElement
  ): string | undefined {
    const url = this.detectURLs(tableRow.outerHTML);
    if (url === null) {
      return undefined;
    }
    const bookmakerUrl = new URL(url.at(0) as string);
    const domain = bookmakerUrl.hostname.split('.').slice(-2, -1)[0];
    return Object.values(this.bookmakers).find(
      (bookmaker) => bookmaker.domain === domain
    )?.id;
  }

  private detectURLs(str: string) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return str.match(urlRegex);
  }
}
