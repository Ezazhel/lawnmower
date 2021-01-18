import { Blogging } from '@core/models/blogging';
export interface State {
    blogging: Blogging;
}

export const initialState = {
    blogging: new Blogging(),
};
