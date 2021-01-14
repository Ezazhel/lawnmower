import { Achievements } from '../../core/data/achievement-data';
export interface State {
    achievements: { [id: string]: boolean };
}

export const initialState: State = {
    achievements: Object.keys(Achievements).reduce((acc, next) => Object.assign({...acc,[next]: false}), {})
};
