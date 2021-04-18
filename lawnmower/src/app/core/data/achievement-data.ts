import { RootStoreState } from 'app/root-store';
import { Achievement } from '../models/achievement';
import { Neighboors } from './neighboors-data';
import { Store } from '@ngrx/store';
import { addBloggingUpgradeAction, addMowingUpgradeAction } from 'app/root-store/upgrades/upgrades-action';
import { BloggingUpgrade, MowingUpgrade } from './upgrade-data';
import { addAchievements } from 'app/root-store/achievements/achievements-action';

export const MowingAchievements = {
    ['ma1']: new Achievement(
        'ma1',
        'Small fortune',
        'Have a dollar on you',
        'goal',
        (state: RootStoreState.State) => state.earning.currencies['$'].amount >= 1,
        null,
    ),
    ['ma2']: new Achievement(
        'ma2',
        'Little worker',
        'Have a town with more than 10 freshly cut plot',
        'goal',
        (state: RootStoreState.State) => Object.values(state.neighboor.neighboors).some((c) => c.completion > 10),
        null,
    ),
    ['ma3']: new Achievement(
        'ma3',
        'Small steps, big profit',
        'Earn twenty dollar in total. Wow ! Little Kenny is rich !',
        'feature',
        (state: RootStoreState.State) => state.stats.totalMoney > 20,
        (store: Store<RootStoreState.State>) => {
            //that achievement will unlock shop
            //store.dispatch(activateSubroute({ mainRoute: routes['earning'], subRoute: routes['earning'].subPath[1] }));
        },
    ),
    ['ma4']: new Achievement(
        'ma4',
        'Cutting grasses suck',
        'Cut 20 plot in total',
        'feature',
        (state: RootStoreState.State) => state.stats.totalMowned >= 20,
        (store: Store<RootStoreState.State>) => {
            store.dispatch(addMowingUpgradeAction({ id: MowingUpgrade.robot.id }));
        },
    ),
    ['ma5']: new Achievement(
        'ma5',
        'One down',
        'Complete the first town !',
        'feature',
        (state: RootStoreState.State) => state.neighboor.neighboors[Neighboors.n1.id].completedOnce,
        (store: Store<RootStoreState.State>) => {
            store.dispatch(addMowingUpgradeAction({ id: MowingUpgrade.flower.id }));
            store.dispatch(addAchievements({ Achievements: BloggingAchievements }));
        },
    ),
};

export const BloggingAchievements = {
    ['ba1']: new Achievement(
        'ba1',
        'Ads are bad but...',
        "You'll get rich faster",
        'goal',
        (state: RootStoreState.State) => state.blogging.blogging.adsRevenu > 0,
        null,
    ),
    ['ba2']: new Achievement(
        'ba2',
        'Every kind of post',
        'Here come the spam...',
        'goal',
        (state: RootStoreState.State) => {
            const post = state.blogging.blogging.post;
            return post.message > 0 && post.picture > 0 && post.topic > 0 && post.video > 0;
        },
        null,
    ),
    ['ba3']: new Achievement(
        'ba3',
        'Not that creative',
        "Every thing need practice and 10 failed creation isn't that bad",
        'feature',
        (state: RootStoreState.State) => state.stats.totalFailedCreation > 10,
        (store: Store<RootStoreState.State>) => {
            store.dispatch(addBloggingUpgradeAction({ id: BloggingUpgrade['book-worm'].id }));
        },
    ),
};
