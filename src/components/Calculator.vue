<template>
  <div class="info">
    <p>CurrentView: {{ getCurrentOperand }}</p>
    <hr>
    <p>Previous: {{ getPreviousOperand }}</p>
    <p>Current: {{ getCurrentOperand }}</p>
    <p>Operator: {{ getOperator }}</p>
    <p>Action: {{ getAction }}</p>
    <p>HistoryAction: {{ getHistoryAction }}</p>
  </div>

  <hr>

  <div class="buttons">
    <button @click="updateAction(button)" v-for="button in $options.buttons">
      {{ button.view }}
    </button>
  </div>
</template>

<script>
import { operations, buttons } from '../data';

  export default {
    name: 'Calculator',

    buttons,
    operations,

    data() {
      return {
        historyAction: [],
        action: null,
        calculationData: {
          history: [],
          operator: null,
          operands: {
            previous: 0,
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
        return this.getAction?.type;
      },

      getActionValue() {
        return this.getAction?.value;
      },

      getActionOperatorType() {
        return this.getAction?.operatorType;
      },

      getActionOperator() {
        return this.getAction?.operator;
      },

      getState() {
        return this.state;
      },

      getHistoryAction() {
        return this.historyAction;
      },

      isEmptyHistoryAction() {
        return !this.getHistoryAction.length;
      },

      operatorIsActive() {
        return !!this.calculationData.operator;
      }
    },

    methods: {
      updateAction(button) {
        this.action = { ...button };
      },

      updateOperand(value) {
        const separator = '';
        const number = parseFloat([this.getCurrentOperand, value].join(separator));
        this.calculationData.operands.current = number;
      },

      updateOperator(data) {
        this.calculationData.operator = { ...data };
      },

      updatePreviousOperand(value) {
        this.calculationData.operands.previous = value;
      },

      updateCurrentOperand(value) {
        this.calculationData.operands.current = value;
      },

      updateHistoryAction(value) {
        if (this.isEmptyHistoryAction) {
          this.historyAction.push(value);
        } else {
          const lastAction = this.getHistoryAction.at(-1);
          console.log(value, lastAction);
          if (value !== lastAction) {
            this.historyAction.push(value);
          }
        }
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

      clear() {
        if (this.isEmptyHistoryAction) {
          console.log('Калькулятор очищен');
        } else {
          const lastAction = this.getHistoryAction.at(-1);
          if (lastAction === 'updateOperand') {
            this.resetCurrentOperand();
          }

          if (lastAction === 'updateOperator') {
            this.resetOperator();
            this.calculationData.operands.current = this.getPreviousOperand;
            this.resetPreviousOperand();
          }

          this.historyAction.pop();
        }
      },

      calculate() {
        if (this.getOperator === null) {
          alert('Выберите оператор!');
          return;
        }

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
            this.updateOperand(this.getActionValue);
            this.updateHistoryAction('updateOperand');
            break;
          }

          case 'operator': {
            this.updateOperator({
              type: this.getActionOperatorType,
              operator: this.getActionOperator
            });
            this.updateHistoryAction('updateOperator');
            break;
          }

          case 'clear': {
            this.clear();
            break;
          }

          case 'calculate': {
            this.calculate();
            this.resetOperator();
            this.resetAction();
            this.resetPreviousOperand();
            break;
          }
        }
      },

      'calculationData.operator'(newOperator, oldOperator) {
        if (newOperator.type === null) {
          return;
        } else {
          if (newOperator.type === 'binary') {
          this.updatePreviousOperand(this.getCurrentOperand);
          this.resetCurrentOperand();
          // this.updateHistoryAction('saveOperand');
          // this.updateHistoryAction('saveOperator');
          }
        }
        // if (newOperator === null) {
        //   console.log('-');
        //   return;
        // }

        // if (newOperator.type === 'binary') {
        //   if (oldOperator === null || oldOperator.type === 'unary') {
        //     console.log('=');
        //     this.updatePreviousOperand(this.getCurrentOperand);
        //     this.resetCurrentOperand();
        //   }
        // }

        // if (newOperator.type === 'unary') {
        //   this.calculate();
        //   this.resetOperator();
        //   this.resetAction();
        //   this.resetPreviousOperand();
        // }
      },
    },
  }
</script>
