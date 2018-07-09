<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      
    </panel-title>
    <el-card>
      <ul>
        <li>
          <h5>管理员和运营者设置</h5>
          <p>你的账号已绑定管理员账号，暂未绑定运营者账号</p>
          <span>详情</span>
        </li>  
        <li>
          <h5>风险操作保护</h5>
          <p>你的账号已开启风险操作微信保护，进行风险操作时需进行微信号验证</p>
          <span>详情</span>
        </li> 
        <li>
          <h5>风险操作提醒</h5>
          <p>你的账号未开启风险操作微信提醒，存在安全风险，请马上设置</p>
          <span>详情</span>
        </li> 
        <li>
          <h5>风险操作记录</h5>
          <p>最近操作：暂无操作记录</p>
          <span>详情</span>
        </li> 
        <li>
          <h5>IP白名单</h5>
          <p>未启用开发者密码</p>
        </li> 
        <li>
          <h5>修改密码</h5>
          <p>用管理员微信扫码验证后，修改你的密码</p>
          <span>修改</span>
        </li> 
      </ul>      
    </el-card>
    </div>
 
 </template>
<script>
  import {panelTitle, bottomToolBar} from 'components'
export default {
  name: 'Security',
  components: {
   panelTitle,
      bottomToolBar
  }
};
</script>
<style scoped lang="less">
ul{
  padding:30px 20px;
  li{
    position: relative;
    height: 80px;
    border-bottom: 1px solid #ccc;
    h5{
      line-height: 50px;
      font-size: 14px;
    }
    p{
      color:#8D8D8D;
    }
    span{
      position: absolute;
      right:10px;
      top: 50px;
      color:#576B95;
    }
  }
}
</style>
