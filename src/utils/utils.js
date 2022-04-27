// 判断是否是外部资源
export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 生成随机数
export const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

// 生成随机颜色
export const randomColor = (min, max) => {
  return `
    rgb(${randomNum(min, max)}, ${randomNum(min, max)}, ${randomNum(min, max)})
    `
}

// 判断数据是否为空
export const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
