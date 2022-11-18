import { TableItem, Course } from '../types'

export const colors: string[] = [
  'primary',
  'secondary',
  'accent',
  'warning',
  'info',
  'negative',
  'positive',
  'red-5',
  'purple-5',
  'indigo-5',
  'teal-5',
  'cyan-6',
  'lime-9',
  'yellow-14',
  'amber-7',
  'orange-9',
  'brown-7',
  'grey-6',
]

export const courseIcons: string[] = [
  'chinese',
  'math',
  'english',
  'exercise',
  'exercise',
  'music',
  'english',
  'activity',
  'more',
  'math',
  'law',
  'paint',
  'nature',
  'club',
  'discovery',
  'write',
  'exercise',
]

export const courses: Course[] = [
  {
    id: 1,
    courseName: '语文',
    teacher: '孙月',
  },
  { id: 2, courseName: '数学', teacher: '杨晓敏' },
  { id: 3, courseName: '英语', teacher: '顾徐杨' },
  { id: 4, courseName: '体育', teacher: '吴雨晨' },
  { id: 5, courseName: '体锻', teacher: '教练' },
  { id: 6, courseName: '唱游', teacher: '曹迪一' },
  { id: 7, courseName: '英拓', teacher: '顾徐杨' },
  {
    id: 8,
    courseName: '少先队活动',
    teacher: '孙月',
  },
  { id: 9, courseName: '拓展', teacher: '专人' },
  {
    id: 10,
    courseName: '数思',
    teacher: '杨晓敏',
  },
  {
    id: 11,
    courseName: '道·法',
    teacher: '孙月',
  },
  { id: 12, courseName: '美术', teacher: '卞本正' },
  {
    id: 13,
    courseName: '自然',
    teacher: '高慈英',
  },
  {
    id: 14,
    courseName: '俱乐部',
    teacher: '专门人',
  },
  {
    id: 15,
    courseName: '探究',
    teacher: '徐美红',
  },
  {
    id: 16,
    courseName: '写字',
    teacher: '孙月',
  },
  {
    id: 17,
    courseName: '体育2',
    teacher: '顾徐杨',
  },
]

export const tables: TableItem[] = [
  // 周一
  {
    day: 1,
    seq: 1,
    courseId: 1,
    grade: 1,
    semester: 1,
  },
  {
    day: 1,
    seq: 2,
    courseId: 6,
    grade: 1,
    semester: 1,
  },
  {
    day: 1,
    seq: 3,
    courseId: 4,
    grade: 1,
    semester: 1,
  },
  {
    day: 1,
    seq: 4,
    courseId: 5,
    grade: 1,
    semester: 1,
  },
  {
    day: 1,
    seq: 5,
    courseId: 6,
    grade: 1,
    semester: 1,
  },
  {
    day: 1,
    seq: 6,
    courseId: 7,
    grade: 1,
    semester: 1,
  },
  {
    day: 1,
    seq: 7,
    courseId: 7,
    grade: 1,
    semester: 1,
  },
  // 周二
]

// const myIcons = {
//   'app:math': 'img:/src/assets/icons/icon-math.svg'
// }
