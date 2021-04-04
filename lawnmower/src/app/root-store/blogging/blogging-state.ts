import { Blogging } from '@core/models/blogging';
import { Idea } from '@core/models/idea';
export interface State {
    blogging: Blogging;
    isThinking: boolean;
    isGettingIdea: boolean;
    isCreating: boolean;
    idea: Idea;
}

export const initialState: State = {
    blogging: new Blogging(),
    isThinking: false,
    isGettingIdea: false,
    isCreating: false,
    idea: null,
};
