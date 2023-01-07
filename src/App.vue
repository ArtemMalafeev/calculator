<template>
  <calculator />
</template>

<script>
import Calculator from './components/Calculator.vue';

export default {
  components: {
    Calculator,
  },

  data() {
    return {
        count: 1,
    };
  },
}
</script>

<style scoped>
</style>
