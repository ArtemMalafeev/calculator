<template>
  <div class="calculator">
    <div class="calculator__container">
      <div class="calculator__view">
        <div class="container">
          <div class="calculator__history">
            <ul class="calculator__items">
              <li class="calculator__item">f</li>
            </ul>
          </div>
          <p class="calculator__result">{{ previous }}</p>
          <p class="calculator__result">{{ current }}</p>
        </div>
      </div>
      <div class="calculator__menu">
        <calculator-buttons :buttons="buttons" @click="handler" />
      </div>
    </div>
  </div>
</template>

<script>
  import CalculatorButtons from './CalculatorButtons.vue';
  import { buttons, actions } from '../data.js';

  export default {
    name: 'Calculator',

    components: { CalculatorButtons },

    data() {
      return {
        previous: 0,
        current: 0,
        previousOperation: null,

        state: 'start',
        buttons: buttons,
      };
    },

    methods: {
      handler(event) {
        console.log(event.target);
      },

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
          this.current = 0;
        }

        this.state = 'processing';
        const { action: fn, type } = this.actions[operator];

        switch (type) {
          case 'unary': {
            this.previous = fn(this.previous);
            this.current = 0;
            break;
          }

          case 'binary': {
            this.previousOperation = fn;
            break;
          }

          case 'finall': {
            this.previous = fn(this.previousOperation)(this.previous, this.current);
            this.current = 0;
            break;
          }
        }
      },
    }
  }
</script>
