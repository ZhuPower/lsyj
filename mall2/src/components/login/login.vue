<template>
  <div class="loginWrap">
  	<div class="loginMain">
  		<h2>页面配置后台</h2>
	    <p><span>用户名：</span><input type="text" placeholder="请输入用户名" ref="userName"></p>
	    <p><span>密码：</span><input type="password" placeholder="请输入密码" ref="password"></p>
	    <p class="login"><a href="javascript:;" class="loginBtn" @click="login()">登录</a></p>
  	</div>
  </div>
</template>

<script>
import {login} from '@/components/login/loginJs'

login.components = {}

export default login

</script>
<style scoped>
@import "loginCss.css";
</style>
