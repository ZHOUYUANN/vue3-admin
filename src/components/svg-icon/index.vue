<!--
  两种情况
  1. 可以选择展示外部的图标
  2. 可以选择展示内部的图标
  通过加载源是否有 http:// 或者 https:// 来判断是否是外部资源
-->
<template>
  <div
    v-if="flag"
    class="svg-icon external-icon"
    :style="externalIconStyle"
  ></div>
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="innerIconClass" />
  </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { isExternal } from '@/utils/utils'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})
// 判断是否加载外部资源
const flag = computed(() => isExternal(props.icon))

const externalIconStyle = computed(() => {
  return {
    mask: `url(${props.icon}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
  }
})

const innerIconClass = computed(() => `#icon-${props.icon}`)
</script>

<style lang="stylus" scoped>
.svg-icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden
  &.external-icon
    display inline-block
    background-color currentColor
    mask-size cover !important
</style>
