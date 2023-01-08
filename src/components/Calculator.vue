<template>
  <div class="calculator">
    <div class="calculator__container">
      <div class="calculator__view">
        <p class="calculator__result">previous: {{ previous }}</p>
        <p class="calculator__result">current: {{ current }}</p>
        <p class="calculator__result">Operator: {{ operator }}</p>
        <p class="calculator__result">State: {{ state }}</p>
      </div>
      <div class="calculator__menu">
        <!-- update -->
        <button :style="{ 'grid-area': 'zero' }" class="calculator__button" @click="updateCurrent">0</button>
        <button :style="{ 'grid-area': 'one' }" class="calculator__button" @click="updateCurrent">1</button>
        <button :style="{ 'grid-area': 'two' }" class="calculator__button" @click="updateCurrent">2</button>
        <button :style="{ 'grid-area': 'three' }" class="calculator__button" @click="updateCurrent">3</button>
        <button :style="{ 'grid-area': 'four' }" class="calculator__button" @click="updateCurrent">4</button>
        <button :style="{ 'grid-area': 'five' }" class="calculator__button" @click="updateCurrent">5</button>
        <button :style="{ 'grid-area': 'six' }" class="calculator__button" @click="updateCurrent">6</button>
        <button :style="{ 'grid-area': 'seven' }" class="calculator__button" @click="updateCurrent">7</button>
        <button :style="{ 'grid-area': 'eight' }" class="calculator__button" @click="updateCurrent">8</button>
        <button :style="{ 'grid-area': 'nine' }" class="calculator__button" @click="updateCurrent">9</button>
        <button :style="{ 'grid-area': 'comma' }" class="calculator__button" @click="updateCurrent">.</button>
        <!-- action -->
        <button :style="{ 'grid-area': 'del' }" class="calculator__button calculator__button--action" @click="action('del')">AC</button>
        <button :style="{ 'grid-area': 'change' }" class="calculator__button calculator__button--action" @click="action('+/-')">+/-</button>
        <button :style="{ 'grid-area': 'percent' }" class="calculator__button calculator__button--action" @click="action('%')">%</button>
        <button :style="{ 'grid-area': 'divide' }" class="calculator__button calculator__button--action" @click="action('/')">/</button>
        <button :style="{ 'grid-area': 'multiply' }" class="calculator__button calculator__button--action" @click="action('X')">X</button>
        <button :style="{ 'grid-area': 'minus' }" class="calculator__button calculator__button--action" @click="action('-')">-</button>
        <button :style="{ 'grid-area': 'plus' }" class="calculator__button calculator__button--action" @click="action('+')">+</button>
        <button :style="{ 'grid-area': 'equals' }" class="calculator__button calculator__button--action" @click="result">=</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { actions } from '../data.js';

  export default {
    name: 'Calculator',

    data() {
      return {
        previous: 0,
        current: 0,
        operator: null,
        state: 'start',
        actions: actions,
      };
    },

    methods: {
      updateCurrent({ target }) {
        const separator = '';
        const inputValue = target.innerHTML;
        const newCurrent = [this.current, inputValue].join(separator);

        this.current = (inputValue === '.')
          ? newCurrent
          : parseFloat(newCurrent);
      },

      action(operator) {
        if (this.state === 'start') {
          this.previous = this.current;
          this.state = 'processing';
        }

        this.operator = operator;
        const { action, type } = actions[operator];

        if (type === 'unary') {
          this.result();
        }

        this.current = 0;
      },

      result() {
        if (this.operator !== null) {
          const { action, type } = this.actions[this.operator];
          this.previous = (type === 'binary') ? action(this.previous, this.current) : action(this.previous);
          this.operator = null;
          this.current = 0;
        } else {
          alert('Выберите оператор!')
        }
      }
    }
  }
</script>
