import { Idea } from '@core/models/idea';
import { createReducer, on } from '@ngrx/store';
import {
    unlockBook,
    getIdea,
    postMessage,
    postPicture,
    postTopic,
    postVideo,
    setIsThinking,
    unlockIdea,
    useIdea,
    readBook,
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
    on(useIdea, (state, { used }) => incrementIdeaOwn(state, -used)),
    on(setIsThinking, (state) => ({ ...state, isThinking: !state.isThinking })),
    on(unlockBook, (state, { book }) => ({
        ...state,
        books: { ...state.books, [book.id]: { ...state.books[book.id], ...book, unlocked: true } },
    })),
    on(readBook, (state, { book }) => ({
        ...state,
        books: { ...state.books, [book.id]: { ...state.books[book.id], ...book } },
    })),
);

const incrementIdeaOwn = (state: State, modifier: number) => {
    const newIdea = Object.assign(new Idea(), { ...state.idea, own: state.idea.own + modifier });
    return {
        ...state,
        idea: newIdea,
    };
};
