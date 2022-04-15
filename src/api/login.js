import http from '@/utils/http'

export const login = (data) => {
  return http({
    url: '/api/login',
    data
  })
}

export const getUserInfo = () => {
  return http({
    url: '/api/userinfo'
  })
}
