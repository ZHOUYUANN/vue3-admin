<template>
  <div class="aside" :class="{ collapsed: isCollapse }">
    <el-menu :collapse="isCollapse">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><Document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><Setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
      <el-menu-item index="6">
        <el-icon><Setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
      <el-menu-item index="7">
        <el-icon><Setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from '@element-plus/icons-vue'
import { useAppStore } from '@/store/app'

const useStore = useAppStore()
const isCollapse = computed(() => useStore.isCollapse)
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
    border-right 1px solid #e5e9ec
    overflow-y scroll
</style>
