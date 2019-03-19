import request from '@/utils/request'

// 查询用户列表
export function getAdminUserList(data) {
  return request({
    url: 'adminUser/getAdminUserList',
    method: 'post',
    data
  })
}

// 新增
export function addAdminUser(data) {
  return request({
    url: 'adminUser/addAdminUser',
    method: 'post',
    data
  })
}
// 修改
export function editAdminUser(data) {
  return request({
    url: 'adminUser/editAdminUser',
    method: 'post',
    data
  })
}

// 修改密码
export function editAdminUserPassword(data) {
  return request({
    url: 'adminUser/editAdminUserPassword',
    method: 'post',
    data
  })
}

// 删除
export function deleteAdminUser(data) {
  return request({
    url: 'adminUser/deleteAdminUser',
    method: 'post',
    data
  })
}

// 上传头像
export function updateAvatar(data) {
  return request({
    url: 'adminUser/updateAvatar',
    method: 'post',
    data
  })
}

