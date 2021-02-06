import { createReducer, on } from '@ngrx/store';
import { postMessage, postPicture, postTopic, postVideo, earnImagination, earnCreativity } from './blogging-action';
import { initialState } from './blogging-state';
export const reducer = createReducer(
    initialState,
    on(postMessage, (state) => state),
    on(postPicture, (state) => state),
    on(postTopic, (state) => state),
    on(postVideo, (state) => state),
    on(earnImagination, (state, { amount }) => ({
        ...state,
        blogging: {
            ...state.blogging,
            imagination: { ...state.blogging.imagination, amount: state.blogging.imagination.amount + amount },
        },
    })),
    on(earnCreativity, (state, { amount }) => ({
        ...state,
        blogging: {
            ...state.blogging,
            creativity: { ...state.blogging.creativity, amount: state.blogging.creativity.amount + amount },
        },
    })),
);
