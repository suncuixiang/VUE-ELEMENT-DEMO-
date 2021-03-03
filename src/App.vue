<template>
  <div id="app">
    <!-- header -->
    <header class="headerBox" ref="headerBox">
      <div class="logo">
        <!-- 展开/关闭侧边导航 -->
        <img
          v-if="isCollapse"
          class="open"
          src="./assets/favicon.png"
          style="background:black"
          @click="isCollapse = !isCollapse"
        />
        <h1 v-if="!isCollapse" class="close" @click="isCollapse = !isCollapse">
          VUE-ELEMENT
        </h1>
      </div>
      <!-- 头部主导航 -->
      <el-menu
        mode="horizontal"
        class="el-menu-demo"
        background-color="#3a3d42"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activeIndex()"
      >
        <el-menu-item index="1">
          <!-- <router-link to="/custome">客户管理</router-link> -->
          <span>home</span>
        </el-menu-item>
        <el-menu-item index="2">
          <!-- <router-link to="/system">客户管理</router-link> -->
          <span>system</span>
        </el-menu-item>
      </el-menu>

      <div class="baseBox">
        <span v-text="name"></span>
        <el-button type="text" @click="dialogVisible = true"
          >修改密码</el-button
        >
        <el-button type="text" @click="handleSignout">安全退出</el-button>
      </div>
    </header>
    <!-- container -->
    <!-- 展示一级路由中各组件的内容(呈现组件内容的视图容器) -->
    <main class="mainBox" ref="mainBox">
      <!-- <router-view></router-view> -->
    </main>

    <!-- dialog -->
    <el-dialog :visible="dialogVisible" title="修改密码" width="40%" :before-close="closeDialog">
      <el-form :model="passReset" ref="passResetForm">
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="passReset.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass">
          <el-input type="password" v-model="passReset.confirmPass"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitNewPass">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'blueimp-md5';
import {queryBaseInfo,signOut,resetPass} from './api/login';
export default {
  name:'index',
  data() {
    return {
      isCollapse: false,
      name: "",
      dialogVisible: false,
      passReset:{
        pass:'',
        confirmPass:''
      }
    };
  },
  methods: {
    activeIndex() {
      let nowURL = location.href;
      if(nowURL.includes('/home')) return "1";
      if(nowURL.includes('/system')) return "2";
    },
    handleSignout() {
      signOut().then(()=>{
        location.href = '/login.html';
      }).catch(()=>{
        this.$message.error("当前网络异常，请稍后重试！");
      })
    },
    closeDialog(){
      this.$refs.passResetForm.resetFields();
      this.dialogVisible = false;
    },
    submitNewPass(){
      let reg = /^\w{1,16}$/;
      if(!reg.test(this.passReset.pass) || !reg.test(this.passReset.confirmPass)){
        this.$message.error("密码格式不正确，请重新输入!");
        return;
      }
      if(this.passReset.pass !== this.passReset.confirmPass){
        this.$message.error("请确保两次输入的密码一致！");
        return;
      }
      resetPass(md5(this.passReset.pass)).then(()=>{
        this.$message.success("新密码已经修改成功，请妥善保存！");
        this.closeDialog();
      }).catch(()=>{
        this.$message.error("新密码修改失败，请稍后重试！");
      })
    }
  },
  created(){
    queryBaseInfo().then(result => {
      console.log(result);
      this.name = "您好：" + result.name;
    })
  },
  mounted(){
    let winH = document.documentElement.clientHeight,
        headerBox = this.$refs.headerBox,
        mainBox = this.$refs.mainBox;
    mainBox.style.height = winH - headerBox.offsetHeight + 'px';
    this.$forceUpdate();
  }
};
</script>

<style lang="less">
.headerBox {
  .open,
  .close {
    padding: 0;
    border: none;
  }
}
</style>
