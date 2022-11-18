<template>
  <div>
    <div class="flex flex-row gap-x-8 text-cyan-500 justify-center">
      <div class="flex flex-col items-center gap-y-[2px]">
        <div>时长</div>
        <q-input
          dark
          class="bg-gradient-math rounded-sm w-12"
          dense
          v-model="params.minutes"
          borderless
        />
        <div>分钟</div>
      </div>
      <div class="flex flex-col items-center gap-y-[2px]">
        <div>计算</div>
        <q-input
          dark
          class="bg-gradient-math rounded-sm w-12"
          dense
          v-model="params.maxDigit"
          borderless
        />
        <div>以内</div>
      </div>
      <div class="flex flex-col items-center gap-y-[2px]">
        <div>目标</div>
        <q-input
          dark
          class="bg-gradient-math rounded-sm w-12"
          dense
          v-model="params.goal"
          borderless
        />
        <div>道题</div>
      </div>
    </div>
    <div class="scroll mt-4 text-center text-cyan-400" v-if="!more">
      <a @click.prevent="(e) => showMoreConfig()" class="cursor-pointer"
        ><span></span>更多</a
      >
    </div>
    <q-intersection transition="scale">
      <div
        v-if="more"
        class="flex flex-col justify-center items-center p-8 relative h-[77vh]"
        style="max-width: 600px"
      >
        <q-list bordered padding>
          <q-item-label header>更多设置</q-item-label>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>读题速度</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle color="cyan" v-model="params.fastRate" />
            </q-item-section>
          </q-item>

          <q-separator class="my-2" />

          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox color="cyan" v-model="params.showQ" />
            </q-item-section>

            <q-item-section>
              <q-item-label>显示题目</q-item-label>
              <q-item-label caption class="text-[14px]">
                显示题目后，小朋友可能会进行视算。如果想要练习听算，建议隐藏题目。
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>电脑批改</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle color="cyan" v-model="params.autoVerify" />
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple v-if="params.autoVerify">
            <q-item-section side top>
              <q-checkbox color="cyan" v-model="params.ignoreWrong" />
            </q-item-section>

            <q-item-section>
              <q-item-label>跳过错题</q-item-label>
              <q-item-label caption class="text-[14px]">
                无论输入的答案正确与否，都进入下一题。否则，只有提交正确答案，才能开始下一题。
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="my-2" />
          <q-item>
            <q-item-section>
              <q-item-label>三元运算</q-item-label>
              <q-item-label caption class="text-[14px]">
                默认的出题形式为二元运算，如果想要加大难度，那么可以勾选以下选项，加入三元运算（比如：3+2-1=?）。
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox color="cyan" v-model="triplet" />
            </q-item-section>
            <q-item-section>
              <q-item-label>加入三元运算</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>三元运算占比</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="mb-6">
            <q-item-section>
              <q-slider
                v-model="params.tripletPercent"
                color="cyan"
                label-always
                :label-value="percentLabel"
                switch-label-side
                switch-marker-labels-side
                :min="0"
                :max="5"
              >
              </q-slider>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple @click="saveTest">
            <q-item-section avatar side>
              <q-icon color="cyan" name="svguse:icons.svg#print"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>打印速算测试卷</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div
          class="scroll mt-4 text-center text-cyan-400 scroll-to-hide cursor-pointer"
          v-if="more"
        >
          <a @click.prevent="(e) => (more = false)"><span></span>收起</a>
        </div>
      </div>
    </q-intersection>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { ConfigsPropDefine, IConfigProp } from '../types'
import { getProblems } from 'src/util'
import MathExamDialog from 'src/components/MathExamDialog.vue'

const props = defineProps({
  ...ConfigsPropDefine,
})

const $q = useQuasar()

const more = ref(false)

const params = reactive<IConfigProp>(props.configs)
const triplet = ref(Boolean(params.tripletPercent))

const percentLabel = computed(() => `${Number(params.tripletPercent) * 10}%`)

const emit = defineEmits<{
  (e: 'updateConfig', payload: IConfigProp): void
  (e: 'collapse'): void
}>()

const showMoreConfig = () => {
  more.value = true
  emit('collapse')
}

const saveTest = () => {
  const printables = [...getProblems(params)].splice(0, 40)
  console.log(printables)
  $q.dialog({
    component: MathExamDialog,

    // props forwarded to your custom component
    componentProps: {
      printables,
      // ...more..props...
    },
  })
    .onOk(() => {
      console.log('OK')
    })
    .onCancel(() => {
      console.log('Cancel')
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel')
    })
}

watch(triplet, (val) => {
  if (!val) {
    params.tripletPercent = 0
  } else {
    params.tripletPercent = 1
  }
})

watch(params, (val) => {
  Object.keys(params).forEach((key) => {
    if (typeof params[key] === 'string') {
      params[key] = Number(params[key])
    }
  })
  emit('updateConfig', params)
  triplet.value = Boolean(val.tripletPercent)
})
</script>

<style lang="scss">
.scroll a {
  position: absolute;
  bottom: 20px;
  left: 50%;
  z-index: 2;
  display: inline-block;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  color: rgb(39, 186, 223);
  font: normal 400 20px/1 'Josefin Sans', sans-serif;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: opacity 0.3s;
  font-size: 16px;
}

.scroll-to-hide a {
  left: 120%;
  bottom: 50%;
  transform: translateY(50%);
}

.scroll a {
  padding-top: 70px;
}

.scroll-to-hide a {
  padding-top: 10px;
}
.scroll a span {
  position: absolute;
  top: 0;
  left: 50%;
  width: 24px;
  height: 24px;
  margin-left: -12px;
  border-left: 2px solid rgb(39, 186, 223);
  border-bottom: 2px solid rgb(39, 186, 223);
  -webkit-transform: rotateZ(-45deg);
  transform: rotateZ(-45deg);
  -webkit-animation: sdb06 1.5s infinite;
  animation: sdb06 1.5s infinite;
  box-sizing: border-box;
}

.scroll-to-hide a span {
  top: 50px;
  animation: sdb06 reverse 1.5s infinite;
  border-left: none;
  border-bottom: none;
  border-right: 2px solid rgb(39, 186, 223);
  border-top: 2px solid rgb(39, 186, 223);
}

@keyframes sdb06 {
  0% {
    transform: rotateY(0) rotateZ(-45deg) translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotateY(720deg) rotateZ(-45deg) translate(-20px, 20px);
    opacity: 0;
  }
}
</style>
