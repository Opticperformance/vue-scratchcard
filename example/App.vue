<template>
  <div id="app">
    <scratch-card :key="renderCount"
                  :cardWidth="cardWidth"
                  :cardHeight="cardHeight"
                  :finishPercent="finishPercent"
                  imageUrl="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtdi0yZTJlMjBjMT0iIiB2aWV3Qm94PSIwIDAgMzIyIDMwMyI+PGRlZnMgZGF0YS12LTJlMmUyMGMxPSIiPjxzdHlsZSBkYXRhLXYtMmUyZTIwYzE9IiI+CiAgICAgICAgICAgICAgJmx0OyFbQ0RBVEFbCiAgICAgICAgICAgICAgQGZvbnQtZmFjZSB7CiAgICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdC1SZWd1bGFyJzsKICAgICAgICAgICAgICAgICAgc3JjOiB1cmwoJ34vc3JjL2ZvbnRzL01vbnRzZXJyYXQtUmVndWxhci5vdGYnKSBmb3JtYXQoJ3dvZmYyJyk7CiAgICAgICAgICAgICAgfQogICAgICAgICAgXV0mZ3Q7CiAgICAgICAgICAgIDwvc3R5bGU+PC9kZWZzPiA8cmVjdCBkYXRhLXYtMmUyZTIwYzE9IiIgeD0iMCIgeT0iMCIgd2lkdGg9IjMyMiIgaGVpZ2h0PSIzMDMiIGZpbGw9IiNmZmNjMDAiLz4gPHRleHQgZGF0YS12LTJlMmUyMGMxPSIiIHg9IjAiIHk9IjAiIGZvbnQtc2l6ZT0iMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJNb250c2VycmF0LVJlZ3VsYXIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsNTcuMzc1KSI+PHRzcGFuIGRhdGEtdi0yZTJlMjBjMT0iIiB4PSI1MCUiIGR5PSIzMCI+SGVsbG8gd29ybGQ8L3RzcGFuPiA8dHNwYW4gZGF0YS12LTJlMmUyMGMxPSIiIHg9IjUwJSIgZHk9IjMwIj5IZWxsbyB3b2hnZmhybGQ8L3RzcGFuPiA8dHNwYW4gZGF0YS12LTJlMmUyMGMxPSIiIHg9IjUwJSIgZHk9IjMwIj5IZWxsbyB3b3JsZDwvdHNwYW4+IDx0c3BhbiBkYXRhLXYtMmUyZTIwYzE9IiIgeD0iNTAlIiBkeT0iMzAiPkhlbGxvIHdvcmxkPC90c3Bhbj4gPHRzcGFuIGRhdGEtdi0yZTJlMjBjMT0iIiB4PSI1MCUiIGR5PSIzMCI+SGVsbG8gd29ybGQ8L3RzcGFuPjwvdGV4dD48L3N2Zz4="
                  :brushUrl="brushUrl"
                  :forceReveal="forceReveal"
                  :fog="true"
                  @complete="onComplete">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtdi0yZTJlMjBjMT0iIiB2aWV3Qm94PSIwIDAgMzIyIDMwMyI+PGRlZnMgZGF0YS12LTJlMmUyMGMxPSIiPjxzdHlsZSBkYXRhLXYtMmUyZTIwYzE9IiI+CiAgICAgICAgICAgICAgJmx0OyFbQ0RBVEFbCiAgICAgICAgICAgICAgQGZvbnQtZmFjZSB7CiAgICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdC1SZWd1bGFyJzsKICAgICAgICAgICAgICAgICAgc3JjOiB1cmwoJ34vc3JjL2ZvbnRzL01vbnRzZXJyYXQtUmVndWxhci5vdGYnKSBmb3JtYXQoJ3dvZmYyJyk7CiAgICAgICAgICAgICAgfQogICAgICAgICAgXV0mZ3Q7CiAgICAgICAgICAgIDwvc3R5bGU+PC9kZWZzPiA8cmVjdCBkYXRhLXYtMmUyZTIwYzE9IiIgeD0iMCIgeT0iMCIgd2lkdGg9IjMyMiIgaGVpZ2h0PSIzMDMiIGZpbGw9IiNmZmNjMDAiLz4gPHRleHQgZGF0YS12LTJlMmUyMGMxPSIiIHg9IjAiIHk9IjAiIGZvbnQtc2l6ZT0iMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJNb250c2VycmF0LVJlZ3VsYXIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsNTcuMzc1KSI+PHRzcGFuIGRhdGEtdi0yZTJlMjBjMT0iIiB4PSI1MCUiIGR5PSIzMCI+SGVsbG8gd29ybGQ8L3RzcGFuPiA8dHNwYW4gZGF0YS12LTJlMmUyMGMxPSIiIHg9IjUwJSIgZHk9IjMwIj5IZWxsbyB3b2hnZmhybGQ8L3RzcGFuPiA8dHNwYW4gZGF0YS12LTJlMmUyMGMxPSIiIHg9IjUwJSIgZHk9IjMwIj5IZWxsbyB3b3JsZDwvdHNwYW4+IDx0c3BhbiBkYXRhLXYtMmUyZTIwYzE9IiIgeD0iNTAlIiBkeT0iMzAiPkhlbGxvIHdvcmxkPC90c3Bhbj4gPHRzcGFuIGRhdGEtdi0yZTJlMjBjMT0iIiB4PSI1MCUiIGR5PSIzMCI+SGVsbG8gd29ybGQ8L3RzcGFuPjwvdGV4dD48L3N2Zz4=" alt="">
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
