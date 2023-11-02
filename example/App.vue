<template>
  <div id="app">
    <scratch-card :key="renderCount"
                  :cardWidth="cardWidth"
                  :cardHeight="cardHeight"
                  :finishPercent="finishPercent"
                  imageUrl="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                  :brushUrl="brushUrl"
                  :forceReveal="forceReveal"
                  :fog="true"
                  :cover="false"
                  @complete="onComplete">
      <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="">
    </scratch-card>
    <button @click="forceReveal = true">Force Reveal!</button>
    <button @click="renderCount++">Force Reset</button>
  </div>
</template>

<script>
import ScratchCard from '../src/ScratchCard.vue';
import BRUSH from './brush.png';

export default {
  name: 'app',
  components: {
    ScratchCard,
  },

  data() {
    return {
      renderCount: 0,
      cardWidth: 300,
      cardHeight: 300,
      finishPercent: 70,
      brushUrl: BRUSH,
      forceReveal: false,
    };
  },

  methods: {
    onComplete() {
      window.alert('Content revealed!');
    },
  },
};
</script>

<style scoped>
.card-content {
  color: red;
}
</style>
