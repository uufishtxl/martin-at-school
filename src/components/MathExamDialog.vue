<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      id="problems"
      class="w-[595px] h-[842px] flex flex-col justify-start items-center bg-white"
    >
      <q-card-section
        class="w-full text-center bg-cyan-500 text-white relative"
      >
        <div class="text-h6">数学口算练习</div>
      </q-card-section>
      <q-card-section
        class="flex flex-row flex-wrap content-start mx-4 mt-2 my-24"
      >
        <div
          class="w-1/4 text-[16px] px-2 py-[12px]"
          v-for="(problem, pid) in printables"
          :key="pid"
        >
          {{ problem.n1 }} {{ problem.s1 === 'plus' ? '+' : '-' }}
          {{ problem.n2 }}
          {{ problem.s2 === 'plus' ? '+' : problem.s2 ? '-' : '' }}
          {{ problem.n3 || '' }} =
        </div>
      </q-card-section>

      <q-card-actions data-html2canvas-ignore="true">
        <q-btn color="cyan" label="下载" @click="onOKClick" />
        <q-btn color="cyan" label="取消" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { PropType } from 'vue'
import { IProblem } from 'src/types'
import { printHTML } from 'src/util'

export default defineComponent({
  name: 'UploadDialog',
  props: {
    // ...your own custom props
    title: {
      type: String,
      default: '数学口算',
    },
    printables: {
      type: Array as PropType<IProblem[]>,
      required: true,
    },
    fullWidth: {
      type: Boolean,
    },
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],
  setup() {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent()
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    return {
      dialogRef,
      onDialogHide,
      onOKClick: () => {
        printHTML('problems', `math-exam-${Math.ceil(Math.random())}`)
        onDialogOK()
      },
      onDialogOK,
      onCancelClick: onDialogCancel,
      printHTML,
    }
  },
})
</script>

<style>
#problems {
  box-shadow: unset !important;
}
</style>
