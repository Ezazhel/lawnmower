import { Achievements } from '../../core/data/achievement-data';
export interface State {
    achievements: { [id: string]: boolean };
}

export const initialState: State = {
    achievements: {
        [Achievements.a1.id]: false,
    },
};
