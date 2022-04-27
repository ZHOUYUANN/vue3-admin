<template>
  <div class="aside" :class="{ collapsed: isCollapse }">
    <el-menu :default-active="isActive" :collapse="isCollapse" router>
      <layout-aside-item :router="getSidebarRouters"></layout-aside-item>
    </el-menu>
  </div>
</template>

<script setup>
import LayoutAsideItem from './layout-aside-item'
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import { useRouterStore } from '@/store/router'
import { useRoute } from 'vue-router'

const app = useAppStore()
const isCollapse = computed(() => app.isCollapse)

const routerStore = useRouterStore()
const getSidebarRouters = computed(() => routerStore.getSidebarRouters)

const route = useRoute()
const isActive = computed(() => route.path)
</script>

<style lang="stylus" scoped>
.aside
  width 250px
  display flex
  flex-direction column
  transition all .3s
  &.collapsed
    width 64px
  ul
    height 0
    flex 1
    border-right none
    overflow-y scroll
</style>
