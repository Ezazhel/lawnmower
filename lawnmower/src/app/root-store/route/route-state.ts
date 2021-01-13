import { Route } from '@core/models/route';
import { routes } from '@core/data/route-data';
export interface State {
    routes: {
        [id: string]: Route;
    };
}

export const initialState: State = {
    routes: routes,
};
