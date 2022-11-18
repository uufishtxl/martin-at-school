<template>
  <div class="score-container rounded-xl">
    <Fireworks v-if="duration === 0" />
    <div class="balloon red">
      <div class="star"></div>
      <div class="face">
        <div class="eye"></div>
        <div class="mouth happy"></div>
      </div>
      <div class="triangle"></div>
      <div class="string"></div>
    </div>
    <div class="balloon white">
      <div class="star"></div>
      <div class="face">
        <div class="eye"></div>
        <div class="mouth happy"></div>
      </div>
      <div class="triangle"></div>
      <div class="string"></div>
    </div>
    <div class="balloon blue">
      <div class="star"></div>
      <div class="face">
        <div class="eye"></div>
        <div class="mouth happy"></div>
      </div>
      <div class="triangle"></div>
      <div class="string"></div>
    </div>
    <h1>哇呜，已经答对了</h1>
    <div id="timer" class="flex flex-row items-center justify-center">
      <div>{{ props.total }}</div>
      <div class="text-[0.4em] ml-2">题</div>
    </div>
    <div
      class="absolute top-[50%] right-8 translate-y-[-50%]"
      v-if="props.total >= props.pass && props.duration === 0"
    >
      <img src="img/pass.svg" class="w-20" />
    </div>
    <div
      class="absolute top-[50%] right-8 translate-y-[-50%]"
      v-else-if="props.total < props.pass && props.duration === 0"
    >
      <img src="img/failed.svg" class="w-20" />
    </div>
    <div class="absolute top-[80%] left-2 translate-y-[-50%]">
      <img
        src="img/rabbit.svg"
        class="w-16"
        style="transform: rotateY(180deg)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Fireworks from 'src/components/Fireworks.vue'
const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  pass: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700|Montserrat:900');
$big: 'Montserrat', sans-serif;

$font: 'Lato', sans-serif;
$red: #ef2f3c;
$white: #f6f4f3;
$blue: #276fbf;
$dark: #183059;
$yellow: #f0a202;

$star: polygon(
  50% 0%,
  61% 35%,
  98% 35%,
  68% 57%,
  79% 91%,
  50% 70%,
  21% 91%,
  32% 57%,
  2% 35%,
  39% 35%
);

h1 {
  font-family: $font;
  text-align: center;
  margin-top: 15%;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: $white;
}

#timer {
  color: $white;
  text-align: center;
  text-transform: uppercase;
  font-family: $font;
  font-size: 50px;
  letter-spacing: 5px;
  margin-top: -10%;
}

.white {
  position: absolute;
  background: $white;
  height: 30%;
  width: 13%;
  left: 35%;
  top: 5%;
  .triangle {
    border-bottom: 14px solid $white;
  }
  .string {
    background: $white;
    border: 1px solid $white;
  }
}
.red {
  position: absolute;
  background: $red;
  left: 18%;
  top: 9%;
  height: 65px;
  width: 70px;
  .triangle {
    border-bottom: 14px solid $red;
  }
  .string {
    background: $red;
    border: 1px solid $red;
  }
}

.blue {
  position: absolute;
  background: $blue;
  height: 80px;
  width: 80px;
  left: 60%;
  top: 6%;
  .triangle {
    border-bottom: 14px solid $blue;
  }
  .string {
    background: $blue;
    border: 1px solid $blue;
  }
}

.score-container {
  position: relative;
  margin: auto;
  overflow: hidden;
  width: 560px;
  height: 240px;
  background: $dark;
}

.balloon {
  border: 1px solid #000;
  border-radius: 50% 50% 50% 50%/ 40% 40% 60% 60%;
  z-index: 2;
}

.eye {
  position: absolute;
  width: 7px;
  height: 7px;
  top: 40%;
  left: 22%;
  background: #000;
  border-radius: 50%;
  &:after {
    content: '';
    left: 35px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #000;
    position: absolute;
  }
}

.mouth {
  position: absolute;
  top: 45%;
  left: 43%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.happy {
  border: 2px solid;
  border-color: transparent #000 #000 transparent;
  transform: rotate(45deg);
}

.triangle {
  position: absolute;
  left: 40%;
  bottom: -10%;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
}

.string {
  position: absolute;
  height: 40px;
  width: 1px;
  left: 48%;
  top: 100%;
  z-index: -1;
}

.star {
  width: 20px;
  height: 20px;
  background: $white;
  -webkit-clip-path: $star;
  clip-path: $star;
}

.star-red {
  width: 30px;
  height: 30px;
  margin-left: 51px;
  margin-top: -5px;
  background: $red;
  -webkit-clip-path: $star;
  clip-path: $star;
}
</style>
