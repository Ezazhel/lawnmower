import { Component, OnInit } from '@angular/core';
import { Achievements } from '@core/data/achievement-data';
import { Achievement } from '@core/models/achievement';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { selectAchievements } from '../../../../root-store/achievements/achievements-selector';

@Component({
    selector: 'app-achievements',
    templateUrl: './achievements.component.html',
    styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent implements OnInit {
    achievements$ = this.store.select(selectAchievements);
    constructor(private store: Store<RootStoreState.State>) {}

    ngOnInit(): void {}
    trackByFunction(index: number, object: Achievement) {
        return index;
    }
}
