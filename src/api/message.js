/**
 * @file: message.
 * @intro: message请求数据配置.
 *
 */

import fetch from 'common/fetch'
import {port_message} from 'common/port_uri'

//数据列表
export function list(data) {
  return fetch({
    url: port_message.getmessage,
    method: 'post',
    data
  })
}

//收藏
export function collect(data) {
  return fetch({
    url: port_message.collect,
    method: 'post',
    data
  })
}

//回复消息
export function reply(data) {
  return fetch({
    url: port_message.replymessage,
    method: 'post',
    data
  })
}


//查询已收藏消息接口
export function getcollected(data) {
  return fetch({
    url: port_message.getcollected,
    method: 'post',
    data
  })
}


