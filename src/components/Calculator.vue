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
    <button @click="updateAction" data-action-type="value" data-value="0">0</button>
    <button @click="updateAction" data-action-type="value" data-value="1">1</button>
    <button @click="updateAction" data-action-type="value" data-value="2">2</button>
    <button @click="updateAction" data-action-type="value" data-value="3">3</button>
    <button @click="updateAction" data-action-type="value" data-value="4">4</button>
    <button @click="updateAction" data-action-type="value" data-value="5">5</button>
    <button @click="updateAction" data-action-type="value" data-value="6">6</button>
    <button @click="updateAction" data-action-type="value" data-value="7">7</button>
    <button @click="updateAction" data-action-type="value" data-value="8">8</button>
    <button @click="updateAction" data-action-type="value" data-value="9">9</button>
    <button @click="updateAction" data-action-type="value" data-value=".">.</button>
  </div>

  <hr>

  <div class="operators">
    <button @click="updateAction" data-action-type="operator" data-type="binary" data-operator="add">+</button>
    <button @click="updateAction" data-action-type="operator" data-type="binary" data-operator="subtract">-</button>
    <button @click="updateAction" data-action-type="operator" data-type="binary" data-operator="multiply">X</button>
    <button @click="updateAction" data-action-type="operator" data-type="binary" data-operator="divide">/</button>
    <button @click="updateAction" data-action-type="operator" data-type="unary" data-operator="sign">+/-</button>
    <button @click="updateAction" data-action-type="operator" data-type="unary" data-operator="percent">%</button>
  </div>

  <hr>

  <div class="action">
    <button @click="updateAction" data-action-type="clear">AC</button>
    <button @click="updateAction" data-action-type="calculate">=</button>
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

      getState() {
        return this.state;
      },
    },

    methods: {
      updateAction({ target }) {
        this.action = { ...target.dataset };
      },

      updateCurrentOperand({ value }) {
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

      resetAction() {
        this.action = null;
      },

      updateOperator(value) {
        this.calculationData.operator = { ...value };
      },

      calculate() {
        const operation = operations[this.getOperator];
        this.calculationData.operands.current = operation(this.getPreviousOperand, this.getCurrentOperand);
      },
    },

    watch: {
      action() {
        switch(this.getActionType) {
          case 'value': {
            this.updateCurrentOperand(this.getAction);
            break;
          }

          case 'operator': {
            this.updateOperator(this.getAction);
            break;
          }

          // case 'operator': {
          //   if (this.getActionOperatorType === 'binary') {
          //     console.log('binary');
          //   }

          //   if (this.getActionOperatorType === 'unary') {
          //     console.log('unary');
          //   }

          //   break;
          // }

          // case 'unaryOperator': {
          //   this.updateOperator(action.operator);
          //   this.calculate();
          //   break;
          // }

          // case 'binaryOperator': {
          //   this.updateOperator(action.operator);
          //   this.updatePreviousOperand(this.getCurrentOperand);
          //   this.resetCurrentOperand();
          //   break;
          // }

          // case 'clear': {
          //   // this.clear();
          //   break;
          // }

          // case 'calculate': {
          //   this.calculate();
          //   break;
          // }
        }

        this.resetAction();
      },
    },
  }
</script>
