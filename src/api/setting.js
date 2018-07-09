// 设置选项

import fetch from 'common/fetch'
import {port_setting} from 'common/setting'

// 更新信息
export function upData(data){
  return fetch({
    url:port_setting.upData,
    method: 'post',
    data
  })
}

// 审核通过
export function review(data){
  return fetch({
    url:port_setting.review,
    method:'post',
    data
  })
}

// 停用
export function stop(data){
  return fetch({
    url: port_setting.stop,
    method: 'post',
    data
  })
}

// 查看详情
export function details(params){
  return fetch({
    url: port_setting.details,
    method:'get',
    params
  })
}

// 查询应用号
export function query(params){
  return fetch({
    url: port_setting.query,
    method: 'get',
    params
  })
}


// 管理员查询
export function superQuer(params) {
  return fetch({
    url: port_setting.superQuer,
    method:'get',
    params
  })
}

// 系统管理员审核
export function afitApp(data){
  return fetch({
    url:port_setting.afitApp,
    method: 'post',
    data
  })
}