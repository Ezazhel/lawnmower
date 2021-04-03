import { Blogging } from '@core/models/blogging';
export interface State {
    blogging: Blogging;
    isThinking: boolean;
    isGettingIdea: boolean;
    isCreating: boolean;
}

export const initialState: State = {
    blogging: new Blogging(),
    isThinking: false,
    isGettingIdea: false,
    isCreating: false,
};
