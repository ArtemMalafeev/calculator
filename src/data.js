export const values = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
];

export const actions = {
  '+': { label: '+', func: (value1, value2) => value1 + value2 },
  '-': { label: '-', func: (value1, value2) => value1 - value2 },
  '/': { label: '/', func: (value1, value2) => value1 / value2 },
  'x': { label: 'x', func: (value1, value2) => value1 * value2 },
};

export const defaultState = {
  previous: 0,
  current: 0,
  operator: null,
  history: [],
};
