<template>
  <button type="button" @click="handler">{{ getView }} </button>
</template>

<script>
  import { views } from '../data.js';

  export default {
    name: 'CalculatorButton',

    emits: ['handler'],

    views,

    props: {
      identificator: {
        type: String,
        required: true,
      },
    },

    computed: {
      getIdentificator() {
        return this.identificator;
      },

      getViews() {
        return this.$options.views;
      },

      getView() {
        return this.getViews[this.getIdentificator];
      },
    },

    methods: {
      handler() {
        this.$emit('handler');
      },
    },
  }
</script>
