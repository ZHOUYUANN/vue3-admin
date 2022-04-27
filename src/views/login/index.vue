<template>
  <div class="login">
    <div class="login-wrapper">
      <h1>冬天里的向日葵</h1>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <span class="login-wrapper__svg">
            <svg-icon icon="user"></svg-icon>
          </span>
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span class="login-wrapper__svg">
            <svg-icon icon="password"></svg-icon>
          </span>
          <el-input
            v-model="loginForm.password"
            :type="flag ? 'text' : 'password'"
            placeholder="请输入密码"
            @keyup.enter="handleSubmit"
          ></el-input>
          <span class="login-wrapper__svg eye" @click="handleToggle">
            <svg-icon :icon="flag ? 'eye-open' : 'eye'"></svg-icon>
          </span>
        </el-form-item>
        <el-form-item prop="code">
          <span class="login-wrapper__svg">
            <svg-icon icon="verify"></svg-icon>
          </span>
          <el-input
            v-model="loginForm.code"
            type="text"
            placeholder="请输入验证码"
            @keyup.enter="handleSubmit"
          ></el-input>
          <img-verify
            ref="verifyRef"
            :height="38"
            :width="100"
            @success="getImgCodeSuccess"
          ></img-verify>
        </el-form-item>
      </el-form>
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        <template v-if="isLoading">登录中..</template>
        <template v-else>登录</template>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import ImgVerify from '@/components/img-verify'

// 验证码
const imgCode = ref('')
// 创建一个 ref 对象，用于控制登录表单的值
const loginForm = ref({
  username: 'admin',
  password: '123456',
  code: ''
})

// 自定义验证码的正确性
const validateCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入验证码'))
  } else if (imgCode.value !== loginForm.value.code.toLowerCase()) {
    callback(new Error('您输入的验证码不正确!'))
  } else {
    callback()
  }
}

// 创建一个 ref 对象，用于控制登录表单的规则
const loginRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: validateCode, trigger: 'blur' }
  ]
})

// 是否显示密码
const flag = ref(false)
// 点击切换密码显示状态
function handleToggle() {
  flag.value = !flag.value
}

// 是否显示登录按钮的 loading
const isLoading = ref(false)
// 获取验证码组件
const verifyRef = ref(null)
// 登录提交 form
const loginFormRef = ref(null)
// 获取用户的 store 对象
const userStore = useUserStore()
// 获取路由对象
const router = useRouter()
// 点击登录按钮
function handleSubmit() {
  isLoading.value = true
  // 判断表单是否通过验证
  loginFormRef.value.validate(async (valid) => {
    if (imgCode.value !== loginForm.value.code.toLowerCase()) {
      isLoading.value = false
      // 从新刷新验证码
      verifyRef.value.draw()
      return ElMessage.error('验证码错误')
    }
    if (valid) {
      await userStore.userLogin(loginForm.value)
      isLoading.value = false
      // 跳转到首页
      router.replace('/')
    } else {
      ElMessage.error('表单验证失败')
      isLoading.value = false
    }
  })
}

// 设置验证码
function getImgCodeSuccess(code) {
  imgCode.value = code.toLowerCase()
}
</script>

<style lang="stylus" scoped>
.login
  width 100%
  height 100%
  background #2e2e2e
  .login-wrapper
    width 360px
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    padding 20px
    border-radius 10px
    background-color #fff
    box-sizing border-box
    h1
      margin-bottom 30px
      text-align center
      font-size 20px
    :deep(.el-input)
      height 38px
      flex 1
      input
        height 100%
        padding 0 36px !important
    .login-wrapper__svg
      position absolute
      top 12px
      left 12px
      color #c0c4cc
      z-index 9
      &.eye
        left auto
        right 12px
        cursor pointer
    .el-button
      width 100%
      margin-top 20px
</style>
