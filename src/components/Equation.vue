<template>
  <div
    class="flex flex-row gap-x-4 text-cyan-500 font-bold text-[4em] w-full items-center justify-center text-center"
  >
    <div>
      <q-icon
        color="cyan-500"
        size="1.2em"
        rounded
        clickable
        class="cursor-pointer hover:opacity-80"
        @click="visible = !visible"
      >
        <svg>
          <use :xlink:href="`icons.svg#${visible ? 'hide' : 'show'}`"></use>
        </svg>
      </q-icon>
    </div>
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <div v-show="visible" class="flex flex-row gap-x-4">
        <div>{{ props.numA || 0 }}</div>
        <div>{{ symbolMap[props.symbolA] }}</div>
        <div>{{ props.numB || 0 }}</div>
        <div v-if="props.symbolB">{{ symbolMap[props.symbolB] }}</div>
        <div v-if="props.numC">{{ props.numC || 0 }}</div>
        <div>=</div>
      </div>
    </transition>
    <div>
      <q-input
        v-if="autoVerify"
        id="ansbox"
        ref="ans"
        type="text"
        dark
        borderless
        class="bg-gradient-math rounded-sm w-24 text-[4em] w-12 big-font"
        v-model="answer"
        @change="
          (e) => {
            emit('update:modelValue', String(answer))
          }
        "
      />
      <button
        v-else
        class="bounce"
        @click="
          (e) => {
            tickAnswer()
          }
        "
      >
        <img src="img/signify-tick.svg" class="w-12" />
      </button>
      <!-- <input ref="" type="text"> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, onUpdated, watch } from 'vue'
import { QInput } from 'quasar'
import { MathSymbol } from '../types'

const symbolMap = {
  plus: '+',
  minus: '-',
  multiply: 'x',
  divide: '/',
}
const props = defineProps({
  numA: {
    type: Number,
    required: true,
  },
  numB: {
    type: Number,
    required: true,
  },
  numC: {
    type: Number,
  },
  symbolA: {
    type: String as PropType<MathSymbol>,
    required: true,
  },
  symbolB: {
    type: String as PropType<MathSymbol>,
  },
  modelValue: {
    type: String,
    required: true,
  },
  qSeq: {
    type: Number,
    required: true,
  },
  retry: {
    type: Boolean,
    required: false,
  },
  showQ: {
    type: Boolean,
    required: true,
  },
  autoVerify: {
    type: Boolean,
    required: true,
  },
  tickAnswer: {
    type: Function as PropType<() => void>,
    required: true,
  },
})

const answer = ref(props.modelValue)
const ans = ref<QInput>()
const visible = ref(props.showQ)
const emit = defineEmits<{
  (e: 'update:modelValue', answer: string): void
}>()
// 可是，如果做错了，我也想要让correct变化
watch(
  () => props.qSeq,
  (val) => {
    if (val) answer.value = props.modelValue
  }
)
watch(
  () => props.showQ,
  (val) => {
    visible.value = val
  }
)
watch(
  () => props.retry,
  (val) => {
    if (val) answer.value = props.modelValue
  }
)
onUpdated(() => {
  ans.value?.focus()
})
</script>

<style lang="scss">
.bounce {
  position: relative;
  animation: bounce ease-in 0.1s;
}

.bounce:active {
  animation: 0s;
}

@keyframes bounce {
  0% {
    transform: rotate(0deg);
  }
  12% {
    transform: rotate(30deg);
  }
  25% {
    transform: rotate(0deg);
  }
  37% {
    transform: rotate(-30deg);
  }
  50% {
    transform: rotate(0deg) scale(1.5);
  }
  62% {
    transform: rotate(30deg);
  }
  75% {
    transform: rotate(0deg);
  }
  87% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}
</style>
