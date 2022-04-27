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
      <div class="header-nav__hamburger" @click="appStore.toggleSide()">
        <svg-icon icon="hamburger-opened"></svg-icon>
      </div>
      <ul>
        <li>
          <svg-icon icon="search"></svg-icon>
        </li>
        <li>
          <svg-icon icon="fullscreen"></svg-icon>
        </li>
        <li>
          <el-dropdown trigger="click" @command="handleDraw">
            <span>
              admin
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="website">访问网站</el-dropdown-item>
                <el-dropdown-item command="logout" divided>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'

const userStore = useUserStore()
const appStore = useAppStore()

function handleDraw(value) {
  if (value === 'website') {
    window.open('https://www.baidu.com')
  } else if (value === 'logout') {
    userStore.userLogout()
  }
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
    .header-nav__hamburger
      font-size 20px
    ul
      height 100%
      display flex
      align-items center
      padding 0 10px
      li
        padding 0 10px
        font-size 18px
</style>
