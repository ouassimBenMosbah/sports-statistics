export interface IBookmaker {
  id: string;
  label: string;
  domain: string;
}

export interface ISport {
  id: string;
  label: string;
  eventsIds?: Array<IEvent['id']>;
}

export interface IEvent {
  id: string;
  label: string;
  url: string;
  sportId: ISport['id'];
  gamesIds?: Array<IGame['id']>;
}

export interface IGame {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: Date;
  oddsIds?: Array<IOdd['id']>;
  eventId?: IEvent['id'];
}

export interface IOdd {
  id: string;
  gameId: string;
  bookmakerId: string;
  oddHomeTeam: number;
  oddAwayTeam: number;
  oddDraw?: number;
}
