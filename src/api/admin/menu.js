import request from '@/utils/request'

// 根据权限获取菜单树
export function getMenusTreeByRole(roleId) {
  return request({
    url: 'adminMenuRole/getMenusTreeByRole',
    method: 'post',
    data: {
      roleId
    }
  })
}

// 获取所有的菜单树
export function getMenusTree(data) {
  return request({
    url: 'adminMenu/getMenusTree',
    method: 'post',
    data
  })
}
// 新增
export function addAdminMenu(data) {
  return request({
    url: 'adminMenu/addAdminMenu',
    method: 'post',
    data
  })
}
// 修改
export function editAdminMenu(data) {
  return request({
    url: 'adminMenu/editAdminMenu',
    method: 'post',
    data
  })
}
// 删除
export function deleteAdminMenu(data) {
  return request({
    url: 'adminMenu/deleteAdminMenu',
    method: 'post',
    data
  })
}
// 根据id获取菜单信息
export function getAdminMenuById(data) {
  return request({
    url: 'adminMenu/getAdminMenuById',
    method: 'post',
    data
  })
}
