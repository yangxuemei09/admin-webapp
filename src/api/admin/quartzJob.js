import request from '@/utils/request'

// 查询角色列表
export function getAdminQuartzJobList(data) {
  return request({
    url: 'adminQuartzJob/getAdminQuartzJobList',
    method: 'post',
    data
  })
}

// 新增
export function addAdminQuartzJob(data) {
  return request({
    url: 'adminQuartzJob/addAdminQuartzJob',
    method: 'post',
    data
  })
}

// 修改
export function editAdminQuartzJob(data) {
  return request({
    url: 'adminQuartzJob/editAdminQuartzJob',
    method: 'post',
    data
  })
}

// 删除
export function deleteAdminQuartzJob(data) {
  return request({
    url: 'adminQuartzJob/deleteAdminQuartzJob',
    method: 'post',
    data
  })
}

