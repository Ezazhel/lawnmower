import { RootStoreState } from 'app/root-store';
import { Achievement } from '../models/achievement';
import { Neighboors } from './neighboors-data';
import { Store } from '@ngrx/store';
import { activateSubroute } from '../../root-store/route/route-action';
import { routes } from './route-data';
import { addMowingUpgradeAction, unlockMowingUpgradeAction } from 'app/root-store/upgrades/upgrades-action';
import { MowingUpgrade } from './upgrade-data';

export const Achievements = {
    ['a1']: new Achievement(
        'a1',
        'Small fortune',
        'Have a dollar on you',
        'goal',
        (state: RootStoreState.State) => state.earning.money >= 1,
        null,
    ),
    ['a2']: new Achievement(
        'a2',
        'Little worker',
        'Have a town with more than 10 freshly cut plot',
        'goal',
        (state: RootStoreState.State) => Object.values(state.neighboor.completions).some((c) => c > 10),
        null,
    ),
    ['a3']: new Achievement(
        'a3',
        'Small steps, big profit',
        'Earn twenty total dollar in total. Wow ! Little Kenny is rich !',
        'feature',
        (state: RootStoreState.State) => state.stats.totalMoney > 20,
        (store: Store<RootStoreState.State>) => {
            store.dispatch(activateSubroute({ mainRoute: routes['earning'], subRoute: routes['earning'].subPath[1] }));
        },
    ),
    ['a4']: new Achievement(
        'a4',
        'Cutting grasses suck',
        'Cut 20 plot in total',
        'feature',
        (state: RootStoreState.State) => state.stats.totalMowned >= 2,
        (store: Store<RootStoreState.State>) => {
            store.dispatch(addMowingUpgradeAction({id: MowingUpgrade.robot.id}))
        }
    ),
    ['a5']: new Achievement(
        'a5',
        'One down',
        'Complete the first town !',
        'feature',
        (state: RootStoreState.State) => state.neighboor.completions[Neighboors.n1.id] == Neighboors.n1.maxCompletion,
        () => {
            console.log('unlock a shop to buy part for your machine');
        },
    ),
};
