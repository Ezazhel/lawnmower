import { CreationPoint, Idea } from '@core/models/Currencies';
import { CreationUpgrade } from '@core/models/Upgrade/CreationUpgrade';
import { Upgrade } from '@core/models/Upgrade/Upgrade';
import { UpgradeFeature } from '@core/models/Upgrade/UpgradeFeature';
import { UpgradeOneTimeBuy } from '@core/models/Upgrade/UpgradeOneTimeBuy';
import { UpgradeBonusByLevel } from '@core/models/Upgrade/UpgradeWithLevel';
import { NotifierService } from '@core/services/notifier.service';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'app/root-store';
import { canBuyBook, unlockBook } from 'app/root-store/blogging/blogging-action';
import { earnCurrency, canPayDollarForIdea } from 'app/root-store/earning/earning-action';
import { activateSubroute } from 'app/root-store/route/route-action';
import { Books } from './book-data';
import { routes } from './route-data';

export const MowingUpgrade = {
    ['sharpen']: new UpgradeBonusByLevel(
        'sharpen',
        'Sharpen blade',
        'mowing',
        'Sharp blade will cut grass faster',
        'You cut grass 5% faster per level',
        'speed',
        'Multiplicative',
        '$',
        5,
        (): number => 1.05,
        () => ({ base: 0.0425, pow: 1.2 }),

        (state: RootStoreState.State) => state.stats.totalMoney >= 0.01,
    ),
    ['rich-grass']: new UpgradeOneTimeBuy(
        'rich-grass',
        'Rich grass',
        'mowing',
        'It seems that your neighboor money come from their grasses !',
        '25% more money from cutting grass',
        'gain',
        'Multiplicative',
        '$',
        (): number => 1.25,
        () => ({ base: 0.15 }),
        (state: RootStoreState.State) => state.stats.totalMowned >= 6,
    ),
    ['anti-fertilizer']: new UpgradeBonusByLevel(
        'anti-fertilizer',
        'Anti Fertilizer',
        'mowing',
        'What if you spray something on the grass ?',
        'Grass regrow 5% slower',
        'regrow',
        'Multiplicative',
        '$',
        5,
        (): number => 1.05,
        () => ({ base: 0.15, pow: 1.6 }),
        (state: RootStoreState.State) => state.stats.totalMowned >= 8,
    ),
    ['robot']: new UpgradeOneTimeBuy(
        'robot',
        'Robot',
        'mowing',
        'Hello there',
        'You can cut one more grass before needing to click',
        'cuttingLimit',
        'Feature',
        '$',
        () => 1,
        () => ({ base: 0.3 }),
    ),
    ['flower']: new UpgradeFeature(
        'flower',
        'Flower',
        'mowing',
        'For mommy',
        'Unlock the blog !',
        'feature',
        'Feature',
        '$',
        () => 3,
        (store: Store<RootStoreState.State>) => {
            store.dispatch(activateSubroute({ mainRoute: routes['earning'], subRoute: routes['earning'].subPath[1] }));
        },
    ),
};

export const BloggingUpgrade = {
    ['paper_pencils']: new UpgradeFeature(
        'paper_pencils',
        'Paper & Pencils',
        'blogging',
        'What should you do with paper and pencil ? Draw !',
        'Unlock creativity !',
        'feature',
        'Feature',
        'Idea',
        () => 3,
        (store: Store<RootStoreState.State>) => {
            store.dispatch(earnCurrency({ currency: { ...new CreationPoint() } }));
        },
        (state: RootStoreState.State) => state.stats.totalIdea > 1,
    ),
    ['ideas']: new UpgradeFeature(
        'ideas',
        'Ideas !',
        'blogging',
        'Ok smartass',
        'Unlock ideas',
        'feature',
        'Feature',
        'I',
        () => 0.2,
        (store: Store<RootStoreState.State>) => store.dispatch(earnCurrency({ currency: { ...new Idea() } })),
    ),
    ['handy']: new UpgradeOneTimeBuy(
        'handy',
        'Lefty or Righty ?',
        'blogging',
        "It's time to know Kenny...!",
        '50% more imagination gain !',
        'imaginationGain',
        'Multiplicative',
        'C',
        () => 1.5,
        () => ({ base: 3 }),
    ),
    ['genius']: new UpgradeFeature(
        'genius',
        'How to become a genius',
        'blogging',
        'You shall find a book',
        'Unlock a book',
        'feature',
        'Feature',
        'Idea',
        () => 3,
        (store: Store<RootStoreState.State>, notifier: NotifierService) => {
            store.dispatch(unlockBook({ book: Books.genius }));
            notifier.pushMessage(`Unlocked : ${Books.genius.name} `);
        },
        (state: RootStoreState.State) => state.stats.totalIdea >= 5,
    ),
    ['money_activity']: new UpgradeFeature(
        'money_activity',
        'Passion',
        'blogging',
        "Passion cost money, but you'll have more idea",
        'You can pay money to get Ideas',
        'feature',
        'Feature',
        '$',
        () => 10,
        (store: Store<RootStoreState.State>, notifier: NotifierService) => {
            store.dispatch(canPayDollarForIdea());
            notifier.pushMessage('New feature unlocked !');
        },
        (state: RootStoreState.State) => state.earning.currencies['$'].amount > 6 && state.stats.totalIdea > 0,
    ),
    ['librarian']: new UpgradeFeature(
        'librarian',
        'Librarian',
        'blogging',
        'Go to librarian',
        'you can buy book',
        'feature',
        'Feature',
        'Idea',
        () => 5,
        (store: Store<RootStoreState.State>, notifier: NotifierService) => {
            store.dispatch(canBuyBook());
            notifier.pushMessage('New feature unlocked');
        },
        (state: RootStoreState.State) => state.earning.currencies['Idea']?.amount > 4,
    ),
};

export const CreateUpgrade = {
    ['cortex']: new CreationUpgrade('cortex', 'Additive', 'IdeaLimit', 5, (level) => level),
    ['board']: new CreationUpgrade('board', 'Additive', 'CreationGain', 2, (level) => level),
    ['poster']: new CreationUpgrade('poster', 'Multiplicative', 'IdeaGain', 2, (level) => 0.5 / level),
};
