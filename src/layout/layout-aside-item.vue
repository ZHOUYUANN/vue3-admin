<template>
  <template v-for="item in router">
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :index="item.path"
      :key="item.path"
    >
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
      <layout-aside-item :router="item.children"></layout-aside-item>
    </el-sub-menu>
    <el-menu-item v-else :index="item.path" :key="item.path">
      {{ item.meta.title }}
    </el-menu-item>
  </template>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  router: {
    type: Object,
    required: true
  }
})
</script>

<style lang="stylus" scoped></style>
