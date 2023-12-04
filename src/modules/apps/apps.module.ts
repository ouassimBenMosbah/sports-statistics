import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AppsRoutingModule } from './apps-routing.module';
import { AppsComponent } from './components/apps/apps.component';
import { DataInitializerComponent } from './components/data-initializer/data-initializer.component';
import { FetchOddsWarningComponent } from './components/fetch-odds-warning/fetch-odds-warning.component';
import { FreebetConverterComponent } from './components/freebet-converter/freebet-converter.component';
import { GamesOddsComponent } from './components/games-odds/games-odds.component';
import { SpecificGameBonusComponent } from './components/specific-game-bonus/specific-game-bonus.component';
import { GamesFilterPipe } from './pipes/games-filter/games-filter.pipe';

@NgModule({
  declarations: [
    AppsComponent,
    DataInitializerComponent,
    GamesOddsComponent,
    SpecificGameBonusComponent,
    FreebetConverterComponent,
    FetchOddsWarningComponent,
    GamesFilterPipe,
  ],
  imports: [
    AppsRoutingModule,
    CommonModule,
    DatePipe,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
  ],
})
export class AppsModule {}
