import { createAction, props } from '@ngrx/store';
export const cutActionCompleted = createAction('[Neighboor] Cut completed', props<{ id: string; modifier: number }>());
export const cutAction = createAction('[Neighboor] Cut ', props<{ id: string; cutPercent: number }>());
export const regrowActionCompleted = createAction(
    '[Neighboor] Regrow completed',
    props<{ id: string; modifier: number }>(),
);
export const regrowAction = createAction('[Neighboor] Regrow ', props<{ id: string; regrowPercent: number }>());
export const increaseCuttingLimit = createAction('[Neighboor] Increase cutting limit', props<{ modifier: number }>());
export const insertNeighboorToRegrow = createAction('[Neighboor] insert neighboor to regrow', props<{ id: string }>());
export const insertNeighboorToCut = createAction(
    '[Neighboor] insert or update neighboor to cut',
    props<{ id: string; cutted: number }>(),
);

export const removeNeighboorFromCuttingList = createAction(
    '[Neighboor] remove neighboor from cutting list',
    props<{ id: string; unselect: boolean }>(),
);
export const removeNeighboorFromRegrowList = createAction(
    '[Neighboor] remove neighboor from regrow list',
    props<{ id: string }>(),
);
