import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './achievements-state';
import { Achievements } from '@core/data/achievement-data';
import { Achievement } from '@core/models/achievement';

export const selectAchievementState: MemoizedSelector<object, State> = createFeatureSelector('achievements');

export const selectAchievements = createSelector(selectAchievementState, (state) => {
    debugger;
    const ach = Object.keys(state.achievements).map((k) =>
    Object.assign<Achievement, Partial<Achievement>>(Achievements[k], { isUnlock: state.achievements[k] }),
    )
    return ach;
});

export const selectAchievementsNotUnlock = createSelector(selectAchievements, (achievements) =>
    achievements.filter((a) => !a.isUnlock),
);
export const selectAchievementsUnlock = createSelector(selectAchievements, (achievements) =>
    achievements.filter((a) => a.isUnlock),
);
