import { Component, OnInit } from '@angular/core';
import { Achievement } from '@core/models/achievement';
import { Observable } from 'rxjs';
import { AchievementFacadeService } from '@core/facade/achievement.facade';

@Component({
    selector: 'app-achievements',
    templateUrl: './achievements.component.html',
    styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent implements OnInit {
    achievements$: Observable<Achievement[]> = this.achievementFacade.achievements$;

    achievementBonusToCurrency$ = this.achievementFacade.achievementBonusToCurrency$;
    constructor(private achievementFacade: AchievementFacadeService) {}

    ngOnInit(): void {}
    trackByFunction(index: number, object: Achievement) {
        return index;
    }
}
