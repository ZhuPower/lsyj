<template>
  <div id="app">
    <div class="home-header" v-if="isLogin">页面配置后台</div>
  	<div class="home-left" v-if="isLogin">
      <!-- <router-link to="/codeBuilder" :class="{active: ($route.path == '/codeBuilder' ? true :false)}">代码生成器</router-link>
      <router-link to="/scheduleList" :class="{active: ($route.path.indexOf('/scheduleList') >-1  ? true :false)}">超市活动</router-link> -->
      <router-link to="/codeBuilder2" :class="{active: ($route.path == '/codeBuilder2' ? true :false)}" v-if="setPermission.codeBuilder2">代码生成器2</router-link>
      <router-link to="/schedule2List" :class="{active: ($route.path.indexOf('/schedule2List') >-1  ? true :false)}" v-if="setPermission.schedule2List">超市活动2</router-link>
      <router-link to="/overseas" :class="{active: ($route.path.indexOf('/overseas') >-1  ? true :false)}" v-if="setPermission.overseas">全球购活动</router-link>
      <router-link to="/timedReceipt" :class="{active: ($route.path.indexOf('/timedReceipt') >-1  ? true :false)}" v-if="setPermission.timedReceipt">定时领券</router-link>
      <router-link to="/fightGroup" :class="{active: ($route.path.indexOf('/fightGroup') >-1 ? true :false)}" v-if="setPermission.fightGroup">拼团活动</router-link>
      <router-link to="/lsMall" :class="{active: ($route.path.indexOf('/lsMall') >-1  ? true :false)}" v-if="setPermission.lsMall">购物商场</router-link>
      <router-link to="/eventDetails" :class="{active: ($route.path.indexOf('/eventDetails') >-1 ? true :false)}" v-if="setPermission.eventDetails">商场活动</router-link>
      <router-link to="/upImg" :class="{active: ($route.path.indexOf('/upImg') >-1 ? true :false)}" v-if="setPermission.upImg">招商Banner</router-link>
      <router-link to="/upLoad" :class="{active: ($route.path.indexOf('/upLoad') >-1 ? true :false)}" v-if="setPermission.upLoad">上传文件</router-link>
    </div>
    <div class="home-right">
    	<keep-alive><router-view @setLogin="getLogin"></router-view></keep-alive>
    </div>
  </div>
</template>

<script>
import {oPermission} from '@/assets/js/base'
export default {
  data(){
	  return{
	  	isLogin:false,
              setPermission:{}
	  }
  },
  created(){
      let n = setInterval(()=>{
        if(sessionStorage.permission){
          clearInterval(n)
          this.setPermission = oPermission[sessionStorage.permission]
        }
      },200)
      
  	if(sessionStorage.login &&  sessionStorage.login == 'Please contact customer service'){
  		this.isLogin = true
  	}
  },
  methods:{
  	getLogin(b){
  		this.isLogin = b
  	}
  }
}
</script>

<style>
*{margin:0px; padding:0px;text-decoration: none;}
li{list-style: none;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
.home-header{ height:80px; line-height: 80px; background:#20a0ff; color:#fff; padding-left:30px; font-size:30px; font-weight: bold;position: fixed; width:100%; top:0px; left:0px; z-index:1; }
.home-left{width:160px; height:100%; position: fixed; padding-top:95px; background:#e6e6e6;}
.home-left>a{display:block; color: #333;height: 40px;line-height: 40px; padding-left:30px; font-size:16px; margin-bottom:4px;}
.home-left>a:hover{background:#D8DDE9;}
.home-left>a.active{background:#20a0ff; color:#fff; font-size:18px;}
.home-right{padding-left:160px; padding-top:95px;}
</style>
