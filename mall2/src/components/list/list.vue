<template>
  <div class="listWrap">
    <span class="addBtn" @click="addList()">添加</span>
    <div class="listHeader">
      <span>序号</span>
      <span>编辑</span>
      <span>预览</span>
      <span>标题</span>
      <span>更新时间</span>
      <span>操作</span>
    </div>
    <ul v-for="n in  (listLen%num == 0 ? parseInt(listLen/num) : (parseInt(listLen/num)+1))" v-if="n == onPage">
      <li v-for="(item,index) in list" v-if="(index >= (n-1)*num) && (index < n*num) ">
          <span v-text="index+1"></span>
          <span><a href="javascript:;" @click="editMall(item.name,index,item.id)">编辑</a></span>
          <span><a :href="urlPath + (item.id ? item.id : item.name)" target="_blank">预览</a></span>
          <span v-text="item.title"></span>
          <span v-text="item.uptime"></span>
          <span><a href="javascript:;"  @click="delMall(index)">删除</a></span>
      </li>
    </ul>
    <div class="page">
      <a href="javascript:;" ref="first" @click="firstBtn()">首页</a>
      <a href="javascript:;" ref="prve" @click="prveBtn()">上一页</a>
      <a href="javascript:;" ref="next" @click="nextBtn()">下一页</a>
      <a href="javascript:;" ref="last" @click="lastBtn()">末页</a>
    </div>
  </div>
</template>


<script>
import {list} from './listJs'

list.components = {}

export default list

</script>

<style scoped>
@import "listCss.css";
</style>
