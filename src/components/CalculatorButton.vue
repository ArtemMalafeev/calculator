<template>
  <button type="button" @click="handler">{{ getView }}</button>
</template>

<script>
  export default {
    name: 'CalculatorButton',

    emits: ['handler'],

    props: {
      button: {
        type: Object,
        required: true,
      },
    },

    computed: {
      getButton() {
        return this.button;
      },

      getView() {
        return this.getButton.view;
      },

      getData() {
        return this.getButton.data;
      },

      getType() {
        return this.getButton.type;
      },
    },

    methods: {
      handler() {
        this.$emit('handler', {
          type: this.getType,
          data: this.getData,
        });
      },
    },
  }
</script>
