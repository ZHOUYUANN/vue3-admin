// 判断是否是外部资源
export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
