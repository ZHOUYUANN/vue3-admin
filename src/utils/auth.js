import { setStorage, getStorage } from './storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from './constant'

// 获取时间戳
export const getTimestamp = () => {
  return getStorage(TIME_STAMP)
}

// 设置当前时间戳
export const setTimestamp = () => {
  setStorage(TIME_STAMP, new Date().getTime())
}

// 判断是否超时
export const isCheckTimeout = () => {
  const timestamp = getTimestamp()
  if (!timestamp) {
    return true
  }
  const now = new Date().getTime()
  return now - timestamp > TOKEN_TIMEOUT_VALUE
}
