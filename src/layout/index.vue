<template>
  <div class="layout">
    <layout-header></layout-header>
    <section class="layout-wrapper">
      <layout-aside></layout-aside>
      <layout-main></layout-main>
    </section>
  </div>
</template>

<script setup>
import LayoutAside from './layout-aside.vue'
import LayoutHeader from './layout-header.vue'
import LayoutMain from './layout-main.vue'
</script>

<style lang="stylus" scoped>
.layout
  height 100%
  display flex
  flex-direction column
  .layout-wrapper
    height 0
    flex 1
    display flex
</style>
