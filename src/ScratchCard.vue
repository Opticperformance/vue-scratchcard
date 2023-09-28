<template>
  <div class="scratchcard" :style="`width:${cardWidth}px; height:${cardHeight}px`">
    <canvas @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp"
            @touchstart="handleMouseDown" @touchmove="handleMouseMove" @touchend="handleMouseUp"
            ref="canvas" class="scratchcard-overlay"></canvas>
    <div v-if="overlayLoaded && !externalGain" class="scratchcard-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
function getFilledPercent(ctx, width, height, stride) {
  if (!stride || stride < 1) stride = 1;
  const pixels = ctx.getImageData(0, 0, width, height);
  const total = pixels.data.length / stride;

  let count = 0;
  for (let i = 0; i < pixels.data.length; i += stride) {
    if (parseInt(pixels.data[i], 10) === 0) count++;
  }
  return Math.round(count / total * 100);
}

function getMouse(e, canvas) {
  const { left, top } = canvas.getBoundingClientRect();
  const touch = e.touches && e.touches[0];
  if (touch) {
    return { x: touch.clientX - left, y: touch.clientY - top };
  } else {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    return { x: e.pageX - left - scrollLeft, y: e.pageY - top - scrollTop };
  }
}

function distanceBetween(point1, point2) {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2),
  );
}

function angleBetween(point1, point2) {
  return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

export default {
  name: 'ScratchCard',

  props: {
    imageUrl: String,
    brushUrl: String,
    cardWidth: Number,
    cardHeight: Number,
    finishPercent: Number,
    forceReveal: Boolean,
    onComplete: Function,
    fog: Boolean,
    externalGain: Boolean,
    origin: String,
  },

  data() {
    return {
      overlayLoaded: false,
      isDrawing: false,
      isFinished: false,
      canvas: undefined,
      ctx: undefined,
      lastPoint: undefined,
      brush: new Image(),
    };
  },

  methods: {
    initCanvas() {
      this.canvas = this.$refs.canvas;
      this.canvas.width = this.cardWidth;
      this.canvas.height = this.cardHeight;
      this.ctx = this.canvas.getContext('2d');
    },

    drawImage() {
      fetch(this.imageUrl, { 
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': this.origin,
        }
      })
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = url;
        image.onload = () => {
          const aspectRatio = image.width / image.height;
          const canvasAspectRatio = this.cardWidth / this.cardHeight;

          let newWidth, newHeight, offsetX, offsetY;

          if (aspectRatio < canvasAspectRatio) {
            newWidth = this.cardWidth;
            newHeight = this.cardWidth / aspectRatio;
            offsetX = 0;
            offsetY = (this.cardHeight - newHeight) / 2;
          } else {
            newHeight = this.cardHeight;
            newWidth = this.cardHeight * aspectRatio;
            offsetY = 0;
            offsetX = (this.cardWidth - newWidth) / 2;
          }

          if (this.fog) {
            this.ctx.drawImage(image, offsetX, offsetY, newWidth, newHeight);
            this.ctx.filter = `blur(${this.cardWidth * 0.02}px)`;
          }

          this.ctx.drawImage(image, offsetX, offsetY, newWidth, newHeight);
          this.ctx.filter = 'none';
          
          if(this.fog) {
            this.ctx.globalCompositeOperation = 'luminosity';
            this.ctx.fillStyle = 'rgba(255,255,255,0.15)';
            this.ctx.fillRect(0, 0, this.cardWidth, this.cardHeight);
          }

          this.overlayLoaded = true;
          this.$emit('overlayload');
        };
      })
    },

    prepBrush() {
      if (this.brushUrl) {
        this.brush.crossOrigin = 'Anonymous';
        this.brush.src = this.brushUrl;
      }
    },

    scratchAt(x, y) {
      if (this.brushUrl) {
        const aspectRatio = this.brush.width / this.brush.height;
        const newWidth = this.cardWidth * 0.2;
        const newHeight = newWidth / aspectRatio;
        const xPos = x - newWidth / 2;
        const yPos = y - newHeight / 2;

        this.ctx.drawImage(
          this.brush,
          xPos,
          yPos,
          newWidth,
          newHeight
        );
      } else {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 25, 0, 2 * Math.PI, false);
        this.ctx.fill();
      }
    },

    handleMouseDown(e) {
      this.isDrawing = true;
      this.lastPoint = getMouse(e, this.canvas);
    },

    handleMouseUp() {
      this.isDrawing = false;
    },

    handleMouseMove(e) {
      if (!this.isDrawing) return;

      e.preventDefault();
      const currentPoint = getMouse(e, this.canvas);
      const distance = distanceBetween(this.lastPoint, currentPoint);
      const angle = angleBetween(this.lastPoint, currentPoint);

      let x, y;
      for (let i = 0; i < distance; i++) {
        x = this.lastPoint.x + Math.sin(angle) * i;
        y = this.lastPoint.y + Math.cos(angle) * i;
        this.ctx.globalCompositeOperation = 'destination-out';
        this.scratchAt(x, y);
      }
      this.lastPoint = currentPoint;
      this.handlePercentage(
        getFilledPercent(this.ctx, this.cardWidth, this.cardHeight, 32),
      );
    },

    handlePercentage(filledInPixels = 0) {
      if (filledInPixels > this.finishPercent) this.reveal();
    },

    reveal() {
      if (!this.isFinished) {
        this.canvas.parentNode.removeChild(this.canvas);
        this.$emit("complete");
        if (this.onComplete) this.onComplete();
      }
      this.isFinished = true;
    },
  },

  watch: {
    forceReveal(val) {
      if (val) this.reveal();
    },
  },

  mounted() {
    this.initCanvas();
    this.drawImage();
    this.prepBrush();
    if (typeof this.onComplete !== 'undefined') {
      // eslint-disable-next-line
      console.warn('[vue-scratchcard] - `onComplete` call is deprecated in favor of `complete` event');
    }
  },
};
</script>

<style scoped>
.scratchcard {
  position: relative;
  display: block;
}

.scratchcard > * {
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
}

.scratchcard-overlay {
  z-index: 1;
}
</style>
