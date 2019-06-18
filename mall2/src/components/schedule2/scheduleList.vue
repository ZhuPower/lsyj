<template>
  <div class="scheduleWrap" v-if="bPermission">
    <div class="scheduleMain" v-if="show">
      <h2>超市到家活动列表2</h2>
      <list :list="mallList" :listLen="listLen" :urlPath="urlPath" @setShow="setShow" @delList="delList" @addList="addList"></list>   
    </div>
    <router-view :isDetails="isDetails" :index="index" :sName="sName" @updata="updata"></router-view>
  </div>
</template>


<script>
import list from '@/components/list/list'
import {scheduleList} from './scheduleListJs'

scheduleList.components = {list}

export default scheduleList

</script>

<style scoped>
@import "scheduleListCss.css";
</style>
