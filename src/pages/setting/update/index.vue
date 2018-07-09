<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      
    </panel-title>
   <el-card>
      <el-form :model="upDate" ref="upDate">
        <el-form-item>
          <label>名称：</label>
          <input type="text" placeholder="请输入名称" v-model="upDate.name">
        </el-form-item>
        <el-form-item>
          <label>地址：</label>
          <input type="text" placeholder="请输入地址" v-model="upDate.address">
        </el-form-item>
        <el-form-item>
          <label>投诉电话：</label>
          <input type="text" placeholder="请输入投诉电话" v-model="upDate.complaintCall">
        </el-form-item>
        <el-form-item>
          <label>重定向地址：</label>
          <input type="text" placeholder="请输入重定向地址" v-model="upDate.directUrl">
        </el-form-item>
        <el-form-item>
          <label>功能描述：</label>
          <input type="text" placeholder="请输入功能描述" v-model="upDate.funcDesc">
        </el-form-item>
        <el-form-item>
          <label>应用号ID：</label>
          <input type="text" placeholder="请输入应用号ID" v-model="upDate.id">
        </el-form-item>
        <el-form-item>
          <label>是否自动回复：</label>
          <input type="text" placeholder="是否自动回复" v-model="upDate.isAuto">
        </el-form-item>
        <el-form-item>
          <label>是否有欢迎消息：</label>
          <input type="text" placeholder="是否有欢迎消息" v-model="upDate.isWelcome">
        </el-form-item>
        <el-form-item>
          <label>是否启用自定义菜单：</label>
          <input type="text" placeholder="是否启用自定义菜单" v-model="upDate.isMenu">
        </el-form-item>
        <el-form-item>
          <label>是否重定向请求(私服)：</label>
          <input type="text" placeholder="是否重定向请求(私服)" v-model="upDate.isDirect">
        </el-form-item>
      </el-form>
      <div class="upDateBtn">
        <el-button @click="dateBtn" type="primary">保存</el-button>
      </div>
    </el-card>
    </div>
 
 </template>
<script>
  import {panelTitle, bottomToolBar} from 'components'
import axios from 'axios'
import Qs from 'qs'
export default {
  name: 'Update',
  components: {
     panelTitle,
      bottomToolBar
  },
  data() {
    return {
      upDate: {
        address: null,
        complaintCall: null,
        directUrl: null,
        funcDesc: null,
        id: null,
        isAuto: null,
        isDirect: null,
        isMenu: null,
        isWelcome: null,
        name: null
      }
    }
  },
  methods: {
    dateBtn() {
      this.$fetch.api_setting.upData(Qs.stringify(this.upDate)).then(res=>{
        this.$message.success(res.message)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>
<style scoped lang="less">
.el-form{
  .el-form-item{
    line-height: 80px;
    text-indent:20px;
    display:block;
    input{
    width:90%;
    height:50px;
    border:0;
    display:inline-block;
    outline: none;
    border-bottom:1px solid #ccc;
    text-indent:20px; 
    }
    label{
      flex-basis:100px;
      margin-left:-100px;
      text-align: center;
      display:inline-block;
      width:15%;
    }
  }
}
.upDateBtn{
  height:100px;
  line-height: 100px;
  text-align: center;
}
</style>
