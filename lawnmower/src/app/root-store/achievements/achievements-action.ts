import { createAction, props } from '@ngrx/store';
export const unlockAchievementAction = createAction('[Achievements] Unlock', props<{ id: string }>());
