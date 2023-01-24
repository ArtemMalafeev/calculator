<template>
  <div class="info">
    <p>Prev: {{ operands.previous }} {{ typeof operands.previous }}</p>
    <p>Operand: {{ operands.current }} {{ typeof operands.current }}</p>
    <p>Action: {{ action }}</p>
    <p>Operator: {{ operator }}</p>
    <p>State: {{ state }}</p>
    <p>History: {{ history }}</p>
  </div>

  <hr>

  <div class="values">
    <!-- span - для отображения содержимого -->
    <!--
      value - для определения значения кнопки
      ?? вопрос передавать просто значение в функцию или определять в data и вызывать без передачи параметров
    -->
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
    <!-- span - для отображения содержимого -->
    <button @click="handleAction" data-action-type="operator" data-type="binary" data-operator="add">+</button>
    <button @click="handleAction" data-action-type="operator" data-type="binary" data-operator="subtract">-</button>
    <button @click="handleAction" data-action-type="operator" data-type="binary" data-operator="multiply">X</button>
    <button @click="handleAction" data-action-type="operator" data-type="binary" data-operator="divide">/</button>
    <button @click="handleAction" data-action-type="operator" data-type="unary" data-operator="sign">+/-</button>
    <button @click="handleAction" data-action-type="operator" data-type="unary" data-operator="percent">%</button>
  </div>

  <hr>

  <div class="action">
    <button>AC</button>
    <button @click="calculate">=</button>
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
        operator: null,
        operands: {
          previous: 0,
          current: 0,
        },

        history: [],
      };
    },

    computed: {
      getCurrentOperand() {
        return this.operands.current;
      },

      getPreviousOperand() {
        return this.operands.previous;
      },

      getOperator() {
        return this.operator;
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
        const number = parseInt([this.getCurrentOperand, value].join(separator));
        this.operands.current = number;
      },

      updateOperator(data) {
        this.operator = { ...data };
      },

      // calculate() {
      //   if (this.getState === 'processed' || this.getState === 'default') {
      //     console.log('Выберите оператор!');
      //   }
      //   const { type, operator } = this.operator;
      //   const operation = operations[operator];

      //   this.operands.previous = operation(this.getPreviousOperand, this.getCurrentOperand);
      //   this.operator = null;
      // },
    },

    watch: {
      action() {
        const { actionType } = this.action;

        switch(actionType) {
          case 'value': {
            const { value } = this.action;
            this.updateOperand(value);
            break;
          }
          case 'operator': {
            const { type, operator } = this.action;
            this.updateOperator({ type, operator });
            break;
          }
          case 'clear': {
            // this.reset();
            break;
          }
          case 'calculate': {
            // this.calculate();
            break;
          }
        }
      },

      // operator: {
      //   deep: true,
      //   handler(newOperator) {
      //     this.state = (!!newOperator) ? 'processing' : 'processed';
      //   },
      // },

      // state(newOperator, oldOperator) {
      //   if (newOperator === 'processing' && oldOperator === 'default') {
      //     this.operands.previous = this.operands.current;
      //     this.operands.current = 0;
      //   }

      //   if (newOperator === 'processed' && oldOperator === 'processing') {
      //     this.operands.current = 0;
      //   }
      // },
    },
  }
</script>
