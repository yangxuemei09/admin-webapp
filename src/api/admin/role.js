import request from '@/utils/request'

// 查询角色列表
export function getAdminRoleList(data) {
  return request({
    url: 'adminRole/getAdminRoleList',
    method: 'post',
    data
  })
}

// 新增
export function addAdminRole(data) {
  return request({
    url: 'adminRole/addAdminRole',
    method: 'post',
    data
  })
}

// 修改
export function editAdminRole(data) {
  return request({
    url: 'adminRole/editAdminRole',
    method: 'post',
    data
  })
}

// 删除
export function deleteAdminRole(data) {
  return request({
    url: 'adminRole/deleteAdminRole',
    method: 'post',
    data
  })
}

