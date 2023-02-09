<template>
  <div class="info">
    <hr>
    <p>Primary operand: {{ getPrimaryOperand }}</p>
    <p>Secondary operand: {{ getSecondaryOperand }}</p>
    <p>Event: {{ getEvent }}</p>
  </div>

  <hr>

  <div class="buttons">
    <calculator-button
      v-for="{ identificator, action } in $options.buttons"
      :identificator="identificator"
      @handler="clickHandler(identificator, action)"
    />
  </div>
</template>

<script>
  import { buttons, information } from '../data.js';
  import CalculatorButton from './CalculatorButton.vue';

  export default {
    name: 'Calculator',

    components: {
      CalculatorButton,
    },

    buttons,
    information,

    data() {
      return {
        event: null,
        operator: null,
        operands: {
          primary: '0',
          secondary: null,
        },
      };
    },

    computed: {
      getEvent() {
        return this.event;
      },

      getOperands() {
        return this.operands;
      },

      getEventType() {
        return this.getEvent.type;
      },

      getEventData() {
        return this.getEvent.data;
      },

      getPrimaryOperand() {
        return this.getOperands.primary;
      },

      getPrimaryOperandLength() {
        return this.getPrimaryOperand.length;
      },

      getSecondaryOperand() {
        return this.getOperands.secondary;
      },
    },

    methods: {
      clickHandler(identificator, action) {
        this.eventUpdate({ identificator, action });
      },

      eventUpdate(eventData) {
        this.event = { ...eventData };
      },

      operatorHandler(type, func) {
        switch(type) {
          case 'binary': {
            this.operandHandler('assign', 'previous', this.getCurrentOperand);
            this.operandHandler('reset', 'current');
            break;
          }
          case 'unary': {
            break;
          }
        }
      },

      updatePrimaryOperand(value) {
        const newOperand = this.isStartValue(value) ? value : this.createNewOperand(value);
        if (this.isValidOperand(newOperand)) {
          this.assignPrimaryOperand(newOperand);
        }
        // else push and show error
      },

      createNewOperand(value) {
        const separator = '';

        return [this.getPrimaryOperand, value].join(separator);
      },

      isStartValue(value) {
        return this.getPrimaryOperandLength === 1 && this.getPrimaryOperand.at(0) === '0' && value !== '.';
      },

      isValidOperand(operand) {
        const regExp = /^-?0{1}(\.{1}[0-9]*)?$|^-?[1-9]{1}[0-9]*$|^-?[1-9]{1}[0-9]*(\.{1}[0-9]*)?$/;

        return regExp.test(operand);
      },

      assignPrimaryOperand(value) {
        this.operands.primary = value;
      },

      assignSecondaryOperand(value) {
        this.operands.secondary = value;
      },
    },

    watch: {
      event() {
        switch(this.getEventType) {
          case 'value': {
            const { value } = this.getEventData;
            this.updatePrimaryOperand(value);
            break;
          }

          case 'operator': {
            const { type, func } = this.getEventData;
            this.updateOperator(type, func);
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

      'operands.primary'(newOperand, oldOperand) {
        if (!this.isValidOperand(newOperand)) {
          this.operands.primary = oldOperand;
          console.log('Вставлен недопустимый операнд');
        }
      }
    },
  }
</script>
