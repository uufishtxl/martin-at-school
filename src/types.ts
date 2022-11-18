import { PropType } from 'vue'

/**
 * { courseId: 1, teacher: '孙月'， courseName: '语文', courseValue: 'ch' }
 */
export interface Course {
  id: number
  teacher: string
  courseName: string
}

/**
 * { day: 1, seq: 2, courseId: 1 }
 */
export interface TableItem {
  day: number
  seq: number
  courseId: number
  grade: number
  semester: number
}

export interface RealTableItem {
  day: number
  seq: number
  courseId: number
  courseName: string
  teacher: string
}

export type ClassTable = RealTableItem[][]

export type IntervalTimer = ReturnType<typeof setInterval>

export type MathSymbol = 'plus' | 'minus' // | 'multiply' | 'divide'

export interface IProblem {
  n1: number
  s1: MathSymbol
  n2: number
  s2?: MathSymbol
  n3?: number
}

export const MinutesPropsDefine = {
  minutes: {
    type: Number,
    required: true,
  },
} as const

export const GoalPropsDefine = {
  goal: {
    type: Number,
    required: true,
  },
} as const

export interface IConfigProp {
  minutes: number
  goal: number
  maxDigit: number
  fastRate: boolean
  showQ: boolean
  autoVerify: boolean
  ignoreWrong: boolean
  tripletPercent: number
  questionOnLeft: boolean
}

export const ConfigsPropDefine = {
  configs: {
    type: Object as PropType<IConfigProp>,
    required: true,
  },
} as const

export interface IConfig {
  key: 'minutes' | 'goal' | 'maxDigit'
  value: number
}
