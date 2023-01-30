export const buttons = [
  { type: 'value', value: '0', view: '0', },
  { type: 'value', value: '1', view: '1', },
  { type: 'value', value: '2', view: '2', },
  { type: 'value', value: '3', view: '3', },
  { type: 'value', value: '4', view: '4', },
  { type: 'value', value: '5', view: '5', },
  { type: 'value', value: '6', view: '6', },
  { type: 'value', value: '7', view: '7', },
  { type: 'value', value: '8', view: '8', },
  { type: 'value', value: '9', view: '9', },
  { type: 'operator', operator: 'add', operatorType: 'binary', view: '+', },
  { type: 'operator', operator: 'subtract', operatorType: 'binary', view: '-', },
  { type: 'operator', operator: 'multiply', operatorType: 'binary', view: 'X', },
  { type: 'operator', operator: 'divide', operatorType: 'binary', view: '/', },
  { type: 'operator', operator: 'sign', operatorType: 'unary', view: '-+', },
  { type: 'operator', operator: 'percent', operatorType: 'unary', view: '%', },
  { type: 'clear', view: 'AC', },
  { type: 'calculate', view: '=', },
];

export const operations = {
  'add': (operand1, operand2) => operand1 + operand2,
  'subtract': (operand1, operand2) => operand1 - operand2,
  'multiply': (operand1, operand2) => operand1 * operand2,
  'divide': (operand1, operand2) => operand1 / operand2,
  'sign': (operand) => -1 * operand,
  'percent': (operand) => operand / 100,
};
