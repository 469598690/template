/**
 * @file: user.
 * @intro: 用户请求数据配置.
 *
 */

import fetch from 'common/fetch'
import {port_user} from 'common/port_uri'

//登录
export function login(data) {
  return fetch({
    url: port_user.login,
    method: 'post',
    data
  })
}
//登出
export function logout() {
  return fetch({
    url: port_user.logout,
    method: 'post'
  })
}


// 注册
export function register (data) {
  return fetch({
    url:port_user.register,
    method:'post',
    data
  })
}

// 获取验证码
export function addCode (data){
  return  fetch({
    url: port_user.addCode,
    method: 'post',
    data
  })
}

// 绑定信息
export function bindInfo(data){
  return fetch({
    url: port_user.bindInfo,
    method: 'post',
    data
  })
}


// 系统管理员查询应用号接口
export function queryUser(params){
  return fetch({
    url: port_user.queryuser,
    method: 'get',
    params
  })
}



// 验证绑定tmail是否合法
export function bindtmail(data){
  return fetch({
    url: port_user.mailurl,
    method: 'post',
    data
  })
}


// 更新应用号信息
export function updateBaseInfo(data){
  return fetch({
    url: port_user.baseInfo,
    method: 'post',
    data
  })
}

// 查询应用号主体信息
export function getInfo(params){
  return fetch({
    url: port_user.getInfo,
    method: 'get',
    params
  })
}




