export const values = [
  { span: "0", value: 0 },
  { span: "1", value: 1 },
  { span: "2", value: 2 },
  { span: "3", value: 3 },
  { span: "4", value: 4 },
  { span: "5", value: 5 },
  { span: "6", value: 6 },
  { span: "7", value: 7 },
  { span: "8", value: 8 },
  { span: "9", value: 9 },
  { span: ".", value: '.' },
];

export const actions = [
  { span: "+", type: 'binary', action: (operand1, operand2) => operand1 + operand2 },
  { span: "-", type: 'binary', action: (operand1, operand2) => operand1 - operand2 },
  { span: "/", type: 'binary', action: (operand1, operand2) => operand1 / operand2 },
  { span: "X", type: 'binary', action: (operand1, operand2) => operand1 * operand2 },
  { span: "%", type: 'unary', action: (operand) => operand / 100 },
  { span: "+/-", type: 'unary', action: (operand) => -operand },
];
