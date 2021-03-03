<template>
  <div id="app">
    <el-card class="cardBox">
      <h1 class="title">Vue Element Demo</h1>
      <div class="loginBox">
        <!-- 用户名 -->
        <el-input class="inp" v-model="account" placeholder="请输入用户名/手机号/邮箱" prefix-icon="el-icon-user"></el-input>
        <!-- 密码 -->
        <el-input class="inp" v-model="password" placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
        <el-button type="primary" class="submit" @click="handleLogin">登录</el-button>
      </div>
    </el-card>
    <footer class="footerBox">
      <span>半夏 © 2021</span>
    </footer>
  </div>
</template>

<script>
import md5 from 'blueimp-md5';
import {handleUserLogin} from './api/login';
export default {
  name:'login',
  data(){
    return {
      account:'',
      password:''
    }
  },
  methods:{
    checkAccount(){
      let argArr = [/^((\w{1,20})|([\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}))$/,/^1[3-9]\d{9}$/,/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/];
      return argArr.some(item => item.test(this.account));
    },
    checkPassword(){
      return /^\w{1,16}$/.test(this.password);
    },
    handleLogin(){
      if(!this.checkAccount() || !this.checkPassword()){
        this.$message.error('系统提示：请输入合法的用户名或密码！');
        return;
      }
      let password = md5(this.password);
      handleUserLogin({
        account:this.account,
        password
      }).then(()=>{
        this.$alert('登陆成功，即将跳转到首页！','系统提示',{
          callback:()=>{
            location.href = location.origin;
          }
        })
      }).catch(()=>{
        this.$message('用户名和密码不匹配，请核对后再试！','系统提示')
      })
    }
  }
}
</script>

<style lang="less">
html,
body{
  height: 100%;
  overflow: hidden;
}

body{
  background: url('./assets/login_bg.jpg') repeat-x;
}

.footerBox{
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  line-height: 50px;
  text-align: center;
  color: #999;
}

.cardBox{
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.cardBox .title{
  font-size: 30px;
  text-align: center;
  font-weight: normal;
}

.loginBox{
  padding: 25px;
  box-sizing: border-box;
}

.loginBox .inp{
  margin-bottom: 20px;
}

.loginBox .submit{
  width: 100%;
}
</style>
