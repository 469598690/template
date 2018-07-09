<template>
  <div class="wrap">
    <h2>自定义菜单</h2>
    <el-card class="card">
       <div class="content">
            <div id="app-menu">
                <div class="preview">
                  <div class="hd">
                    <div class="title">{{weixinTitle}}</div>
                  </div>
                  <!-- 菜单主体 -->
                  <div class="bd">
                    <!-- 主菜单 -->
                      <ul class="menu" id="menu" >
                          <li v-for="(btn,i) in menu" v-dragging="{ item: btn ,list: menu ,group: 'btn'}" :key="i" :index="i" class="menu-item" :class="{current:selectedMenuIndex===i && selectedMenuLevel()==1}" @click="selectedMenu(i,$event)">
                              <div class="menu-item-title">
                                  <span>{{ btn.name }}</span>
                              </div>
                              <!-- 子菜单 -->
                              <ul class="sub-menu" v-show="selectedMenuIndex===i">
                                  <li v-for="(sub,i2) in btn.subMenuList"  v-dragging="{ item: sub ,list:btn.subMenuList ,group:'sub'}" :key="i2" :index="i2" class="menu-sub-item" :class="{current:selectedSubMenuIndex===i2 && selectedMenuLevel()==2}"  @click.stop="selectedSubMenu(i2,$event)">
                                      <div class="menu-item-title">
                                          <span>{{sub.name}}</span>
                                      </div>
                                  </li>
                                  <li v-if="btn.subMenuList.length<5" class="menu-sub-item" @click.stop="addMenu(2)">
                                      <div class="menu-item-title">
                                          <i class="el-icon-plus"></i>
                                      </div>
                                  </li>
                                  <i class="menu-arrow arrow_out"></i>
                                  <i class="menu-arrow arrow_in"></i>
                              </ul>
                          </li>
                          <li class="menu-item" v-if="menu.length<3" @click="addMenu(1)"> <i class="el-icon-plus"></i>点击添加</li>
                      </ul>
                  </div>
                  <!-- 菜单页面 -->
                  <div class="menu-detail" v-if="selectedMenuLevel()==1">
                      <div class="menu-input-group" style="border-bottom: 2px #e8e8e8 solid;">
                        <div class="menu-name">{{menu[selectedMenuIndex].name}}</div>
                        <div v-show="menu[selectedMenuIndex].menuId" class="menu-del" @click="delMenu(1)">删除主菜单</div>
                      </div>
                      <div class="menu-input-group">
                        <div class="menu-label">主菜单名称</div>
                        <div class="menu-input">
                          <input type="text" name="name" placeholder="请输入菜单名称" class="menu-input-text" v-model="menu[selectedMenuIndex].name" @input="checkMenuName(menu[selectedMenuIndex].name)">
                          <p class="menu-tips" style="color:#e15f63" v-show="menuNameBounds">字数超过上限</p>
                          <p class="menu-tips">字数不超过4个汉字或8个字母</p>
                        </div>
                      </div>
                      <div class="menu-group menu-input-group">
                        <div class="menu_label">菜单内容
                          <el-radio v-model="radio" label="0" class="save">发送消息</el-radio>
                          <el-radio v-model="radio" label="1">跳转页面</el-radio>
                        </div>
                        <!-- 1=发送消息 -->
                        <div class="menu-count" v-if="radio==0">
                          <span class="pic">
                            <!-- 图文消息 -->
                          </span>
                          <div  v-show="handleshow">
                              <picc @getmeid="setmedid" :picmedid="menu[selectedMenuIndex].articleId" />
                          </div>
                        </div>
                        <!-- 2=跳转页面 -->
                        <div class="menu-input-gruop" v-else style="margin-top:20px;">
                          <div class="menu-label">页面地址</div>
                          <div class="menu-input" style="padding-left:8px; line-height:30px;">
                            <el-input type="text" v-model="menu[selectedMenuIndex].linkUrl"></el-input>
                          </div>
                        </div>
                      </div>
                      <div class="btn-group">
                        <div id="btn-create" class="btn btn-success" @click="save(1)">点击保存</div>
                      </div>
                  </div>
                  <!-- 子菜单页面 -->
                  <div class="menu-detail" v-if="selectedMenuLevel()==2">
                      <div class="menu-input-group" style="border-bottom: 2px #e8e8e8 solid;">
                          <div class="menu-name">{{menu[selectedMenuIndex].subMenuList[selectedSubMenuIndex].name}}</div>
                          <div class="menu-del" v-show="menu[selectedMenuIndex].subMenuList[selectedSubMenuIndex].menuId" @click="delMenu(2)">删除子菜单</div>
                      </div>
                      <div class="menu-input-group">
                          <div class="menu-label">子菜单名称</div>
                          <div class="menu-input">
                              <input type="text" placeholder="请输入子菜单名称" class="menu-input-text" v-model="menu[selectedMenuIndex].subMenuList[selectedSubMenuIndex].name" @input="checkMenuName(menu[selectedMenuIndex].subMenuList[selectedSubMenuIndex].name)">
                              <p class="menu-tips" style="color:#e15f63" v-show="menuNameBounds">字数超过上限</p>
                              <p class="menu-tips">字数不超过8个汉字或16个字母</p>
                          </div>
                      </div>
                      <div class="menu-group menu-input-group">
                        <div class="menu_label">菜单内容
                          <el-radio v-model="radio" label="0" class="save">发送消息</el-radio>
                          <el-radio v-model="radio" label="1">跳转页面</el-radio>
                        </div>
                        <div class="menu-count" v-if="radio==0">
                          <span class="pic">
                            <!-- 图文消息 -->
                          </span>
                          <div>
                              <picc v-if="handleshow" @getmeid="setmedid" :picmedid="menu[selectedMenuIndex].subMenuList[selectedSubMenuIndex].articleId" />
                          </div>
                        </div>
                        <div class="menu-input-gruop" v-else>
                          <div class="menu-label">页面地址</div>
                          <div class="menu-input" style="padding-left:8px; line-height:30px;">
                            <el-input type="text"  v-model="menu[selectedMenuIndex].subMenuList[selectedSubMenuIndex].linkUrl"></el-input>
                          </div>
                        </div>
                      </div>
                      <div class="btn-group">
                        <div id="btn-create" class="btn btn-success" @click="save(2)">点击保存</div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </el-card>
  </div>
</template>

<script>
import "./menu.css";
import axios from 'axios'
import Qs from 'qs' 
import picc from './children/picWord/index.vue'

import {mapActions,mapGetters } from "vuex";
import { GET_USER_INFO } from "store/getters/type";
import store from "store";

export default {
  name: "HomeMenu",
   computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO
    })
  },
    created(){ 
     this.appNoId=this.get_user_info.user.appId
    //  console.log(this.appId);
  },
  data() {
    return {
      indx: 1,
      appNoId:1,
      weixinTitle: "自定义菜单",
      selectedMenuIndex: 0, //当前选中菜单索引
      selectedSubMenuIndex: "", //当前选中子菜单索引
      menuNameBounds: false, //菜单长度超出上限标记
      menuindex:0,
      subindex:0,
      menuOrder:0,
      tabView:'select1',
      //菜单对象
      menu: [
      ],
      radio:'0',
      text: ['图文消息','图片'],
      mediaid:null,
      //选中素材id 临时储存
      selectlevel:0,
      //当前选中为主菜单还是子菜单
      handleshow:true
    };
  },
  mounted() {
    this.$dragging.$on("dragged", ({ value }) => {});
    this.$dragging.$on("dragend", () => {});
    this.queryMenu()
  },
  methods: {
    setmedid(mediaid){
   
       var c_menu = [];
      this.selectlevel == 0 ? (c_menu = this.menu[this.selectedMenuIndex]) : (c_menu = this.menu[this.selectedMenuIndex].subMenuList[this.selectedSubMenuIndex]);
        // console.log(this.selectlevel+'--'+this.selectedMenuIndex+'--'+this.selectedSubMenuIndex);
      //  console.log(c_menu);
      c_menu.articleId=mediaid
      // console.log(c_menu);
    },
    // 查询菜单(接口)
    queryMenu(){
      this.$fetch.api_menu.queryMenus({
        appNoId:this.appNoId
      }).then(res=>{
  //  console.log( res.data.length+'------------');
         res.data.length>0 ? this.menu = res.data : this.menu
     
   
    
  this.radio=this.menu[this.selectedMenuIndex].type+''
        // console.log(this.menu);
        this.menuSort(this.menu)   
   
        
      }).catch(err=>{
        // console.log(err)
      })
    },
    // 点击清空
    clear() {
      // console.log("clear");
    },
    // 菜单排序(接口)
    menuSort(menu,type){ 
      var addm = [];
      if(!type){
      var  type =1
      }
      type == 1 ? (addm = menu) : (addm = menu[this.selectedMenuIndex].subMenuList)
      if(addm){
        for(var i=0;i<addm.length;i++){
          addm[i].menuOrder = i
        }
      }
      if(addm.length>0){
      
this.$fetch.api_menu.sortMenu(addm).then(res=>{
      }).catch(err=>{})
      }
      
    },
    // 更新(编辑)菜单(接口)
    edit(c_menu,type){
      var c_menu = c_menu;
      // console.log(c_menu);
        let that = this;
      this.$fetch.api_menu.updateMenu(Qs.stringify({
        id: c_menu.menuId,
        name:c_menu.name,
        linkUrl	:c_menu.linkUrl,
        type:this.radio,
         parentId: c_menu.parentId,
        articleId:c_menu.articleId,
      })).then(res=>{
        this.$message.success(res.message)
   this.queryMenu()
      }).catch(err=>{
        // console.log(err)
      })
    },
    // 点击保存 添加菜单(接口)
    save(type) {
     
      var c_menu = [];
      type == 1 ? (c_menu = this.menu[this.selectedMenuIndex]) : (c_menu = this.menu[this.selectedMenuIndex].subMenuList[this.selectedSubMenuIndex]);
      var that=this
      // console.log('save'+JSON.stringify(c_menu))
      if(!c_menu.menuId){
        // 新增菜单

        this.$fetch.api_menu.saveMenu(Qs.stringify({
          appNoId:this.appNoId,
          name:c_menu.name,
          linkUrl: c_menu.linkUrl,
          menuOrder: c_menu.menuOrder,
          parentId: c_menu.parentId,
          type:this.radio,
          articleId:c_menu.articleId,
        })).then(res=>{
          this.$message.success(res.message)
  // type == 1 ? that.menu[that.selectedMenuIndex]=that.radio :that.menu[that.selectedMenuIndex].subMenuList[that.selectedSubMenuIndex]=that.radio;
     this.queryMenu()

         
        }).catch(err=>{
          // console.log(err)
        })
      }
      else {
        this.edit(c_menu,type)
      }
    },
    // 选中菜单级别
    selectedMenuLevel() {
        //  console.log( this.selectedMenuIndex)
        // console.log( this.selectedSubMenuIndex)
        if(this.menu.length==0){
return false;
        }
      if (this.selectedMenuIndex !== "" && this.selectedSubMenuIndex === "") {
        // 主菜单
        this.menuSort(this.menu,1)
       
        return 1;
      } else if (
        this.selectedMenuIndex !== "" &&
        this.selectedSubMenuIndex !== ""
      ) {
        //子菜单
        this.menuSort(this.menu,2)
        return 2;
      } else {
        //未选中任何菜单
       
        return 0;
      }
    },
    // 选中主菜单
    selectedMenu(i) {
     
      this.selectedSubMenuIndex = "";
      this.selectedMenuIndex = i;
      this.selectlevel=0
      this.radio=this.menu[this.selectedMenuIndex].type+''
      this.handleshow=false
      this.handleshow=true
     
      //  console.log('save1'+JSON.stringify(this.menu[this.selectedMenuIndex]))
    },
    // 选中子菜单
    selectedSubMenu(i) {
      this.selectedSubMenuIndex = i;
      this.selectlevel=1
       this.radio=this.menu[this.selectedMenuIndex].subMenuList[this.selectedSubMenuIndex].type+''
this.handleshow=false
      this.handleshow=true
      //  console.log(this.menu[this.selectedMenuIndex].subMenuList[this.selectedSubMenuIndex].articleId)
        // console.log('save2'+JSON.stringify(this.menu[this.selectedMenuIndex].subMenuList[this.selectedSubMenuIndex]))
    },
    //添加菜单
    // 参数level为菜单级别，1为主菜单、2为子菜单
    addMenu(level) {
      if (level == 1 && this.menu.length < 3) {
        if(this.menu == ''){
          this.menu.push({
            name: "主菜单",
            linkUrl: 'http://',
            parentId: 0,
            type:0,
            articleId:null,
            appNoId:this.appNoId,
            menuOrder: this.menuOrder,
            subMenuList: []
          });
          this.selectedMenuIndex = this.menu.length - 1;
          this.selectedSubMenuIndex = "";
        } else{
          this.menu.push({
            name: "主菜单",
            linkUrl: 'http://',
            parentId: 0,
            appNoId:this.appNoId,
              type:0,
              articleId:null,
            menuOrder: this.menu.length+1,
            subMenuList: []
          });
          this.selectedMenuIndex = this.menu.length - 1;
          this.selectedSubMenuIndex = "";
        }
      }
      if (
        level == 2 &&
        this.menu[this.selectedMenuIndex].subMenuList.length < 5
      ) {
        // console.log('addMenu'+ JSON.stringify(this.menu[this.selectedMenuIndex]));
        this.menu[this.selectedMenuIndex].subMenuList.push({
          appNoId:this.appNoId,
          name: "子菜单",
          parentId: this.menu[this.selectedMenuIndex].menuId,
          menuOrder:this.menuOrder,
          linkUrl: "http://",
           type:0,
              articleId:null,
        });
        this.selectedSubMenuIndex =
          this.menu[this.selectedMenuIndex].subMenuList.length - 1;
      }
    },
    // 判断菜单长度
    checkMenuName(val) {
      if (this.selectedMenuLevel() == 1 && this.getMenuNameLen(val) <= 8) {
        this.menuNameBounds = false;
      } else if (
        this.selectedMenuLevel() == 2 &&
        this.getMenuNameLen(val) <= 16
      ) {
        this.menuNameBounds = false;
      } else {
        this.menuNameBounds = true;
      }
    },
    // 获取字符串文字的长度
    getMenuNameLen(val) {
      var len = 0;
      for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        a.match(/[^\x00-\xff]/gi) != null ? (len += 2) : (len += 1);
      }
      return len;
    },
    //删除菜单 (接口)
    delMenu(type) {
      var c_menu = [];
      type == 1 ? (c_menu = this.menu[this.selectedMenuIndex]) : (c_menu = this.menu[this.selectedMenuIndex].subMenuList[this.selectedSubMenuIndex])
    
     this.$fetch.api_menu.delMenu(Qs.stringify({
        appNoMenuId: c_menu.menuId
      })).then(res=>{
        // 删除主菜单
        if (
          this.selectedMenuLevel() == 1 &&
          confirm("删除后菜单下设置的子菜单也将被删除")
        ) {
          if (this.selectedMenuIndex === 0) {
            this.menu.splice(this.selectedMenuIndex, 1);
            this.selectedMenuIndex = 0;
          } else {
            this.menu.splice(this.selectedMenuIndex, 1);
            this.selectedMenuIndex -= 1;
          }
          if (this.menu.length == 0) {
            this.selectedMenuIndex = "";
          } //删除子菜单
        } else if (this.selectedMenuLevel() == 2) {
          if (this.selectedSubMenuIndex === 0) {
            this.menu[this.selectedMenuIndex].subMenuList.splice(
              this.selectedSubMenuIndex,
              1
            );
            this.selectedSubMenuIndex = 0;
          } else {
            this.menu[this.selectedMenuIndex].subMenuList.splice(
              this.selectedSubMenuIndex,
              1
            );
            this.selectedSubMenuIndex -= 1;
          }
          if (this.menu[this.selectedMenuIndex].subMenuList.length == 0) {
            this.selectedSubMenuIndex = "";
          }
        }
        this.$message.success(res.message)
      })
    }
  },
  components: {
    picc
  }
};
</script>

<style scoped lang="less">
.menu-item {
  text-align: center;
}
</style>
