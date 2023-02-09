export const buttons = [
  { identificator: 'zero' },
  { identificator: 'one' },
  { identificator: 'two' },
  { identificator: 'three' },
  { identificator: 'five' },
  { identificator: 'six' },
  { identificator: 'seven' },
  { identificator: 'eight' },
  { identificator: 'add' },
  { identificator: 'subtract' },
  { identificator: 'divide' },
  { identificator: 'multiply' },
  { identificator: 'sign' },
  { identificator: 'procent' },
  { identificator: 'delete' },
  { identificator: 'calculate' },
];

export const views = {
  'zero': '0',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  'add': '+',
  'subtract': '-',
  'multiply': 'X',
  'divide': '/',
  'sign': '-/+',
  'procent': '%',
  'delete': 'C',
  'calculate': '=',
};

export const information = {
  'zero': { action: 'addValue', data: '0' },
  'one': { action: 'addValue', data: '1' },
  'two': { action: 'addValue', data: '2' },
  'three': { action: 'addValue', data: '3' },
  'four': { action: 'addValue', data: '4' },
  'five': { action: 'addValue', data: '5' },
  'six': { action: 'addValue', data: '6' },
  'seven': { action: 'addValue', data: '7' },
  'eight': { action: 'addValue', data: '8' },
  'nine': { action: 'addValue', data: '9' },
  'add': {
    action: 'addOperator',
    data: {
      type: 'binary',
      func: (operand1, operand2) => operand1 + operand2
    }
  },
  'subtract': {
    action: 'addOperator',
    data: {
      type: 'binary',
      func: (operand1, operand2) => operand1 - operand2
    }
  },
  'divide': {
    action: 'addOperator',
    data: {
      type: 'binary',
      func: (operand1, operand2) => operand1 / operand2
    }
  },
  'multiply': {
    action: 'addOperator',
    data: {
      type: 'binary',
      func: (operand1, operand2) => operand1 * operand2
    }
  },
  'sign': {
    action: 'addOperator',
    data: {
      type: 'unary',
      func: (operand) => -operand
    }
  },
  'procent': {
    action: 'addOperator',
    data: {
      type: 'unary',
      func: (operand) => operand / 100
    }
  },
};
