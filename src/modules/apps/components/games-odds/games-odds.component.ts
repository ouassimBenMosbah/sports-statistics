import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  GamesOddsTableHelperService,
  IGameDataItem,
} from '../../services/games-odds-table-helper/games-odds-table-helper.service';

@Component({
  selector: 'app-games-odds',
  templateUrl: './games-odds.component.html',
  styleUrls: ['./games-odds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesOddsComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = [
    'sportLabel',
    'date',
    'teamsNames',
    'bestTRJ.trj',
  ];
  public dataSource: MatTableDataSource<IGameDataItem> =
    new MatTableDataSource();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private gamesOddsTableHelperService: GamesOddsTableHelperService
  ) {}

  public ngOnInit(): void {
    this.dataSource.data = this.gamesOddsTableHelperService.fetchDataSource();
  }

  public ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sortingDataAccessor = (obj, property) =>
        this.getProperty(obj, property);
      this.dataSource.sort = this.sort;
      this.dataSource.sort.sort({
        id: 'bestTRJ.trj',
        start: 'desc',
        disableClear: true,
      });
    }
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getProperty = (obj: IGameDataItem, path: string) =>
    path.split('.').reduce((acc: any, curr) => acc && acc[curr], obj);
}
