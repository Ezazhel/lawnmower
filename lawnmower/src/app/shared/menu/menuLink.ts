export const menuLink = [
  {
    label: 'Earning',
    singleSymbol: '$',
    path: 'earning',
    index: 1,
    subPath: [
      { label: 'Mowing', singleSymbol: 'M', path: 'mowing', index: 1.1 },
      { label: 'Blogging', singleSymbol: 'B', path: 'blogging', index: 1.2 },
    ],
  },
  {
    label: 'Upgrades',
    singleSymbol: 'U',
    path: 'upgrades',
    index: 2,
    subPath: [
      { label: 'Mowing', singleSymbol: 'M', path: 'mowing', index: 2.1 },
    ],
  },
  { label: 'Achievements', singleSymbol: 'A', path: 'achievements', index: 3 },
  { label: 'Statistics', singleSymbol: 'S', path: 'stats', index: 4 },
];
