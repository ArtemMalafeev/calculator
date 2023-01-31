<template>
  <div class="info">
    <p>CurrentView: {{ getCurrentOperand }}</p>
    <hr>
    <p>Previous: {{ calculationData.operands.previous }}</p>
    <p>Current: {{ getCurrentOperand }}</p>
    <p>Operator: {{ calculationData.operator }}</p>
    <p>Event: {{ event }}</p>
    <p>History event: {{ historyEvent }}</p>
  </div>

  <hr>

  <div class="buttons">
    <calculator-button
      v-for="button in $options.buttons"
      :button="button"
      @handler="buttonHandler"
    />
  </div>
</template>

<script>
  import { buttons } from '../data.js';
  import CalculatorButton from './CalculatorButton.vue';

  export default {
    name: 'Calculator',

    components: {
      CalculatorButton,
    },

    buttons,

    data() {
      return {
        historyEvent: [],
        event: null,
        calculationData: {
          history: [],
          operator: null,
          operands: {
            previous: null,
            current: '0',
          },
        },
      };
    },

    computed: {
      getEvent() {
        return this.event;
      },

      getEventType() {
        return this.getEvent.type;
      },

      getEventData() {
        return this.getEvent.data;
      },

      getCurrentOperand() {
        return this.calculationData.operands.current;
      },

      getCurrentOperandLength() {
        return this.getCurrentOperand.length;
      },
    },

    methods: {
      buttonHandler(data) {
        this.updateEvent(data);
      },

      updateEvent(data) {
        this.event = { ...data };
      },

      currentOperandHandler(type, value) {
        switch(type) {
          case 'update': {
            this.updateCurrentOperand(value);
            break;
          }
          case 'assign':
          case 'reset': {
            this.assignCurrentOperand(value);
            break;
          }
        }
      },

      updateCurrentOperand(value) {
        if (this.getCurrentOperandLength === 1 && this.getCurrentOperand.at(0) === '0' && value !== '.') {
          this.assignCurrentOperand(value);
        } else {
          const separator = '';
          const regularExpression = /^-?0{1}(\.{1}[0-9]*)?$|^-?[1-9]{1}[0-9]*$|^-?[1-9]{1}[0-9]*(\.{1}[0-9]*)?$/;
          const expression = [this.getCurrentOperand, value].join(separator);
          const isValidExpression = regularExpression.test(expression);

          this.calculationData.operands.current = isValidExpression
            ? expression
            : this.getCurrentOperand;
        }
      },

      assignCurrentOperand(value) {
        this.calculationData.operands.current = value;
      },

      // -------

      // checkCorrectOperand(value) {

      // },

      // reg: /[0-9]+/

      // ----

      // updateOperand(value) {
      //   const separator = '';
      //   const number = parseFloat([this.getCurrentOperand, value].join(separator));
      //   this.calculationData.operands.current = number;
      // },

      updateOperator(data) {
        this.calculationData.operator = { ...data };
      },

      updatePreviousOperand(value) {
        this.calculationData.operands.previous = value;
      },

      // updateCurrentOperand(value) {
      //   this.calculationData.operands.current = value;
      // },

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
      event() {
        switch(this.getEventType) {
          case 'value': {
            this.currentOperandHandler('update', this.getEventData.value);
            break;
          }

          case 'operator': {
            this.operatorHandler({
              type: this.getEventData.type,
              func: this.getEventData.func,
            });
            break;
          }

          case 'clear': {
            // this.clear();
            break;
          }

          case 'calculate': {
            // this.calculate();
            // this.resetOperator();
            // this.resetAction();
            // this.resetPreviousOperand();
            break;
          }
        }
      },

      // 'calculationData.operator'(newOperator, oldOperator) {
      //   if (newOperator.type === null) {
      //     return;
      //   } else {
      //     if (newOperator.type === 'binary') {
      //     this.updatePreviousOperand(this.getCurrentOperand);
      //     this.resetCurrentOperand();
          // this.updateHistoryAction('saveOperand');
          // this.updateHistoryAction('saveOperator');
          // }}
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
      // },
    },
  }
</script>
