<template>
  <div style="font-size: 0">
    <div
      class="transform rounded-2xl mx-auto my-2 overflow-hidden opa grid grid-cols-32 w-full sm:max-w-lg max-w-xs gap-0"
      :class="disabled ? (shake ? '-rotate-1' : 'rotate-1') : ''"
    >
      <div
        v-for="n in squareNumber ** 2"
        :key="n"
        :ref="n.toString()"
        class="sm:h-4 h-2.5 border-none m-0 p-0 bg-black inline-block"
        :style="`opacity: 0.1;`"
      />
    </div>
  </div>
  <button
    class="mx-auto px-10 py-2 flex border-2 rounded-lg hover:bg-gray-200"
    :disabled="disabled"
    @click="reset"
  >
    New
  </button>
  <div class="flex pt-1">
    <label for="x-axis">X Axis</label>
    <input
      :disabled="disabled"
      type="range"
      class="w-2/6 flex mx-auto range range-lg range-accent"
      :max="squareNumber"
      :min="1"
      v-model.number="xaxis"
      id="x-axis"
    />
    <label for="y-axis">Y Axis</label>
    <input
      :disabled="disabled"
      type="range"
      class="w-2/6 flex mx-auto range range-lg range-accent"
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
      currentSquare: 1,
      disabled: false,
      interval: null,
      shake: false,
      xaxis: 1,
      yaxis: 0,
    };
  },
  mounted() {
    const self = this;
    this.interval = setInterval(function () {
      self.colourIn(self.currentSquare);
    }, 500);
    this.highlightSquare(1);
  },
  watch: {
    currentSquare(previous, target) {
      const self = this;
      this.colourIn(this.currentSquare);
      this.interval = setInterval(function () {
        self.colourIn(self.currentSquare);
      }, 500);
      this.highlightSquare(previous);
      this.resetSquare(target);
    },
    xaxis(previous, target) {
      if (!this.disabled) {
        clearInterval(this.interval);
        if (this.checkJump(previous, target)) {
          this.drawTo(previous, target, "x");
        }
        this.currentSquare = this.calculateSquare(this.xaxis, this.yaxis);
      }
    },
    yaxis(previous, target) {
      if (!this.disabled) {
        clearInterval(this.interval);
        if (this.checkJump(previous, target)) {
          this.drawTo(previous, target, "y");
        }
        this.currentSquare = this.calculateSquare(this.xaxis, this.yaxis);
      }
    },
  },

  methods: {
    reset() {
      this.xaxis = 1;
      this.yaxis = 0;
      this.currentSquare = 0;
      clearInterval(this.interval);
      this.disabled = true;
      const self = this;
      let loop = 0;
      const clearLoop = setInterval(function () {
        for (let square = 1; square <= self.squareNumber ** 2; square++) {
          self.colourReduce(square);
        }
        self.shake = !self.shake;
        loop++;

        if (loop === 10) {
          for (let i = 1; i <= self.squareNumber ** 2; i++) {
            self.clearSquare(i);
          }
          self.disabled = false;
          clearInterval(clearLoop);
        }
      }, 30);

      this.interval = setInterval(function () {
        self.colourIn(self.currentSquare);
      }, 500);
    },

    clearSquare(square) {
      if (this.checkSquare(square)) {
        try {
          this.$refs[square.toString()][0].style.opacity = 0.1;
        } catch (e) {
          console.log(e);
        }
      }
    },

    colourReduce(square) {
      if (this.checkSquare(square)) {
        try {
          let currentOpacity = +this.$refs[square.toString()][0].style.opacity;
          if (currentOpacity > 0.1) {
            this.$refs[square.toString()][0].style.opacity -= 0.1;
          }
        } catch (e) {
          console.log(e);
        }
      }
    },

    colourIn(square) {
      if (this.checkSquare(square)) {
        try {
          let currentOpacity = +this.$refs[square.toString()][0].style.opacity;
          if (currentOpacity < 1) currentOpacity += 0.1;
          this.$refs[square.toString()][0].style.opacity = currentOpacity;
        } catch (e) {
          console.log(e);
        }
      }
    },

    checkSquare(square) {
      return square <= this.squareNumber ** 2 && square > 0;
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

    resetSquare(square) {
      if (this.checkSquare(square)) {
        try {
          this.$refs[square.toString()][0].classList.remove("bg-red-500");
          this.$refs[square.toString()][0].classList.add("bg-black");
        } catch (e) {
          console.log(e);
        }
      }
    },

    highlightSquare(square) {
      if (this.checkSquare(square)) {
        try {
          this.$refs[square.toString()][0].classList.add("bg-red-500");
          this.$refs[square.toString()][0].classList.remove("bg-black");
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
});
</script>
