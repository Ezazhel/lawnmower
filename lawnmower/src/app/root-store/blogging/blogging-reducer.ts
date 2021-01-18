import { createReducer, on } from '@ngrx/store';
import { postMessage, postPicture, postTopic, postVideo } from './blogging-action';
import { initialState } from './blogging-state';
export const reducer = createReducer(
    initialState,
    on(postMessage, (state) => state),
    on(postPicture, (state) => state),
    on(postTopic, (state) => state),
    on(postVideo, (state) => state),
);
