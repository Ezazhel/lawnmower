import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { selectStatsState } from 'app/root-store/stats/stats-selector';
import { State } from 'app/root-store/stats/stats-state';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  stats$ = this.store.select(selectStatsState);
  constructor(private store: Store<RootStoreState.State>) { }

  ngOnInit(): void {
  }
  trackByFunction(index: number, stat: State){
    return index;
  }
}
