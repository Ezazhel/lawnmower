import { Neighboor } from '@core/models/neighboor';

export const Neighboors = {
    ['n1']: new Neighboor(
        'n1',
        'MowingTown',
        0,
        2,
        'Somewhere to start',
        `
        <p>
            Kenny, this is your hometown, daddy told you to go make some money.
            It's soon mom's day, mommy will be happy
        </p>
    `,
        5.0,
        8.5,
        0.0012,
    ),
    ['n2']: new Neighboor(
        'n2',
        'MowingTown 2',
        0,
        75,
        'Somewhere to continue',
        `<p>
            Wow ! Your daddy is impress by your performance ! 
            You still doesn't have enough money for your mommy...
        </p>
    `,
        8.0,
        10.5,
        0.0032,
    ),
};
