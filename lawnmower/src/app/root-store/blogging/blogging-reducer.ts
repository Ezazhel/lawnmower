import { Creations } from '@core/data/creation-data';
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
    increaseCreationLevel,
    unlockCreation,
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
    on(unlockCreation, (state, { id }) => ({ ...state, creations: { ...state.creations, [id]: 1 } })),
    on(increaseCreationLevel, (state, { id }) => ({
        ...state,
        creations: { ...state.creations, [id]: state.creations[id] + 1 },
    })),
);
