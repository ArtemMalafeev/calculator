<template>
  <div class="info">
    <p>Previous: {{ getPreviousOperand }}</p>
    <p>Current: {{ getCurrentOperand }}</p>
    <p>Operator: {{ getOperator }}</p>
    <p>Action: {{ getAction }}</p>
    <p>State: {{ getState }}</p>
  </div>

  <hr>

  <div class="values">
    <button @click="handleAction" data-action-type="value" data-value="0">0</button>
    <button @click="handleAction" data-action-type="value" data-value="1">1</button>
    <button @click="handleAction" data-action-type="value" data-value="2">2</button>
    <button @click="handleAction" data-action-type="value" data-value="3">3</button>
    <button @click="handleAction" data-action-type="value" data-value="4">4</button>
    <button @click="handleAction" data-action-type="value" data-value="5">5</button>
    <button @click="handleAction" data-action-type="value" data-value="6">6</button>
    <button @click="handleAction" data-action-type="value" data-value="7">7</button>
    <button @click="handleAction" data-action-type="value" data-value="8">8</button>
    <button @click="handleAction" data-action-type="value" data-value="9">9</button>
    <button @click="handleAction" data-action-type="value" data-value=".">.</button>
  </div>

  <hr>

  <div class="operators">
    <button @click="handleAction" data-action-type="operator" data-type="binary" data-operator="add">+</button>
    <button @click="handleAction" data-action-type="operator" data-type="binary" data-operator="subtract">-</button>
    <button @click="handleAction" data-action-type="operator" data-type="binary" data-operator="multiply">X</button>
    <button @click="handleAction" data-action-type="operator" data-type="binary" data-operator="divide">/</button>
    <button @click="handleAction" data-action-type="operator" data-type="unary" data-operator="sign">+/-</button>
    <button @click="handleAction" data-action-type="operator" data-type="unary" data-operator="percent">%</button>
  </div>

  <hr>

  <div class="action">
    <button @click="handleAction" data-action-type="clear">AC</button>
    <button @click="handleAction" data-action-type="calculate">=</button>
  </div>
</template>

<script>
import { operations } from '../data';

  export default {
    name: 'Calculator',

    data() {
      return {
        state: 'default',
        action: null,
        calculationData: {
          history: [],
          operator: null,
          operands: {
            previous: null,
            current: 0,
          },
        },
      };
    },

    computed: {
      getCurrentOperand() {
        return this.calculationData.operands.current;
      },

      getPreviousOperand() {
        return this.calculationData.operands.previous;
      },

      getOperator() {
        return this.calculationData.operator;
      },

      getHistory() {
        return this.calculationData.history;
      },

      getAction() {
        return this.action;
      },

      getActionType() {
        return this.getAction?.actionType;
      },

      getActionValue() {
        return this.getAction?.value;
      },

      getActionOperatorType() {
        return this.getAction?.type;
      },

      getActionOperator() {
        return this.getAction?.operator;
      },

      getState() {
        return this.state;
      },
    },

    methods: {
      handleAction({ target }) {
        this.action = { ...target.dataset };
      },

      updateOperand(value) {
        const separator = '';
        const number = parseFloat([this.getCurrentOperand, value].join(separator));
        this.calculationData.operands.current = number;
      },

      updatePreviousOperand(value) {
        this.calculationData.operands.previous = value;
      },

      resetCurrentOperand() {
        this.calculationData.operands.current = 0;
      },

      resetPreviousOperand() {
        this.calculationData.operands.previous = 0;
      },

      resetOperator() {
        this.calculationData.operator = null;
      },

      resetAction() {
        this.action = null;
      },

      updateOperator(value) {
        this.calculationData.operator = { ...value };
      },

      calculate() {
        const type = this.getOperator.type;
        const operator = this.getOperator.operator;
        const operation = operations[operator];

        if (type === 'unary') {
          this.calculationData.operands.current = operation(this.getCurrentOperand);
        }

        if (type === 'binary') {
          this.calculationData.operands.current = operation(this.getPreviousOperand, this.getCurrentOperand);
        }
      },
    },

    watch: {
      action() {
        switch(this.getActionType) {
          case 'value': {
            // this.state = 'updateOperand';
            // this.validateValue();
            this.updateOperand(this.getActionValue);
            break;
          }

          case 'operator': {
            this.updateOperator({
              type: this.getActionOperatorType,
              operator: this.getActionOperator
            });
            break;
          }

          case 'calculate': {
            this.calculate();
            this.resetOperator();
            this.resetPreviousOperand();
            this.resetAction();
            break;
          }

          default: {
            this.state = 'processing';
          }
        }
      },

      'calculationData.operator'(newOperator, oldOperator) {
        if (newOperator === null) {
          return;
        }

        if (newOperator.type === 'binary') {
          if (oldOperator === null || oldOperator.type === 'unary') {
            this.updatePreviousOperand(this.getCurrentOperand);
            this.resetCurrentOperand();
          }
        }

        if (newOperator.type === 'unary') {
          this.calculate();
        }
      },
    },
  }
</script>
