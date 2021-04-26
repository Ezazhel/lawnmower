import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './achievements-state';
import { Achievement } from '@core/models/achievement';
import { MowingAchievements, BloggingAchievements } from '@core/data/achievement-data';

const AllAchievements = { ...MowingAchievements, ...BloggingAchievements };

export const selectAchievementState: MemoizedSelector<object, State> = createFeatureSelector('achievements');

export const selectAchievements = createSelector(selectAchievementState, (state) => {
    return Object.keys(state.achievements).map(
        (k) => Object.assign({}, AllAchievements[k], { isUnlock: state.achievements[k] }) as Achievement,
    );
});

export const selectAchievementsNotUnlock = createSelector(selectAchievements, (achievements) =>
    achievements.filter((a) => !a.isUnlock),
);
export const selectAchievementsUnlock = createSelector(selectAchievements, (achievements) =>
    achievements.filter((a) => a.isUnlock),
);

export const selectAchievementBonusMult = createSelector(selectAchievementsUnlock, (achievements) =>
    Achievement.prototype.getBonusAchievement(achievements.length),
);
