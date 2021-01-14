import { createAction, props } from '@ngrx/store';
export const cutAction = createAction('[Neighboor] Cut', props<{ id: string; modifier: number }>());
export const regrowAction = createAction('[Neighboor] Regrow', props<{ id: string; modifier: number }>());
export const increaseCuttingLimit = createAction('[Neighboor] Increase cutting limit', props<{ modifier: number }>());
