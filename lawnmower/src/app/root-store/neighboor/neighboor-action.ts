import { createAction, props } from '@ngrx/store';
export const cutAction = createAction('[Neighboor] Cut', props<{ id: number; modifier: number }>());
export const regrowAction = createAction('[Neighboor] Regrow', props<{ id: number; modifier: number }>());
