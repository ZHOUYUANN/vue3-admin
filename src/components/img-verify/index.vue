<template>
  <div class="verify" :style="verifyStyle">
    <canvas
      ref="verifyRef"
      :width="width"
      :height="height"
      @click="draw"
    ></canvas>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  defineProps,
  defineEmits,
  defineExpose
} from 'vue'
import { randomNum, randomColor } from '@/utils/utils'

// 固定值
const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

// 接受参数
const props = defineProps({
  code: {
    type: String,
    default: 'BUG'
  },
  width: {
    type: Number,
    default: 120
  },
  height: {
    type: Number,
    default: 40
  },
  islocal: {
    type: Boolean,
    default: true
  }
})

// 定义事件
const emits = defineEmits(['success'])

// 暴露方法
defineExpose({ draw })

// 获取验证码 dom 元素
const verifyRef = ref(null)

// 初始化加载验证码
onMounted(() => {
  draw()
})

// 初始化样式
const verifyStyle = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.height}px`
  }
})

// 绘制验证码
function randomCode() {
  // 如果需要外面传入验证码
  if (!props.islocal) {
    return props.code
  } else {
    let code = ''
    for (let i = 0; i < 4; i++) {
      code += pool[randomNum(0, pool.length - 1)]
    }
    return code
  }
}

// 绘制图片
function draw() {
  const code = randomCode()
  const ctx = verifyRef.value.getContext('2d')
  // 填充颜色
  ctx.fillStyle = randomColor(180, 230)
  // 填充的位置
  ctx.fillRect(0, 0, props.width, props.height)
  // 定义paramText
  let imgCode = ''
  // 4.随机产生字符串，并且随机旋转
  for (let i = 0; i < code.length; i++) {
    // 随机的四个字符
    const text = code[i]
    // // 随机的四个字
    // const text = pool[randomNum(0, pool.length)]
    imgCode += text
    // 随机的字体大小
    const fontSize = randomNum(18, 40)
    // 字体随机的旋转角度
    const deg = randomNum(-30, 30)
    const x = (i + 1) * (props.width / (code.length + 1))
    ctx.font = fontSize + 'px Simhei'
    ctx.textBaseline = 'top'
    ctx.fillStyle = randomColor(80, 150)
    ctx.save()
    ctx.translate(x, 15)
    ctx.rotate((deg * Math.PI) / 180)
    ctx.fillText(text, -5, -15)
    ctx.restore()
  }
  // 5.随机产生5条干扰线,干扰线的颜色要浅一点
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.moveTo(randomNum(0, props.width), randomNum(0, props.height))
    ctx.lineTo(randomNum(0, props.width), randomNum(0, props.height))
    ctx.strokeStyle = randomColor(180, 230)
    ctx.closePath()
    ctx.stroke()
  }
  // 6.随机产生40个干扰的小点
  for (let i = 0; i < 40; i++) {
    ctx.beginPath()
    ctx.arc(
      randomNum(0, props.width),
      randomNum(0, props.height),
      1,
      0,
      2 * Math.PI
    )
    ctx.closePath()
    ctx.fillStyle = randomColor(150, 200)
    ctx.fill()
  }

  // 返回验证码
  emits('success', imgCode)
  return imgCode
}
</script>

<style lang="stylus" scoped>
.verify
  border-radius 4px
  overflow hidden
  margin-left 10px
  canvas
    cursor pointer
</style>
