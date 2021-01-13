import { createAction, props } from '@ngrx/store';
import { Route } from '@core/models/route';

export const activateRoute = createAction('[Route] Activate Route', props<{ route: Route }>());
export const activateSubroute = createAction(
    '[Route] Activate Subroute Route',
    props<{ mainRoute: Route; subRoute: Route }>(),
);
