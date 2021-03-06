/**
 * @file: file.
 * @intro: file请求数据配置.
 *
 */

import fetch from 'common/fetch'
import {port_file} from 'common/port_uri'

//图片上传
export function image_upload(data) {
  return fetch({
    url: port_file.image,
    method: 'post',
    data
  })
}
