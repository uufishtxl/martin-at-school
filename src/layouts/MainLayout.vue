<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="h-16 flex items-center justify-center bg-[#4873E0]">
      <q-toolbar class="bg-[#4873E0]">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Martin@School </q-toolbar-title>

        <div class="flex flex-row gap-x-4 text-white">
          <svg fill="currentColor" aria-hidden="true" class="h-5 w-5">
            <use xlink:href="icons.svg#config"></use>
          </svg>

          <svg
            fill="currentColor"
            aria-hidden="true"
            class="h-5 w-5 cursor-pointer"
          >
            <use xlink:href="icons.svg#print"></use>
          </svg>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :mini="miniState"
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="500"
      :width="200"
      class="bg-zinc-700"
      bordered
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item
            class="h-16 text-white"
            clickable
            v-ripple
            :active="active === 'timetable'"
            @click="redirectPage('/')"
          >
            <q-item-section avatar>
              <q-icon color="white" size="1.5rem">
                <svg>
                  <use xlink:href="icons.svg#timetable"></use>
                </svg>
              </q-icon>
            </q-item-section>
            <q-item-section>课程表</q-item-section>
          </q-item>
          <q-item
            class="h-16 text-white"
            clickable
            v-ripple
            :active="active === 'timetable'"
            @click="redirectPage('/do-math')"
          >
            <q-item-section avatar>
              <q-icon color="white" size="1.5rem">
                <svg>
                  <use xlink:href="icons.svg#math"></use>
                </svg>
              </q-icon>
            </q-item-section>
            <q-item-section>做口算</q-item-section>
          </q-item>

          <q-item
            class="h-16 text-white"
            clickable
            v-ripple
            :active="active === 'timetable'"
          >
            <q-item-section avatar>
              <q-icon color="white" size="1.5rem">
                <svg>
                  <use xlink:href="icons.svg#album"></use>
                </svg>
              </q-icon>
            </q-item-section>
            <q-item-section>翻相册</q-item-section>
          </q-item>

          <q-item
            class="h-16 text-white"
            clickable
            v-ripple
            :active="active === 'timetable'"
          >
            <q-item-section avatar>
              <q-icon color="white" size="1.5rem">
                <svg>
                  <use xlink:href="icons.svg#wrongs"></use>
                </svg>
              </q-icon>
            </q-item-section>
            <q-item-section>习故错</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
      <div id="container" class="hidden"></div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const $router = useRouter()
    const leftDrawerOpen = ref(false)

    const active = ref('timetable')
    const miniState = ref(true)

    const redirectPage = (str: string) => {
      void $router.push(`${str}`)
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      active,
      miniState,
      redirectPage,
    }
  },
})
</script>
