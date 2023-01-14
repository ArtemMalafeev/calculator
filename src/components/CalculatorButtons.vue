<template>
  <calculator-button
    v-for="button in buttons"
    :button="button"
    :area="button.area"
    :span="button.span"
    :type="button.type"
  />
</template>

<script>
  import CalculatorButton from './CalculatorButton.vue';

  export default {
    name: 'CalculatorButtons',

    components: { CalculatorButton },

    emits: ['ar'],

    props: {
      buttons: {
        type: Object,
        required: true,
      },
    },

    methods: {
      up(event) {
        console.log(event);
      },
    },
  }
</script>
