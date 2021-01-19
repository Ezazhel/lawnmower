import { createAction, props } from '@ngrx/store';
import { Achievement } from '../../core/models/achievement';
export const unlockAchievementAction = createAction('[Achievements] Unlock', props<{ id: string }>());
export const addAchievements = createAction(
    '[Achievements] add achievements',
    props<{ Achievements: { [id: string]: Achievement } }>(),
);
