import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State } from './achievements-state';
import { Achievement } from '@core/models/achievement';
import { MowingAchievements, BloggingAchievements } from '@core/data/achievement-data';

const AllAchievements = { ...MowingAchievements, ...BloggingAchievements };

const filterUnlock = (a: Achievement, isUnlock: boolean) => a.isUnlock == isUnlock;

export const achievementState: MemoizedSelector<object, State> = createFeatureSelector('achievements');
export const achievementsArray = createSelector(achievementState, (state) => {
    return Object.keys(state.achievements).map(
        (k) => Object.assign({}, AllAchievements[k], { isUnlock: state.achievements[k] }) as Achievement,
    );
});

export const achievementsUnlock = createSelector(
    achievementsArray,
    (achievements: Achievement[], isUnlock: boolean) => {
        return achievements.filter((a) => filterUnlock(a, isUnlock));
    },
);

export const achievementBonusMult = createSelector(achievementsArray, (achievements) => {
    return Achievement.prototype.getBonusAchievement(achievements.filter((a) => filterUnlock(a, true)).length);
});
