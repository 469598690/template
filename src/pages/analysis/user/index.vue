


<template>
  <div class="panel analysis">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'tableAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
    <div> <el-card class="card clearfix"> 
     <i class="el-icon-info"></i> 本页根据昨日数据来计算，而用户管理页根据当前数据计算，两者不一致。 
     <div class="pannel_inner"> 
      <div class="title_bg plr10"> 
       <el-dropdown trigger="click"> 
        <span class="el-dropdown-link"> 最近10天<i class="el-icon-arrow-down el-icon--right"></i> </span> 
        <el-dropdown-menu slot="dropdown"> 
         <el-dropdown-item>
          最近7天
         </el-dropdown-item> 
         <el-dropdown-item>
          最近15天
         </el-dropdown-item> 
         <el-dropdown-item>
          最近30天
         </el-dropdown-item> 
        </el-dropdown-menu> 
       </el-dropdown> 
       <el-date-picker class="ml10" v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small"> 
       </el-date-picker> 
      </div> 
      <div class="info_bd"> 
       <h5>趋势图<i class="el-icon-question ml10"></i></h5> 
       <div> 
        <div class="chart" ref="chartOne" :style="{ height: '400px'}"></div> 
       </div> 
      </div> 
     </div> 
      <div class="pannel_inner"> 
      <div class="title_bg plr10">
          <a class="download" href="javascript:;">下载表格</a> 
           <el-date-picker class="ml10" v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small"> 
       </el-date-picker> 
      </div>
      <div>
           <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="日期"
      sortable>
    </el-table-column>
    <el-table-column
      prop="newuser"
      label="新增用户数"
      sortable
      width="300">
    </el-table-column>
    <el-table-column
      prop="totaluser"
      label="净增关注数"
       width="300"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="quituser"
      label="取消关注数"
      sortable
      width="300">
    </el-table-column>
  </el-table>
      </div>
      </div>
    </el-card> </div>
    
  </div>
</template>
 <script>
 import {panelTitle, bottomToolBar} from 'components'
let echarts = require("echarts/lib/echarts");
//引入折线图
require("echarts/lib/chart/line");

//引入所需组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
export default {
  data() {
    return {
      userid:'',  
      value6: [new Date(2000, 10, 10), new Date(2000, 10, 11)],

        tableData: []
    };
  },
  methods: {
      formatter(row, column) {
        return row.totaluser;
      },
      getTableData(userid){
      var _this=this;
      var date='';
      this.$axios.post('/analysis/index',{
        userid:userid,
        date:date
      })
      .then(function(res){
        //console.log(res.data.articles);
        _this.tableData=res.data.articles
        
      })
      .catch(function(err){
        console.log(err);
      });
     },
    /*创建图表一*/
    createChartOne() {
      let chartOne = echarts.init(this.$refs.chartOne);

      chartOne.setOption({
        title: {
          text: "示例",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
          x: "left",
          data: ["2", "3"]
        },
        xAxis: [
          {
            type: "category",
            name: "x",
            splitLine: { show: false },
            data: [
              "2018-04-03",
              "2018-04-04",
              "2018-04-05",
              "2018-04-06",
              "2018-04-07",
              "2018-04-08",
              "2018-04-09",
              "2018-04-10",
              "2018-04-11"
            ]
          }
        ],
        yAxis: [
          {
            type: "log",
            name: "y"
          }
        ],
        series: [
          {
            name: "3",
            type: "line",
            data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]
          },
          {
            name: "2",
            type: "line",
            data: [1, 2, 4, 8, 16, 32, 64, 128, 256]
          }
        ]
      });
    }
  },
    components: {
      panelTitle,
      bottomToolBar
    }
  , 
  mounted() {
    this.createChartOne();
    this.getTableData(this.userid);//获取table数据
  }
};
</script> 
  <style lang="less" scoped="">
@border-color-gray: 1px solid #e7e7eb;
@ft-size: 14px;
.mt20 {
  margin-top: 20px;
}
.ml10 {
  margin-left: 10px;
}
.plr10 {
  padding: 0px 10px;
}
.title_bg {
  background: #f4f5f9;
  min-height: 38px;
  line-height: 38px;
}


.chart {
  margin-top: 20px;
}
.analysis {
  h3 {
    font-size: 20px;
    line-height: 50px;
  }
  font-size: 14px;
  .el-icon-info {
    color: #409eff;
  }
  .pannel_inner {
    border: @border-color-gray;
    .mt20;
    .download{ float: right;color: #409eff; text-decoration: none;}
  }
  .info_bd {
    padding: 20px;
  }
}
</style> 

