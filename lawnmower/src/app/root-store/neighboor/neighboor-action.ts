import { createAction, props } from '@ngrx/store';
export const cut = createAction('[Neighboor] Cut', props<{ id: string }>());
export const regrow = createAction('[Neighboor] regrow', props<{ id: string }>());
