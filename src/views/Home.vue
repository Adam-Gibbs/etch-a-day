<template>
  <div style="font-size: 0">
    <div
      class="rounded-2xl mx-auto my-2 overflow-hidden grid grid-cols-32 w-full max-w-lg gap-0"
    >
      <div
        v-for="n in squareNumber ** 2"
        :key="n"
        :ref="n.toString()"
        class="h-4 border-none m-0 p-0 bg-black inline-block"
        :style="`opacity: 0.1;`"
      />
    </div>
  </div>
  <button class="mx-auto px-10 py-2 flex border-2 rounded-lg hover:bg-gray-200">
    New
  </button>
  <div class="flex pt-1">
    <label for="x-axis">X Axis</label>
    <input
      type="range"
      class="w-2/6 flex mx-auto bg-red-500 focus:outline-none focus:ring-0 focus:shadow-none"
      :max="squareNumber"
      :min="1"
      v-model.number="xaxis"
      id="x-axis"
    />
    <label for="y-axis">Y Axis</label>
    <input
      type="range"
      class="w-2/6 flex mx-auto bg-blue-500 focus:outline-none focus:ring-0 focus:shadow-none"
      :max="squareNumber - 1"
      :min="0"
      v-model.number="yaxis"
      id="y-axis"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      squareNumber: 32,
      containerWidth: this.containerSize(),
      squareWidth: this.containerSize() / 32,
      currentSquare: 0,
      interval: null,
      xaxis: 1,
      yaxis: 0,
    };
  },
  mounted() {
    const self = this;
    this.interval = setInterval(function () {
      self.colourIn(self.currentSquare);
    }, 500);
  },
  watch: {
    currentSquare() {
      const self = this;
      this.colourIn(this.currentSquare);
      this.interval = setInterval(function () {
        self.colourIn(self.currentSquare);
      }, 500);
    },
    xaxis(previous, target) {
      clearInterval(this.interval);
      if (this.checkJump(previous, target)) {
        this.drawTo(previous, target, "x");
      }
      this.currentSquare = this.calculateSquare(this.xaxis, this.yaxis);
    },
    yaxis(previous, target) {
      clearInterval(this.interval);
      if (this.checkJump(previous, target)) {
        this.drawTo(previous, target, "y");
      }
      this.currentSquare = this.calculateSquare(this.xaxis, this.yaxis);
    },
  },

  methods: {
    containerSize() {
      return window.innerWidth < window.innerHeight - 95
        ? window.innerWidth - 20
        : window.innerHeight - 95;
    },

    colourIn(square) {
      if (square <= this.squareNumber ** 2 && square > 0) {
        try {
          let currentOpacity = +this.$refs[square.toString()][0].style.opacity;
          if (currentOpacity < 1) currentOpacity += 0.1;
          this.$refs[square.toString()][0].style.opacity = currentOpacity;
        } catch (e) {
          console.log(e);
        }
      }
    },

    checkJump(previous, target) {
      return target < previous - 1 || target > previous + 1;
    },

    drawTo(previous, target, axis) {
      while (previous !== target) {
        if (previous < target) {
          previous++;
        } else {
          previous--;
        }
        if (axis === "x") {
          this.colourIn(this.calculateSquare(previous, this.yaxis));
        } else {
          this.colourIn(this.calculateSquare(this.xaxis, previous));
        }
      }
    },

    calculateSquare(x, y) {
      return x + y * this.squareNumber;
    },
  },
});
</script>
