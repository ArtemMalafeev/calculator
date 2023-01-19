<template>
  <div>
    <p>Current: {{ this.current }}</p>
    <p>Previous: {{ this.previous }}</p>
    <p>Operation: {{ this.operation }}</p>

    <button v-for="value in $options.values" @click="handleValue(value.value)">{{ value.span }}</button>
    <button v-for="action in $options.actions" @click="handleAction(action)">{{ action.span }}</button>
    <button>C</button>
    <button>=</button>
  </div>
</template>

<script>
  import { values, actions } from '../data.js';

  export default {
    name: 'Calculator',

    values,
    actions,

    data() {
      return {
        previous: 0,
        current: 0,
        operation: null,
      };
    },

    methods: {
      handleValue(value) {
        const separator = '';
        const newCurrent = [this.current, value].join(separator);

        this.current = (value === '.')
          ? newCurrent
          : parseFloat(newCurrent);
      },

      handleAction(action) {
        const { type, action: fn } = action;
        this.previous = this.current;
        this.operation = fn;

        if (type === 'unary') {
          this.calculate();
        }
      },

      calculate() {
        this.previous = this.operation(this.previous);
      }
    }
  }
</script>
