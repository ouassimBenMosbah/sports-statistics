import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fetch-odds-warning',
  templateUrl: './fetch-odds-warning.component.html',
  styleUrls: ['./fetch-odds-warning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FetchOddsWarningComponent {}
