import { createAction, props } from '@ngrx/store';

export const postMessage = createAction('[Blogging] Post Message');
export const postVideo = createAction('[Blogging] Post Video');
export const postTopic = createAction('[Blogging] Post Topic');
export const postPicture = createAction('[Blogging] Post picture');

export const earnImagination = createAction('[Blogging] Imagine', props<{ amount: number }>());
export const earnCreativity = createAction('[Blogging] Create', props<{ amount: number }>());
