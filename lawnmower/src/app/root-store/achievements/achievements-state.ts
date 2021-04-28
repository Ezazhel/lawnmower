import { BloggingAchievements, MowingAchievements } from '@core/data/achievement-data';
export interface State {
    achievements: { [id: string]: boolean };
}

export const initialState: State = {
    achievements: {
        ...Object.keys(MowingAchievements).reduce((acc, next) => Object.assign({ ...acc, [next]: false }), {}),
        ...Object.keys(BloggingAchievements).reduce((acc, next) => Object.assign({ ...acc, [next]: false }), {}),
    },
};
