/**
 *
 */
import * as type from 'store/mutations/type'
import {cookieStorage} from 'common/storage'

export default {
  //设置用户信息和是否登录
  [type.SET_USER_INFO](state, userinfo){
    state.user_info = userinfo || {}
    if (userinfo === null) {
      cookieStorage.remove('user_info')
    } else {
      cookieStorage.set('user_info', userinfo)
    }
  },
  // 注册用户
  [type.SET_USER_REG](state,usereg){
    console.log(state+usereg)
    state.user_reg = usereg || {}
    if(usereg == null) {
      cookieStorage.remove('user_reg')
    } else {
      cookieStorage.set('user_reg', usereg)
    }
  }
}
