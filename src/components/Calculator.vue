<template>
  <div class="calculator">
    <!-- Вывод результат -->
    <p v-if="state === 'processing'">Result: {{ calculation.current }}</p>
    <p v-else>Result: {{ calculation.previous }}</p>
    <!-- Кнопки ввода -->
    <div>
      <button type="button" v-for="{ label, value } in values" @click="update(value)">{{ label }}</button>
    </div>
    <div>-</div>
    <!-- Кнопки событий -->
    <div>
      <button type="button" v-for="action in actions" @click="choice(action.label)">{{ action.label }}</button>
      <button type="button" @click="calculate">=</button>
      <button type="button" @click="reset">reset</button>
    </div>
    <!-- Вывод истории -->
    <div>-</div>
    history: {{ calculation.history }}
  </div>
</template>

<script>
  import { values, actions, defaultState } from '../data.js';

  export default {
    data() {
      return {
        values: [ ...values ],
        actions: { ...actions },
        calculation: { ...defaultState },
        state: null,
      };
    },

    computed: {
      operator() {
        return this.calculation.operator;
      },

      previous() {
        return this.calculation.previous;
      },

      current() {
        return this.calculation.current;
      },

      previousIsZero() {
        return this.previous === 0;
      },
    },

    methods: {
      update(value) {
        this.state = 'processing';
        this.calculation.current = parseInt([this.current, value].join(''));
      },

      choice(operator) {
        // this.calculation.state = 'finish';
        this.calculation.operator = operator;

        if (this.previousIsZero) {
          this.calculation.previous = this.current;
        }

        this.calculation.current = 0;
      },

      calculate() {
        // this.calculation.state = 'finish';
        this.calculation.history.push([this.previous, this.operator, this.current].join(' '));
        this.calculation.previous = this.actions[this.operator].func(this.previous, this.current);
        this.calculation.current = 0;
        this.calculation.operator = null;
      },

      reset() {
        this.calculation = { ...defaultState };
        // this.calculation.state = 'processing';
        this.calculation.previous = 0;
        this.calculation.current = 0;
        this.calculation.operator = null;
        this.calculation.history = [];
      },
    },
  }
</script>

<style>
  .active {
    background-color: red;
  }
</style>
