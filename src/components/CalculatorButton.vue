<template>
  <button
    :style="{ 'grid-area': getArea }"
    class="calculator__button"
    :class="{ 'calculator__button--action': isAction }"
    @click="$emit('ar', $event)"
    >
      <span>{{ getSpan }}</span>
  </button>
</template>

<script>
  export default {
    name: 'CalculatorButton',

    emits: ['ar'],

    props: {
      button: {
        type: Object,
        requried: true,
      },

      area: {
        type: String,
        required: true,
      },

      span: {
        type: String,
        required: true,
      },

      
    },

    computed: {
      getArea() {
        return this.button.area;
      },

      getSpan() {
        return this.button.span;
      },

      isAction() {
        return this.button.type === 'action';
      },
    },
  }
</script>
