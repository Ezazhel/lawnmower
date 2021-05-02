import { Blogging } from '@core/models/blogging';
import Book from '@core/models/book';
export interface State {
    blogging: Blogging;
    isThinking: boolean;
    books: {
        [id: string]: Partial<Book>;
    };
    automateIdea: boolean;
    canBuyBook: boolean;
}

export const initialState: State = {
    blogging: new Blogging(),
    isThinking: false,
    books: {},
    automateIdea: false,
    canBuyBook: false,
};
