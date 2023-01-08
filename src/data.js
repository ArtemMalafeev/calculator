export const actions = {
  '+': { action: (operand1, operand2) => operand1 + operand2, type: 'binary' },
  '-': { action: (operand1, operand2) => operand1 - operand2, type: 'binary' },
  '/': { action: (operand1, operand2) => operand1 / operand2, type: 'binary' },
  'X': { action: (operand1, operand2) => operand1 * operand2, type: 'binary' },
  '%': { action: (operand) => operand / 100, type: 'unary' },
  '+/-': { action: (operand) => -operand, type: 'unary' },
  '=': { action: (fn) => fn, type: 'finall' },
};
