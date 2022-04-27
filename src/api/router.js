import http from '@/utils/http'

export const getRouters = () => {
  return http({
    url: '/api/getRouters'
  })
}
