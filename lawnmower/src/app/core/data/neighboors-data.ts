import { Neighboor } from '@core/models/neighboor';

export const Neighboors: Neighboor[] = [
    new Neighboor(
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
        5.0 * 1000,
        8.0 * 1000,
        0.0012,
    ),
    new Neighboor(
        'MowingTown 2',
        0,
        1000,
        'Somewhere to continue',
        `<p>
        Second neighborhood, more neighboor, slow cleaning, average income
        income per neighbors : 0.0050$
        </p>
    `,
        3.0 * 1000,
        100,
        10.0 * 1000,
    ),
];
