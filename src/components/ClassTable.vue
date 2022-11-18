<template>
  <div
    class="flex justify-center items-center w-full text-[16px] lg-text-[12px] xl:text-[20px]"
    v-show="coursesRef.length && tableRef.length"
  >
    <div class="flex flex-col w-full mx-16 gap-y-2">
      <!-- 标题栏 -->
      <div
        class="bg-contain bg-bottom p-2"
        style="background: url('img/blackboard.jpg')"
      >
        <div class="text-center text-[1.5em] font-bold text-white">课程表</div>
        <q-separator color="white" spaced="lg" />
        <!-- WEEKDAYS -->
        <div class="w-full flex flex-row font-bold text-center">
          <div class="w-1/6 gt-md"></div>
          <div
            class="w-full flex flex-row pl-4 justify-between text-[1.2em] lg:w-5/6"
          >
            <div class="w-[19%] text-primary">星期一</div>
            <div class="w-[19%] text-secondary">星期二</div>
            <div class="w-[19%] text-accent">星期三</div>
            <div class="w-[19%] text-warning">星期四</div>
            <div class="w-[19%] text-info">星期五</div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-row justify-between gap-x-2">
        <!-- 课程列在xl以下尺寸不显示 -->
        <div
          class="gt-md w-1/6 flex items-start justify-center"
          style="background: url('img/blackboard.jpg')"
        >
          <q-list dark class="text-[1em] w-full">
            <q-item
              clickable
              v-ripple
              class="h-20 px-12 text-center hover:bg-white/20"
            >
              <q-item-section avatar>
                <q-icon class="w-[1em] h-[1em]">
                  <svg>
                    <use xlink:href="icons.svg#new-course"></use>
                  </svg>
                </q-icon>
              </q-item-section>
              <q-item-section>编辑课程</q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              class="h-20 px-12 text-center hover:bg-white/20"
            >
              <q-item-section avatar>
                <q-icon class="w-[1em] h-[1em]">
                  <svg>
                    <use xlink:href="icons.svg#homework-today"></use>
                  </svg>
                </q-icon>
              </q-item-section>
              <q-item-section>今日作业</q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              class="h-20 px-12 text-center hover:bg-white/20"
            >
              <q-item-section avatar>
                <q-icon class="w-[1em] h-[1em]">
                  <svg>
                    <use xlink:href="icons.svg#assign-homework"></use>
                  </svg>
                </q-icon>
              </q-item-section>
              <q-item-section>新增作业</q-item-section>
            </q-item>
          </q-list>
        </div>
        <!-- 课程表在xl以下占据所有尺寸 -->
        <div class="w-full flex flex-row justify-between lg:w-[82%]">
          <!-- 星期{n}所在的div -->
          <div
            v-for="(day, id) in realTableRef"
            :key="id"
            class="w-[19.2%] flex flex-col gap-y-2"
          >
            <!-- seq 所在的 div 循环 -->
            <div
              v-for="(seq, sid) in day"
              :key="sid"
              :class="`h-16 flex flex-row items-center px-4 bg-primary rounded-md text-white bg-${
                colors[seq.courseId % colors.length]
              }`"
            >
              <div class="w-1/5">
                <div
                  class="rounded-full bg-white w-[1.8em] h-[1.8em] flex justify-center items-center"
                  round
                  text-color="primary"
                >
                  <q-icon
                    :color="colors[seq.courseId % colors.length]"
                    size="1.2em"
                  >
                    <svg>
                      <use
                        :xlink:href="`icons.svg#${
                          courseIcons[seq.courseId - 1]
                        }`"
                      ></use>
                    </svg>
                  </q-icon>
                </div>
              </div>
              <div class="w-3/5 text-center text-[1em]">
                {{ seq.courseName }}
              </div>
              <div class="w-1/5 text-[0.6em] text-right">{{ seq.teacher }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from 'src/supabase/init.js'
import { useQuasar, QSpinnerFacebook } from 'quasar'
import { Course, TableItem, ClassTable, RealTableItem } from 'src/types'
import { colors, courseIcons } from 'src/data'

const $q = useQuasar()

const coursesRef = ref<Course[]>([])
const tableRef = ref<TableItem[]>([])

$q.loading.show({
  spinner: QSpinnerFacebook,
  spinnerColor: 'yellow',
  spinnerSize: 140,
  backgroundColor: 'gray',
  message: '正在下载课程表，请稍后……',
  messageColor: 'black',
})

const getCourses = async () => {
  try {
    let { data: courses, error } = await supabase.from('courses').select('*')
    if (error) throw error
    if (courses !== null) {
      coursesRef.value = courses as Course[]
    }
  } catch (error) {
    $q.notify({
      position: 'top',
      message: (error as { message: string }).message,
      type: 'negative',
    })
  }
}

// TODO 让App可以自动计算当前时间所处的学年和学期
const getTable = async () => {
  try {
    let { data: classtable, error } = await supabase
      .from('classtables')
      .select('*')
      .eq('grade', 1)
      .eq('semester', 1)
    if (error) throw error
    if (classtable !== null) {
      tableRef.value = classtable as TableItem[]
    }
  } catch (error) {
    $q.notify({
      position: 'top',
      message: (error as { message: string }).message,
      type: 'negative',
    })
  }
}

const realTableRef = ref<ClassTable>([])

const getData = async () => {
  await getCourses()
  await getTable()
  if (coursesRef.value.length && tableRef.value.length) {
    $q.loading.hide()
    const res: ClassTable = []
    for (let i = 1; i <= 5; i++) {
      const data: RealTableItem[] = []
      tableRef.value.forEach((t: TableItem) => {
        if (t.day === i) {
          const courseInfo: Course = coursesRef.value.find(
            (e) => e.id === t.courseId
          ) || { id: 0, teacher: '未知', courseName: '未知' }
          const { courseName, teacher } = courseInfo
          data.push({
            day: i,
            seq: t.seq,
            courseId: t.courseId,
            courseName,
            teacher,
          })
        }
      })
      // 按照 sequence 升序排列
      data.sort((a, b) => {
        return a.seq - b.seq
      })
      res.push(data)
    }
    res.sort((a, b) => {
      return a[0].day - b[0].day
    })
    console.log(res)
    realTableRef.value = res
  } else {
    return []
  }
}

void getData()
</script>
