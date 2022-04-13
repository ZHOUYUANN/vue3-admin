<template>
  <main class="main">
    <div class="main-tag">
      <ul>
        <li>首页</li>
        <li>自定义图标</li>
        <li>的接口我</li>
      </ul>
    </div>
    <div class="main-wrapper">
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
    </div>
  </main>
</template>

<script setup></script>

<style lang="stylus" scoped>
.main
  flex 1
  display flex
  flex-direction column
  background #f0f0f0
  .main-tag
    width 100%
    height 32px
    display flex
    align-items center
    box-shadow 0 5px 5px #ddd
    background #fff
    box-sizing border-box
    ul
      display flex
      justify-content center
      align-items center
      li
        height 26px
        line-height 26px
        padding 0 8px
        border 1px solid #f1f1f1
        font-size 12px
        margin-left 5px
        box-sizing border-box
  .main-wrapper
    flex 1
    padding 14px
    overflow-y scroll
    p
      height 90px
</style>
