import { state } from '@angular/animations';
import { Idea } from '@core/models/idea';
import { createReducer, on } from '@ngrx/store';
import {
    getIdea,
    postMessage,
    postPicture,
    postTopic,
    postVideo,
    setIsCreating,
    setIsGettingIdea,
    setIsThinking,
    unlockIdea,
} from './blogging-action';
import { initialState, State } from './blogging-state';
export const reducer = createReducer(
    initialState,
    on(postMessage, (state) => state),
    on(postPicture, (state) => state),
    on(postTopic, (state) => state),
    on(postVideo, (state) => state),
    on(unlockIdea, (state) => ({ ...state, idea: new Idea() })),
    on(getIdea, (state) => incrementIdeaOwn(state)),
    on(setIsThinking, (state) => ({ ...state, isThinking: !state.isThinking })),
    on(setIsGettingIdea, (state) => ({ ...state, isGettingIdea: !state.isGettingIdea })),
    on(setIsCreating, (state) => ({ ...state, isCreating: !state.isCreating })),
);

const incrementIdeaOwn = (state: State) => {
    const newIdea = Object.assign(new Idea(), { ...state.idea, own: state.idea.own + 1 });
    return {
        ...state,
        idea: newIdea,
    };
};
