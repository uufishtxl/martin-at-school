<template>
  <q-page padding class="flex flex-col items-center justify-center gap-y-[4vh]">
    <div
      class="h-[40vh] w-[40vh] flex items-center justify-center"
      style="background: url('img/bg-math-clock.svg'); background-size: cover"
    >
      <div
        class="w-[60%] h-[60%] text-center pt-[6vh] text-cyan-500 text-[12px] flex flex-col gap-y-[0.25vh]"
      >
        <div v-if="duration === configs.minutes * multiply">等待开始</div>
        <div v-else-if="paused">暂停中</div>
        <div v-else-if="duration === 0">本轮已结束</div>
        <div v-else>嘘……考试呢！</div>
        <div class="flex flex-row justify-center text-[2.5em] font-bold">
          <div class="w-8">{{ min }}</div>
          <div>:</div>
          <div class="w-8">
            {{ sec }}
          </div>
        </div>
        <div class="flex flex-col gap-y-[2px]">
          <div
            class="flex flex-row items-center justify-center"
            v-show="duration === configs.minutes * multiply || paused"
            @click="handleClock"
          >
            <q-btn
              size="9px"
              color="cyan"
              icon="svguse:icons.svg#play"
              round
              flat
            />
            <div
              v-html="
                `${duration < configs.minutes * multiply ? '继续' : '开始'}`
              "
            ></div>
          </div>
          <div
            class="flex flex-row items-center justify-center mt-[-1vh]"
            v-show="
              duration < configs.minutes * multiply && !paused && duration > 0
            "
            @click="handleClock"
          >
            <q-btn
              size="sm"
              color="cyan"
              icon="svguse:icons.svg#pause"
              round
              flat
            />
            <div>暂停</div>
          </div>
          <div
            class="flex flex-row items-center justify-center mt-[-1vh]"
            v-show="duration === 0 || paused"
            @click="
              () => {
                paused = false
                duration = configs.minutes * multiply
                correct = 0
                wrong = 0
              }
            "
          >
            <q-btn size="sm" icon="svguse:icons.svg#reset" round flat />
            <div>重置</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 只在未开始时显示，否则没有配置的必要 -->
    <MathConfigSimpleVue
      v-show="duration === configs.minutes * multiply"
      :configs="configs"
      @updateConfig="updateConfig"
      id="math"
    />
    <!-- 只在已经开始，并且没有暂停的情况下显示 -->
    <transition
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutUp"
    >
      <Equation
        v-show="
          duration < configs.minutes * multiply && !paused && duration > 0
        "
        :numA="numA"
        :numB="numB"
        :symbolA="symbolA"
        :numC="numC"
        :symbolB="symbolB"
        :qSeq="correct"
        :retry="retry"
        :modelValue="ansRef"
        :showQ="configs.showQ"
        :autoVerify="configs.autoVerify"
        @update:modelValue="(answer: string) => verifyAns(answer) "
        :tickAnswer="() => verifyAns()"
      />
    </transition>
    <!-- 开始后才显示 -->
    <transition
      appear
      enter-active-class="animated tada"
      leave-active-class="animated fadeOutRight"
    >
      <ScoreBoard
        v-show="duration < configs.minutes * multiply"
        :total="correct"
        :pass="configs.goal"
        :duration="duration"
      />
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import ScoreBoard from 'src/components/ScoreBoard.vue'
import Equation from 'src/components/Equation.vue'
import MathConfigSimpleVue from 'src/components/MathConfigSimple.vue'
import { MathSymbol, IntervalTimer, IProblem, IConfigProp } from '../types'
import { playLocal, handleTwoNums, getProblems } from 'src/util'

let mathTimer: IntervalTimer

let configs = ref<IConfigProp>({
  minutes: 2,
  goal: 40,
  maxDigit: 10,
  fastRate: true,
  showQ: true,
  autoVerify: true,
  ignoreWrong: false,
  tripletPercent: 0,
  questionOnLeft: false,
})

const multiply = ref(60)

const correct = ref(0)
const wrong = ref(0)
const duration = ref(configs.value.minutes * multiply.value)
const paused = ref(false)
const ansRef = ref('')

const numA = ref(0)
const numB = ref(0)
const numC = ref<number | undefined>()
const symbolA = ref<MathSymbol>('plus')
const symbolB = ref<MathSymbol | undefined>()
const problems = ref<IProblem[]>([])
const retry = ref(false)

const min = computed(() => {
  return Math.floor(duration.value / multiply.value) < 10
    ? '0' + String(Math.floor(duration.value / multiply.value))
    : String(Math.floor(duration.value / multiply.value))
})

const sec = computed(() => {
  return duration.value % multiply.value < 10
    ? '0' + String(duration.value % multiply.value)
    : String(duration.value % multiply.value)
})

const updateConfig = (payload: IConfigProp) => {
  duration.value = payload.minutes * multiply.value
  configs.value = { ...payload }
}

const getRightAnswer = (): number => {
  let res = handleTwoNums(symbolA.value, numA.value, numB.value)
  if (symbolB.value && numC.value) {
    res = handleTwoNums(symbolB.value, res, numC.value)
  }
  return res
}

const verifyAns = (answer?: string) => {
  if (configs.value.autoVerify) {
    const ansPat = getRightAnswer()
    if (String(ansPat) === answer) {
      retry.value = false
      ansRef.value = ''
      ++correct.value
    } else {
      ansRef.value = ''
      retry.value = true
      if (configs.value.ignoreWrong) ++wrong.value
      playLocal(equation.value, configs.value.fastRate)
    }
  } else {
    correct.value += 1
  }
}

const txt = (str: number | string): string => {
  if (str === 1) str = '伊'
  if (str === 'plus') str = '加'
  if (str === 'minus') str = '减'
  return String(str)
}

const sync = (id: number) => {
  const problem = problems.value[id]
  const { n1, n2, n3, s1, s2 } = problem
  if (problem) {
    numA.value = n1
    numB.value = n2
    numC.value = n3
    symbolA.value = s1
    symbolB.value = s2
  }
}

watch(correct, () => {
  sync(correct.value + wrong.value)
  if (duration.value > 0) playLocal(equation.value, configs.value.fastRate)
})

watch(wrong, () => {
  sync(correct.value + wrong.value)
  if (duration.value > 0) playLocal(equation.value, configs.value.fastRate)
})

const equation = computed(() => {
  const problem = problems.value[correct.value + wrong.value]
  const { n1, n2, n3, s1, s2 } = problem
  return (
    txt(n1) +
    txt(s1) +
    txt(n2) +
    (s2 !== undefined && n3 !== undefined ? txt(s2) + txt(n3) : '')
  )
})

const startTest = () => {
  const max = configs.value.minutes * multiply.value
  paused.value = false
  if (duration.value === max) {
    problems.value = getProblems(configs.value)
    sync(correct.value + wrong.value)
    --duration.value
    playLocal(equation.value, configs.value.fastRate)
  } else if (
    duration.value > 0 &&
    duration.value < configs.value.minutes * multiply.value
  ) {
    playLocal(equation.value, configs.value.fastRate)
  }
  mathTimer = setInterval(() => {
    if (duration.value > 0) {
      --duration.value
    } else if (duration.value === 0) {
      clearInterval(mathTimer)
      playLocal(
        `测试结束，您在 ${configs.value.minutes * multiply.value} 秒内，答对了${
          correct.value
        }道题。${
          duration.value > 0
            ? ''
            : correct.value >= configs.value.goal
            ? '合格'
            : '不合格'
        }`,
        configs.value.fastRate
      )
    }
  }, 1000)
}

const handleClock = () => {
  // 开始
  if (
    duration.value === configs.value.minutes * multiply.value ||
    paused.value
  ) {
    startTest()
  } else if (
    duration.value > 0 &&
    duration.value < configs.value.minutes * multiply.value &&
    !paused.value
  ) {
    paused.value = true
    clearInterval(mathTimer)
  }
}
</script>
