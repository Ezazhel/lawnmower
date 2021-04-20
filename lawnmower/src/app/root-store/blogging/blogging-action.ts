import Book from '@core/models/book';
import { createAction, props } from '@ngrx/store';

export const postMessage = createAction('[Blogging] Post Message');
export const postVideo = createAction('[Blogging] Post Video');
export const postTopic = createAction('[Blogging] Post Topic');
export const postPicture = createAction('[Blogging] Post picture');

export const setIsThinking = createAction('[Blogging] Think !');

export const getIdea = createAction('[Blogging] Get an idea');
export const unlockIdea = createAction('[Blogging] Unlock Idea');
export const useIdea = createAction('[Blogging] Use Idea');

export const addBook = createAction('[Blogging] Add book', props<{ book: Book }>());
