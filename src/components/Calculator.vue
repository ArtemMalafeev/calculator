<template>
  <div class="calculator">
    <div class="calculator__container">
      <div class="calculator__view">
        <!-- Результат вычисления + история -->
        {{ current }}
      </div>
      <div class="calculator__menu">
        <button :style="{ 'grid-area': 'zero' }" class="calculator__button">0</button>
        <button :style="{ 'grid-area': 'one' }" class="calculator__button">1</button>
        <button :style="{ 'grid-area': 'two' }" class="calculator__button" @click="append">2</button>
        <button :style="{ 'grid-area': 'three' }" class="calculator__button" @click="append">3</button>
        <button :style="{ 'grid-area': 'four' }" class="calculator__button">4</button>
        <button :style="{ 'grid-area': 'five' }" class="calculator__button">5</button>
        <button :style="{ 'grid-area': 'six' }" class="calculator__button">6</button>
        <button :style="{ 'grid-area': 'seven' }" class="calculator__button">7</button>
        <button :style="{ 'grid-area': 'eight' }" class="calculator__button">8</button>
        <button :style="{ 'grid-area': 'nine' }" class="calculator__button">9</button>
        <button :style="{ 'grid-area': 'comma' }" class="calculator__button">,</button>
        <button :style="{ 'grid-area': 'del' }" class="calculator__button">AC</button>
        <button :style="{ 'grid-area': 'change' }" class="calculator__button">+/-</button>
        <button :style="{ 'grid-area': 'percent' }" class="calculator__button">%</button>
        <button :style="{ 'grid-area': 'divide' }" class="calculator__button">/</button>
        <button :style="{ 'grid-area': 'multiply' }" class="calculator__button">X</button>
        <button :style="{ 'grid-area': 'minus' }" class="calculator__button">-</button>
        <button :style="{ 'grid-area': 'plus' }" class="calculator__button">+</button>
        <button :style="{ 'grid-area': 'equals' }" class="calculator__button">=</button>
      </div>
      <calculator-button name="zero" type="simple" label="0" value="0" />
      <calculator-button name="multiply" type="hard" label="X" action="() => { console.log('a') }" />
    </div>
  </div>
</template>

<script>
  import CalculatorButton from './CalculatorButton.vue';

  export default {
    name: 'Calculator',

    components: { CalculatorButton },

    data() {
      return {
        current: 0,
      };
    },

    methods: {
      append({ target }) {
        console.log(target.innerHTML);
      },
    },
  }
</script>
