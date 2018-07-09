/**
 * @file: .
 * @intro: 请求数据配置.
 *
 */

import fetch from 'common/fetch'
import {port_media} from 'common/port_uri'

//数据列表
export function getlist(data) {
 
  return fetch({
    url: port_media.getmedia,
    method: 'post',
    data
  })
}
//素材总条数
export function getnum(data) {
  return fetch({
    url: port_media.getnum,
    method: 'post',
    data
  })
}

//素材总条数
export function savemedia(data) {
  return fetch({
    url: port_media.savemedia,
    method: 'post',
    data
  })
}

//编辑图文
export function editmedia(data) {
  return fetch({
    url: port_media.editmedia,
    method: 'post',
    data
  })
}
removemedia

//删除图文
export function removemedia(data) {
  return fetch({
    url: port_media.removemedia,
    method: 'post',
    data
  })
}

//群发图文
export function sendedia(data) {
  return fetch({
    url: port_media.sendmedia,
    method: 'post',
    data
  })
}
//超级群发图文
export function superSend(data) {
  return fetch({
    url: port_media.supersend,
    method: 'post',
    data
  })
}



//超级群发图文
export function supersendInput(data) {
  return fetch({
    url: port_media.supersendinput,
    method: 'post',
    data
  })
}

//根据title搜索图文消息
export function searchmedia(data) {
  return fetch({
    url: port_media.searchmedia,
    method: 'post',
    data
  })
}

