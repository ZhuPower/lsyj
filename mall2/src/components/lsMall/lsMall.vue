<template>
  <div class="lsMallWrap" v-if="bPermission">
    <div class="lsMallMain" v-if="show">
      <h2>购物商场列表</h2>
      <list :list="mallList" :listLen="listLen" :urlPath="urlPath" @setShow="setShow" @delList="delList" @addList="addList"></list>   
    </div>
    <div class="popCreate" ref="popCreate">
      <div class="popMain">
        <h3>添加商场</h3>
        <div class="popCon">
        	<div class="fileaName"><span>名称：</span><input type="text" v-model="name"  placeholder="请输入数字及字母" /></div>
        </div>
        <div class="btnWrap">
            <input type="button" value="保存" @click="saveCreate()" />
            <input type="button" value="取消"  @click="cancelCreate()" />
        </div>
      </div>
    </div>
    <router-view :isDetails="isDetails" :index="index" @updata="updata"></router-view>
  </div>
</template>


<script>
import list from '@/components/list/list'
import {lsMall} from './lsMallJs'

lsMall.components = {list}

export default lsMall

</script>

<style scoped>
@import "lsMallCss.css";
</style>
