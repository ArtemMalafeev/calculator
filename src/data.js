export const buttons = [
  {
    view: '0',
    type: 'value',
    data: {
      value: '0',
    },
  },
  {
    view: '1',
    type: 'value',
    data: {
      value: '1',
    },
  },
  {
    view: '2',
    type: 'value',
    data: {
      value: '2',
    },
  },
  {
    view: '3',
    type: 'value',
    data: {
      value: '3',
    },
  },
  {
    view: '4',
    type: 'value',
    data: {
      value: '4',
    },
  },
  {
    view: '5',
    type: 'value',
    data: {
      value: '5',
    },
  },
  {
    view: '6',
    type: 'value',
    data: {
      value: '6',
    },
  },
  {
    view: '7',
    type: 'value',
    data: {
      value: '7',
    },
  },
  {
    view: '8',
    type: 'value',
    data: {
      value: '8',
    },
  },
  {
    view: '9',
    type: 'value',
    data: {
      value: '9',
    },
  },
  {
    view: '.',
    type: 'value',
    data: {
      value: '.',
    },
  },
  {
    view: '+',
    type: 'operator',
    data: {
      type: 'binary',
      func: (operand1, operand2) => operand1 + operand2,
    },
  },
  {
    view: '-',
    type: 'operator',
    data: {
      type: 'binary',
      func: (operand1, operand2) => operand1 - operand2,
    },
  },
  {
    view: '/',
    type: 'operator',
    data: {
      type: 'binary',
      func: (operand1, operand2) => operand1 / operand2,
    },
  },
  {
    view: 'X',
    type: 'operator',
    data: {
      type: 'binary',
      func: (operand1, operand2) => operand1 * operand2,
    },
  },
  {
    view: '%',
    type: 'operator',
    data: {
      type: 'unary',
      func: (operand) => operand / 100,
    },
  },
  {
    view: '+-',
    type: 'operator',
    data: {
      type: 'unary',
      func: (operand) => -operand,
    },
  },
];
