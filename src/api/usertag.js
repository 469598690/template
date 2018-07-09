/**
 * @file: message.
 * @intro: message请求数据配置.
 *
 */

import fetch from 'common/fetch'
import {port_usertag} from 'common/port_uri'

//数据列表
export function getlist(params) {
 
  return fetch({
    url: port_usertag.getusertag,
    method: 'get',
    params
  })
}
//获取标签列表
export function gettags(params) {
 
  return fetch({
    url: port_usertag.gettags,
    method: 'get',
    params
  })
}
//删除标签列表中标签
export function deletetags(data) {
 
  return fetch({
    url: port_usertag.deletetags,
    method: 'post',
    data
  })
}
//新建标签列表中标签
export function cratetags(data) {
 
  return fetch({
    url: port_usertag.cratetags,
    method: 'post',
    data
  })
}

//打标签
export function toflag(data) {
 
  return fetch({
    url: port_usertag.toflag,
    method: 'post',
    data

  })
}

//编辑标签列表中标签
export function edittag(data) {
 
  return fetch({
    url: port_usertag.edittag,
    method: 'post',
    data
  })
}




//编辑标签列表中标签
export function changetags(data) {
 
  return fetch({
    url: port_usertag.changetags,
    method: 'post',
    data
  })
}


