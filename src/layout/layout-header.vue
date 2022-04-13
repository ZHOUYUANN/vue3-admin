<template>
  <header class="header">
    <div class="header-logo">
      <figure>
        <img
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3835858067,383604916&fm=26&gp=0.jpg"
          alt=""
        />
      </figure>
      <h1>冬天里的向日葵11</h1>
    </div>
    <nav class="header-nav">
      <div class="header-nav__hamburger" @click="toggle">
        <svg-icon icon="hamburger-opened"></svg-icon>
      </div>
      <ul>
        <li>2</li>
        <li>
          <el-dropdown>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useAppStore } from '@/store/app'

const useStore = useAppStore()

function toggle() {
  useStore.toggleSide()
}
</script>

<style lang="stylus" scoped>
.header
  height 70px
  display flex
  align-items center
  border-bottom 1px solid #e5e9ec
  .header-logo
    width 250px
    height 70px
    display flex
    align-items center
    justify-content center
    figure
      width 44px
      height 44px
      img
        display block
        width 100%
        height 100%
        border-radius 5px
    h1
      font-size 18px
      color #333
      margin-left 10px
  .header-nav
    flex 1
    height 100%
    display flex
    align-items center
    justify-content space-between
    ul
      height 100%
      display flex
      align-items center
      li
        padding 0 20px
        font-size 14px
</style>
