<template>
  <button
    :style="{ 'grid-area': name }"
    class="calculator__button"
    :class="{ 'calculator__button--action': type === 'hard' }">
    {{ label }}
  </button>
</template>

<script>
  export default {
    name: 'CalculatorButton',

    props: {
      name: {
        type: String,
        require: true,
      },

      label: {
        type: String,
        required: true,
      },

      value: {
        type: Number,
        required: false,
      },

      action: {
        type: Function,
        required: false,
      },

      type: {
        type: String,
        required: true,
      },
    },
  }
</script>
