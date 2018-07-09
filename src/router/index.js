/**
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
//404
import waitComponent from 'pages/error/wait'


import soarticleComponent from 'pages/sOperate/article'
import sosendComponent from 'pages/sOperate/grouphair'
import sostratorsComponent from 'pages/sOperate/strators'
//404


//login
import loginComponent from 'pages/user/login'
//register
import registerComponent from 'pages/user/register/index'
//register
import bindMailComponent from 'pages/user/register/children/bindMail/index'

//base table
// import baseTableComponent from 'pages/table/base'
// //sort table
// import sortTableComponent from 'pages/table/sort'
// //save table
// import saveTableComponent from 'pages/table/save'
// //bar charts
// import barChartsComponent from 'pages/charts/bar'

//manage message
import msgManageComponent from 'pages/manage/message/index'
//manage user
import userManageComponent from 'pages/manage/user/index'
//manage media
import mediaManageComponent from 'pages/manage/media/index'
//manage save media
import saveMediaComponent from 'pages/manage/media/save'

//Analysis
import userAnalysisComponent from 'pages/analysis/user/index'

//help hot
import hotHelpComponent from 'pages/help/hot/index'
//help register
import registerHelpComponent from 'pages/help/register/index'

//setting personal
// import settingGroupauditComponent from 'pages/setting/groupaudit/index'
//help record
import recordSettingComponent from 'pages/setting/record/index'
//help security
import securitySettingComponent from 'pages/setting/security/index'
//help update
import updateSettingComponent from 'pages/setting/update/index'
// strators
import stratorsSettingComponent from 'pages/setting/strators/index'
// article
import articaleComponent from 'pages/setting/article/index'
import Superadministrator from 'pages/setting/Superadministrator'

//setting personInfo
import personInfoComponent from 'pages/setting/personInfo/index'

//advanced autoreply
import replayAdvancedComponent from 'pages/advanced/autoreply/index'
//advanced menuSetting
import menuAdvancedComponent from 'pages/advanced/menuSetting/index'
// advancedGrouphairComponent
import advancedGrouphairComponent from 'pages/advanced/grouphair/index'


// develop
import developCodeComponent from 'pages/develop/index'

import superSendComponent from 'pages/advanced/grouphair/super'

Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),

const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent,
  meta: {
    requireAuth: false
   }
},
{
  path: '/operate_article',
  name: 'notPage',
  component: soarticleComponent,
  meta: {
    requireAuth: false
   }
},
{
  path: '/operate_send',
  name: 'notPage',
  component: sosendComponent,
  meta: {
    requireAuth: false
   }
},
{
  path: '/operate_strators',
  name: 'notPage',
  component: sostratorsComponent,
  meta: {
    requireAuth: false
   }
},
{
  path: '/wait',
  name: 'wait',
  component: waitComponent,
  meta: {
    requireAuth: false
   }
},
{
  path: '*',
  redirect: '/404',
  meta: {
    requireAuth: false
   }
}, {
  path: '/',
  name: 'login',
  component: loginComponent,
  meta: {
    requireAuth: false
   }
}, 
{
  path: '/bind_mail/:code',
  name: 'bindMail',
  component: bindMailComponent,
  meta: {
   requireAuth: false
  }
},
{
  path: '/user/register',
  name: 'register',
  component: registerComponent,
  meta: {
   requireAuth: false
  }
},{
  path: '/home',
  redirect: '/home',
  component: viewPageComponent,
  meta: {
    requireAuth: true
   },
  children: [{
    path: '/home',
    name: 'home',
    component: homeComponent,
    meta: {
      title: "主页",
      auth: true
    }
  }, 
  // {
  //   path: '/table/base',
  //   name: 'tableBase',
  //   component: baseTableComponent,
  //   meta: {
  //     title: "基本表格",
  //     auth: true,
  //     supertype:1
  //   }
  // }, 
  {
    path: '/advanced/autoreplay',
    name: 'autoreplay',
    component: replayAdvancedComponent,
    meta: {
      title: "自动回复",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/advanced/menu-setting',
    name: 'menuSetting',
    component: menuAdvancedComponent,
    meta: {
      title: "自定义菜单",
      auth: true,
      supertype:1
    }
  }
  ,
  // {
  //   path: '/table/sort',
  //   name: 'tableSort',
  //   component: sortTableComponent,
  //   meta: {
  //     title: "排序表格",
  //     auth: true,
  //     supertype:1
  //   }
  // }, 
  {
    path: '/manage/message',
    name: 'messageManage',
    component: msgManageComponent,
    meta: {
      title: "消息管理",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/manage/user',
    name: 'userManage',
    component: userManageComponent,
    meta: {
      title: "用户管理",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/manage/media',
    name: 'mediaManage',
    component: mediaManageComponent,
    meta: {
      title: "素材管理",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/media/save/:id',
    name: 'savaMedia',
    component: saveMediaComponent,
    meta: {
      title: "编辑图文消息",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/media/add',
    name: 'addaMedia',
    component: saveMediaComponent,
    meta: {
      title: "新建图文消息",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/analysis/user',
    name: 'userAnalysis',
    component: userAnalysisComponent,
    meta: {
      title: "用户分析",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/help/hot',
    name: 'hotHelp',
    component: hotHelpComponent,
    meta: {
      title: "热门相关",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/help/register',
    name: 'registerHelp',
    component: registerHelpComponent,
    meta: {
      title: "注册相关",
      auth: false,
      supertype:1
    }
  },
  // {
  //   path: '/setting/groupaudit',
  //   name: 'settingGroupaudit',
  //   component: settingGroupauditComponent,
  //   meta: {
  //     title: "群发审核",
  //     auth: true
  //   }
  // },
  {
    path: '/setting/info',
    name: 'personInfO',
    component: personInfoComponent,
    meta: {
      title: "个人信息",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/setting/record',
    name: 'recordSetting',
    component: recordSettingComponent,
    meta: {
      title: "违规记录",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/setting/security',
    name: 'securitySetting',
    component: securitySettingComponent,
    meta: {
      title: "安全中心",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/setting/update',
    name: 'updateSetting',
    component: updateSettingComponent,
    meta: {
      title: "数据更新",
      auth: true,
      supertype:1
    }
  }
  ,
  {
    path: '/advanced/grouphair',
    name: 'advancedGrouphairComponent',
    component: advancedGrouphairComponent,
    meta: {
      title: '新建群发',
      auth: true,
      supertype:1
    }
  },
  {
    path: '/develop/code',
    name: 'developCodeComponent',
    component: developCodeComponent,
    meta: {
      title: "注册app",
      auth: true,
      supertype:1
    }
  },
  {
    path: '/supersend',
    name: 'superSendComponent',
    component: superSendComponent,
    meta: {
      title: '系统群发',
      auth: true,
      supertype:2
    }
  },
  {
    path: '/setting/strators',
    name: 'stratorsSettingComponent',
    component: stratorsSettingComponent,
    meta: {
      title: '应用号审核',
      auth: true,
      supertype:2
    }
  },
  {
    path:'/setting/article',
    name: 'articaleComponent',
    component: articaleComponent,
    meta: {
      title: '文章审核',
      auth: true,
      supertype:2
    }
  }
  , 
  {
    path: '/superadministrator',
    name: 'Superadministrator',
    component: Superadministrator,
    meta:{
      title: '超级管理员',
      auth: true,
      supertype:2
    }
  }
  
]
}]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  let fromName = from.name
 // console.log(from.name)
//  console.log(store.state.user_info)
  let is_login = store.state.user_info.login
  // let usertype = store.state.user_info.user.type
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (!is_login && toName !== 'login') {//未登录且访问页面为需要登录界面 重置为登录界面
      next({
        name: 'login'
      })
    } else {//已登录
      if (is_login && toName === 'login') {
        next({
          path: '/home'
        })
      } else {
        // next()
        to.matched.some(res =>{ 
          let usertype = store.state.user_info.user.type
          if(!res.meta.supertype){//不是二级页面，不判读
            // console.log(res.meta.supertype);
            next()
          }else  if (usertype==1&&res.meta.supertype!=1){
            //普通账号登录 切换管理员账号不匹配
            // console.log('---2');
            next({
              name: 'home'
            })
          }else if(usertype==0&&res.meta.supertype!=2){
            //管理员账号登录 切换普通账号不匹配
            next({
              name: 'home'
            })
          }else{
            //正常登录匹配
            // console.log('---4');
            next()
          }
            
       
          
         })
      
        // if( res.meta.supertype){

        // }
        
       
      }
    }
  }else {
    next()
  }
  //console.log(to.matched.some(res => res.meta.requireAuth)+'11111111');
 
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
