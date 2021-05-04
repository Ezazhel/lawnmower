import { Creations } from '@core/data/creation-data';
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
    creations: {
        [id: string]: number;
    };
}

export const initialState: State = {
    blogging: new Blogging(),
    isThinking: false,
    books: {},
    automateIdea: false,
    canBuyBook: false,
    creations: {
        [Creations.first.name]: Creations.first.level,
    },
};
