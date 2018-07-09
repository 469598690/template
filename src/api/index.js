/**
 * @file: index.
 * @intro: api请求索引.
 *
 */

//导入模块
import * as api_file from './file'
import * as api_table from './table'
import * as api_user from './user'

import * as api_message from './message'
import * as api_media from './media'
import * as api_usertag from './usertag'
import * as api_menu from './menu'

import * as api_setting from './setting'

import * as api_reply from './autoreply'


const apiObj = {
  api_file,
  api_table,
  api_user,
  api_message,
  api_media,
  api_usertag,
  api_menu,
  api_setting,
  api_reply
}

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get() {
        return apiObj
      }
    }
  })
}

export default {
  install
}
