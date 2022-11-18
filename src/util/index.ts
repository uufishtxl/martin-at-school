import html2canvas from 'html2canvas'
import { MathSymbol, IConfigProp, IProblem } from 'src/types'
//////////////////////////// Audio Play //////////////////
// Play Computer Voice

export function getWindowVoice() {
  const voices = window.speechSynthesis.getVoices() //返回当前设备所有可用声音的列表
  let res
  for (let i = 0; i < voices.length; i++) {
    if (
      voices[i].default &&
      voices[i].localService &&
      voices[i].lang === 'zh-CN'
    ) {
      res = voices[i]
    }
  }
  return res
}

export function handleSpeak(str: string, fastRate: boolean) {
  const synth = window.speechSynthesis
  const msg = new SpeechSynthesisUtterance() // 创建语音文本示例
  msg.text = str
  msg.lang = 'zh-CN'
  msg.volume = 2
  msg.rate = fastRate ? 2 : 1
  msg.pitch = 1
  msg.voice = getWindowVoice() || null // eslint-disable-this-line
  synth.speak(msg)
}

export function playLocal(str: string, fastRate: boolean) {
  // console.log('play', str)
  window.speechSynthesis.cancel() // 取消播放队列
  handleSpeak(str, fastRate) //调用方法合成语音进行播放
}

// Do router

export function handleTwoNums(symbol: MathSymbol, n1: number, n2: number) {
  switch (symbol) {
    case 'plus':
      return n1 + n2
    case 'minus':
      return n1 - n2
    default:
      return 1000
  }
}

let numA = 0
let numB = 0
let numC: number | undefined
let symbolA: MathSymbol = 'plus'
let symbolB: MathSymbol | undefined

export function getEquation(configs: IConfigProp, isTriplet: boolean) {
  numA = Math.ceil(Math.random() * configs.maxDigit)
  numB = Math.ceil(Math.random() * configs.maxDigit)
  numC = isTriplet ? Math.ceil(Math.random() * configs.maxDigit) : 0
  symbolA = Math.ceil(Math.random() * 10) % 2 === 0 ? 'plus' : 'minus'
  symbolB = isTriplet
    ? Math.ceil(Math.random() * 10) % 2 === 0
      ? 'plus'
      : 'minus'
    : 'plus'
  if (
    symbolA === 'plus' &&
    symbolB === 'plus' &&
    numA + numB + numC > configs.maxDigit
  ) {
    getEquation(configs, isTriplet)
  } else if (
    symbolA === 'minus' &&
    symbolB === 'minus' &&
    numA - numB - numC < 0
  ) {
    getEquation(configs, isTriplet)
  } else if (
    symbolA === 'plus' &&
    symbolB === 'minus' &&
    (numA + numB > configs.maxDigit || numA + numB - numC < 0)
  ) {
    getEquation(configs, isTriplet)
  } else if (
    symbolA === 'minus' &&
    symbolB === 'plus' &&
    (numA - numB < 0 || numA - numB + numC > configs.maxDigit)
  ) {
    getEquation(configs, isTriplet)
  }
}

export function getProblems(configs: IConfigProp): IProblem[] {
  const total = configs.minutes * 90 // 90
  const res: IProblem[] = []
  for (let i = 0; i < total; i++) {
    const isTriplet =
      configs.tripletPercent !== 0 &&
      i % Math.ceil(10 / configs.tripletPercent) === 0
    getEquation(configs, isTriplet)
    res.push({
      n1: numA,
      n2: numB,
      s1: symbolA,
      n3: isTriplet ? numC : undefined,
      s2: isTriplet ? symbolB : undefined,
    })
  }
  res.sort(() => Math.random() - 0.5)
  return res
}

export function saveFile(data: string, filename: string) {
  const save_link: HTMLElement = document.createElementNS(
    'http://www.w3.org/1999/xhtml',
    'a'
  )

  if (save_link instanceof HTMLAnchorElement) {
    save_link.href = data

    save_link.download = filename
  }

  const event = document.createEvent('MouseEvents')

  event.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  )

  save_link.dispatchEvent(event)
}

export function printHTML(id: string, filename: string) {
  console.log(111, document.getElementById(id))
  const content: HTMLElement | null = document.getElementById(id)
  const container: HTMLElement | null = document.getElementById('container')
  console.log(content, container)
  if (content && container) {
    void html2canvas(content, {
      backgroundColor: '#fff',
    }).then((canvas: HTMLCanvasElement) => {
      container.appendChild(canvas)
      const imgData: string = canvas.toDataURL('img/png')
      void saveFile(imgData, filename)
    })
  }
}
