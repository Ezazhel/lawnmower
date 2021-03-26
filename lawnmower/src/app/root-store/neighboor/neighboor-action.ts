import { createAction, props } from '@ngrx/store';
export const cutActionCompleted = createAction('[Neighboor] Cut completed', props<{ id: string; modifier: number }>());
export const cutAction = createAction('[Neighboor] Cut ', props<{ id: string; cutPercent: number }>());
export const regrowActionCompleted = createAction('[Neighboor] Regrow completed', props<{ id: string; modifier: number }>());
export const regrowAction = createAction('[Neighboor] Regrow ', props<{ id: string; regrowPercent: number }>());
export const increaseCuttingLimit = createAction('[Neighboor] Increase cutting limit', props<{ modifier: number }>());
