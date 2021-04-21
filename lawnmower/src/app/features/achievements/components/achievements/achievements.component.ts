import { Component, OnInit } from '@angular/core';
import { Achievement } from '@core/models/achievement';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { Observable } from 'rxjs';
import { selectAchievements } from '../../../../root-store/achievements/achievements-selector';

@Component({
    selector: 'app-achievements',
    templateUrl: './achievements.component.html',
    styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent implements OnInit {
    achievements$: Observable<Achievement[]> = this.store.select(selectAchievements);
    constructor(private store: Store<RootStoreState.State>) {}

    getAchievementsBonus(achievements: Achievement[]) {
        return Math.pow(1.12, achievements.filter((a) => a.isUnlock).length);
    }

    ngOnInit(): void {}
    trackByFunction(index: number, object: Achievement) {
        return index;
    }
}
