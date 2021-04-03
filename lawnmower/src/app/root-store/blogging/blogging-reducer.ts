import { createReducer, on } from '@ngrx/store';
import {
    postMessage,
    postPicture,
    postTopic,
    postVideo,
    setIsCreating,
    setIsGettingIdea,
    setIsThinking,
} from './blogging-action';
import { initialState } from './blogging-state';
export const reducer = createReducer(
    initialState,
    on(postMessage, (state) => state),
    on(postPicture, (state) => state),
    on(postTopic, (state) => state),
    on(postVideo, (state) => state),
    on(setIsThinking, (state) => ({ ...state, isThinking: !state.isThinking })),
    on(setIsGettingIdea, (state) => ({ ...state, isGettingIdea: !state.isGettingIdea })),
    on(setIsCreating, (state) => ({ ...state, isCreating: !state.isCreating })),
);
