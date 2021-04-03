import { createAction, props } from '@ngrx/store';

export const postMessage = createAction('[Blogging] Post Message');
export const postVideo = createAction('[Blogging] Post Video');
export const postTopic = createAction('[Blogging] Post Topic');
export const postPicture = createAction('[Blogging] Post picture');

export const setIsThinking = createAction('[Blogging] Think !');
export const setIsGettingIdea = createAction('[Blogging] Get Idea !');
export const setIsCreating = createAction('[Blogging]  Create !');
