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

      operandsHandler(type, value='0') {
        switch(type) {
          case 'update': {
            this.updateOperand(value);
            break;
          }
          case 'assign':
          case 'reset': {
            this.assignOperand(value);
            break;
          }
        }
      },

      updateOperand(value) {
        if (this.getCurrentOperandLength === 1 && this.getCurrentOperand.at(0) === '0' && value !== '.') {
          this.assignOperand(value);
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

      assignOperand(value) {
        this.calculationData.operands.current = value;
      },

      // operatorHandler(type, func) {
      //   switch(type) {
      //     case 'binary': {
      //       this.updatePreviousOperand();
      //       this.currentOperandHandler('reset');
      //       break;
      //     }
      //     case 'unary': {
      //       break;
      //     }
      //   }
      // },
    },

    watch: {
      event() {
        switch(this.getEventType) {
          case 'value': {
            this.operandsHandler('update', this.getEventData.value);
            break;
          }

          case 'operator': {
            this.operatorHandler(this.getEventData.type, this.getEventData.func);
            break;
          }

          case 'clear': {
            break;
          }

          case 'calculate': {
            break;
          }
        }
      },
    },
  }
</script>
