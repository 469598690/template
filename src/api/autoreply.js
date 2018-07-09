/**
 * @file: user.
 * @intro: 用户请求数据配置.
 *
 */

import fetch from 'common/fetch'
import {port_reply} from 'common/port_uri'

//登录
export function save(data) {
  return fetch({
    url: port_reply.replyuri,
    method: 'post',
    data
  })
}
