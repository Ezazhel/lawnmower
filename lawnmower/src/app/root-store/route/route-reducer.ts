import { createReducer, on } from '@ngrx/store';
import { initialState, State } from './route-state';
import { activateRoute, activateSubroute } from './route-action';
import { Route } from '@core/models/route';

export const reducer = createReducer(
    initialState,
    on(activateRoute, (state, { route }) => activateMenu(state, route)),
    on(activateSubroute, (state, { mainRoute, subRoute }) => activateSubmenu(state, mainRoute, subRoute)),
);

function activateMenu(state: State, route: Route) {
    return {
        ...state,
        routes: {
            ...state.routes,
            [route.path]: {
                ...state.routes[route.path],
                isActive: true,
            },
        },
    };
}

function activateSubmenu(state: State, mainRoute: Route, subRoute: Route) {
    return {
        ...state,
        routes: {
            ...state.routes,
            [mainRoute.path]: {
                ...state.routes[mainRoute.path],
                subPath: state.routes[mainRoute.path].subPath.map((subPath) =>
                    subPath.index == subRoute.index ? { ...subPath, isActive: true } : subPath,
                ),
            },
        },
    };
}
