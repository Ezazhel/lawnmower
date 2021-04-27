import { Creation, Idea } from '@core/models/currency';
import { Upgrade } from '@core/models/upgrade';
import { NotifierService } from '@core/services/notifier.service';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { unlockBook } from 'app/root-store/blogging/blogging-action';
import { earnCurrency, canPayDollarForIdea } from 'app/root-store/earning/earning-action';
import { activateSubroute } from 'app/root-store/route/route-action';
import { Books } from './book-data';

import { routes } from './route-data';

export const MowingUpgrade = {
    ['sharpen']: new Upgrade(
        'sharpen',
        'Sharpen blade',
        (level) => 0.0425 * Math.pow(1.2, level),
        'mowing',
        'Sharp blade will cut grass faster',
        0,
        5,
        'You cut grass 5% faster per level',
        'speed',
        (level: number): number => Math.pow(1.05, level),
        '$',
        (state: RootStoreState.State) => state.stats.totalMoney >= 0.01,
    ),
    ['rich-grass']: new Upgrade(
        'rich-grass',
        'Rich grass',
        () => 0.1,
        'mowing',
        'It seems that your neighboor money come from their grasses !',
        0,
        1,
        '15% more money from cutting grass',
        'gain',
        (): number => 1.15,
        '$',
        (state: RootStoreState.State) => state.stats.totalMowned >= 4,
    ),
    ['anti-fertilizer']: new Upgrade(
        'anti-fertilizer',
        'Anti Fertilizer',
        (level) => 0.15 * Math.pow(1.6, level),
        'mowing',
        'What if you spray something on the grass ?',
        0,
        3,
        'Grass regrow 5% slower',
        'regrow',
        (level: number): number => Math.pow(1.05, level),
        '$',
        (state: RootStoreState.State) => state.stats.totalMowned >= 8,
    ),
    ['robot']: new Upgrade(
        'robot',
        'Robot',
        () => 0.3,
        'mowing',
        'Hello there',
        0,
        1,
        'You can cut one more grass before needing to click',
        'cuttingLimit',
        () => 1,
    ),
    ['flower']: new Upgrade(
        'flower',
        'Flower',
        () => 3,
        'mowing',
        'For mommy',
        0,
        1,
        'Unlock the blog !',
        'feature',
        (store: Store<RootStoreState.State>) => {
            store.dispatch(activateSubroute({ mainRoute: routes['earning'], subRoute: routes['earning'].subPath[1] }));
        },
    ),
};

export const BloggingUpgrade = {
    ['paper_pencils']: new Upgrade(
        'paper_pencils',
        'Paper & Pencils',
        () => 2.5,
        'blogging',
        'What should you do with paper and pencil ? Draw !',
        0,
        1,
        'Unlock creativity !',
        'feature',
        (store: Store<RootStoreState.State>) => {
            store.dispatch(earnCurrency({ currency: { ...new Creation() } }));
        },
        'I',
        (state: RootStoreState.State) => state.stats.totalIdea > 3,
    ),
    ['ideas']: new Upgrade(
        'ideas',
        'Ideas !',
        () => 0.2,
        'blogging',
        'Ok ok, you think a lot',
        0,
        1,
        'Unlock ideas',
        'feature',
        (store: Store<RootStoreState.State>) => store.dispatch(earnCurrency({ currency: { ...new Idea() } })),
        'I',
    ),
    ['handy']: new Upgrade(
        'handy',
        'Lefty or Righty ?',
        () => 3,
        'blogging',
        "It's time to know Kenny...!",
        0,
        1,
        '50% more imagination gain !',
        'imaginationGain',
        (imagination: number) => imagination * 1.5,
        'C',
    ),
    ['genius']: new Upgrade(
        'genius',
        'How to become a genius',
        () => 5,
        'blogging',
        'You shall find a book',
        1,
        1,
        'Unlock a book',
        'feature',
        (store: Store<RootStoreState.State>, notifier: NotifierService) => {
            store.dispatch(unlockBook({ book: Books.genius }));
            notifier.pushMessage(`Unlocked : ${Books.genius.name} `);
        },
        'Idea',
        (state: RootStoreState.State) => state.stats.totalIdea >= 5,
    ),
    ['money_activity']: new Upgrade(
        'money_activity',
        'Passion',
        () => 15,
        'blogging',
        "Passion cost money, but you'll have more idea",
        0,
        1,
        'You can pay money to get Ideas',
        'feature',
        (store: Store<RootStoreState.State>, notifier: NotifierService) => {
            store.dispatch(canPayDollarForIdea()), notifier.pushMessage('New feature unlocked !');
        },
        '$',
        (state: RootStoreState.State) => state.earning.currencies['$'].amount > 10,
    ),
};
