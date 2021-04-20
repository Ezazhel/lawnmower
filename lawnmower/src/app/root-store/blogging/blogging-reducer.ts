import { Idea } from '@core/models/idea';
import { createReducer, on } from '@ngrx/store';
import {
    addBook,
    getIdea,
    postMessage,
    postPicture,
    postTopic,
    postVideo,
    setIsThinking,
    unlockIdea,
    useIdea,
} from './blogging-action';
import { initialState, State } from './blogging-state';
export const reducer = createReducer(
    initialState,
    on(postMessage, (state) => state),
    on(postPicture, (state) => state),
    on(postTopic, (state) => state),
    on(postVideo, (state) => state),
    on(unlockIdea, (state) => ({ ...state, idea: new Idea() })),
    on(getIdea, (state) => incrementIdeaOwn(state, 1)),
    on(useIdea, (state) => incrementIdeaOwn(state, -1)),
    on(setIsThinking, (state) => ({ ...state, isThinking: !state.isThinking })),
    on(addBook, (state, { book }) => ({ ...state, books: { ...state.books, [book.id]: { ...book, unlocked: true } } })),
);

const incrementIdeaOwn = (state: State, modifier: number) => {
    const newIdea = Object.assign(new Idea(), { ...state.idea, own: state.idea.own + modifier });
    return {
        ...state,
        idea: newIdea,
    };
};
