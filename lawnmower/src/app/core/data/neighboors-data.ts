import { Neighboor } from '@core/models/neighboor';

export const Neighboors = {
    ['n1']: new Neighboor(
        'n1',
        'MowingTown',
        0,
        100,
        'Somewhere to start',
        `
      <p>
        First neighborhood, easy cleaning, slow income
        income per neighbors : 0.0012$
        </p>
    `,
        5.0,
        8.0,
        0.0012,
    ),
    ['n2']: new Neighboor(
        'n2',
        'MowingTown 2',
        0,
        1000,
        'Somewhere to continue',
        `<p>
        Second neighborhood, more neighboor, slow cleaning, average income
        income per neighbors : 0.0050$
        </p>
    `,
        3.0,
        10.0,
        0.005,
    ),
};
