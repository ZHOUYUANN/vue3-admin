// 存储数据
export const setStorage = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getStorage = (key) => {
  let value = window.localStorage.getItem(key)
  if (value && value.indexOf('{') === 0) {
    value = JSON.parse(value)
  }
  return value
}

// 删除数据
export const removeStorage = (key) => {
  window.localStorage.removeItem(key)
}

// 清空数据
export const clearStorage = () => {
  window.localStorage.clear()
}
