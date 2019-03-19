import request from '@/utils/request'

export function login(userName, password) {
  return request({
    url: 'login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function getUserInfoByToken(token) {
  return request({
    url: 'getUserInfoByToken',
    method: 'post',
    data: {
      token
    }
  })
}

