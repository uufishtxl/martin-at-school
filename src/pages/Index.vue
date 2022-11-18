<template>
  <q-page class="row items-center justify-evenly">
    <ClassTable />
  </q-page>
</template>

<script lang="ts">
import ClassTable from 'src/components/ClassTable.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  components: { ClassTable },
  // setup() {},
})
</script>
