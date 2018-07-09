/**
 *
 */

import Mock from 'mockjs'
import {port_code, port_user} from 'common/port_uri'

// Mock.mock(new RegExp(port_user.login), ({body}) => {
//   const {bindTmail, password} = JSON.parse(body)
//   if (bindTmail === 'admin' && password === 'admin') {
//    // console.log('mock login');
//     return Mock.mock({
//       code: port_code.success,
//       message: "登录成功",
//       data: {
//         'name': '@cname',
//         'avatar': 'https://avatars0.githubusercontent.com/u/16893554?v=3&s=240',
//         'age|20-25': 20,
//         'desc': '@csentence()',
//         'id':1
//       }
//     })
//   } else {
//     return Mock.mock({
//       code: port_code.error,
//       message: "账号或密码错误"
//     })
//   }
// })

Mock.mock(new RegExp(port_user.logout), {
  code: port_code.success,
  message: "退出成功"
})
