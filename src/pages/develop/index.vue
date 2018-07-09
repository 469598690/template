<template>
  <div class="panel msg">
    <el-card>
<h5>公众号开发信息</h5>
 <el-form ref="form" :model="form"  label-width="100px">
            <el-form-item label="appid:">
              <el-input v-model="form.appid" :readonly="true" style="width: 250px;"></el-input>
              
            </el-form-item>
              <el-form-item label="code:">
              <el-input v-model="form.code" placeholder="code:" style="width: 250px;"></el-input>
           
            </el-form-item>
               <el-form-item >
             <el-button type="primary">确定</el-button>
            </el-form-item>
  
 </el-form>

    </el-card>
   
    
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'


export default {
  name: "messagelist",
  data() {
    return {
      form:{
        appid:'wx25bd849b2e152de8',
        code:''
      }
    };
  },
  methods: {
  
  },
  components: {
    panelTitle,
     bottomToolBar
  }
};
</script>
<style scoped lang="less">
.pl10{ padding-left: 10px;}
.msg {
  h3 {
    font-size: 20px;
    line-height: 50px;
  }
  ul {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    li {
      display: inline-block;
      line-height: 60px;
      margin-right: 20px;
    }
  }
  el-card {
    background: #eee;
  }
  h5 {
    text-indent: 20px;
    line-height: 60px;
  }
  .info {
    height: 400px;
    p {
      color: #ccc;
      text-align: center;
      line-height: 400px;
    }
  }
}
.active {
  color: skyblue;
}
</style>

