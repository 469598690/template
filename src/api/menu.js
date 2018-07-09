// 菜单

import fetch from 'common/fetch'
import {port_menu} from 'common/menu'


// 查询菜单
export function queryMenus(params){
  return fetch({
    url: port_menu.serach,
    method: 'get',
    params
  })
}

// 菜单排序
export function sortMenu(data){
  return fetch({
    url: port_menu.sort,
    method: 'post',
    data
  })
}

// 菜单编辑
export function updateMenu(data){
  return fetch({
    url: port_menu.update,
    method: 'post',
    data
  })
}

// 保存菜单
export function saveMenu(data){
  return fetch({
    url: port_menu.save,
    method: 'post',
    data
  })
}

// 删除菜单
export function delMenu(data){
  return fetch({
    url: port_menu.del,
    method: 'post',
    data
  })
}