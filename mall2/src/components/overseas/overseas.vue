<template>
  <div class="overseasWrap" v-if="bPermission">
    <div class="overseasMain" v-if="show">
      <h2>全球购活动列表</h2>
      <list :list="mallList" :listLen="listLen" :urlPath="urlPath" @setShow="setShow" @delList="delList" @addList="addList"></list>   
    </div>
    <div class="popCreate" ref="popCreate">
      <div class="popMain">
        <h3>添加活动</h3>
        <div class="popCon">
        	<div class="fileaName"><span>name：</span><input type="text" v-model="name"  placeholder="请输入以字母或下划线开头的字符串" /></div>
        </div>
        <div class="btnWrap">
            <input type="button" value="保存" @click="saveCreate()" />
            <input type="button" value="取消"  @click="cancelCreate()" />
        </div>
      </div>
    </div>
    <router-view :isDetails="isDetails" :index="index" :isNew="isNew" @updata="updata" ></router-view>
  </div>
</template>


<script>
import list from '@/components/list/list'
import {overseas} from './overseasJs'

overseas.components = {list}

export default overseas

</script>

<style scoped>
@import "overseasCss.css";
</style>

