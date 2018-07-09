/**
 */

import {cookieStorage} from 'common/storage'

export default {
  //用户信息和是否登录
  user_info: cookieStorage.get('user_info'),
  // 注册信息
  user_reg: cookieStorage.get('user_reg')
}
