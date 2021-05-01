import { createReducer, on } from '@ngrx/store';
import {
    unlockBook,
    postMessage,
    postPicture,
    postTopic,
    postVideo,
    setIsThinking,
    readBook,
    automateIdea,
    canBuyBook,
} from './blogging-action';
import { initialState, State } from './blogging-state';
export const reducer = createReducer(
    initialState,
    on(postMessage, (state) => state),
    on(postPicture, (state) => state),
    on(postTopic, (state) => state),
    on(postVideo, (state) => state),
    on(setIsThinking, (state) => ({ ...state, isThinking: !state.isThinking })),
    on(unlockBook, (state, { book }) => ({
        ...state,
        books: { ...state.books, [book.id]: { ...book, unlocked: true } },
    })),
    on(readBook, (state, { book }) => ({
        ...state,
        books: { ...state.books, [book.id]: { ...state.books[book.id], ...book } },
    })),
    on(automateIdea, (state) => ({ ...state, automateIdea: !state.automateIdea })),
    on(canBuyBook, (state) => ({ ...state, canBuyBook: true })),
);
