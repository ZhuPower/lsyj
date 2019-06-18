<template>
  <div class="fightGroupWrap" v-if="bPermission">
    <h2>联盛超市社区拼团自提门店</h2>
    <div class="fightGroupMain">
      <ul class="ul">
        <li v-if="!bNew">
            <span>选择商品：</span>
            <select ref="goodsName" v-model="goodsName">
              <option v-for="(item,key) in goodsNameList" :value="key"  v-text="item"></option>
            </select>
            <a href="javascript:;" class="addGoods" @click="addGoods()">添加</a>
            <a href="javascript:;" class="delGoods" @click="delGoods()">删除</a>
        </li>
        <li v-if="bNew">
            <span>商品名：</span><input type="text" class="newName" v-model="newName1">
            <span>name：</span><input type="text"  class="newName" v-model="newName2">
        </li>
        <li>
          <span>头图：</span>
          <input type="text" class="banner" v-model="banner">
          <input type="button"  value="上传图片" class="upBtn" @click="upBanner()" />
          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" ref="fileBanner">
        </li>
        <li><span>商品ID：</span><input type="text" class="proId" v-model="strId"></li>
        <li><span>链接：</span><p v-text="activityLink2" class="activityLink2"></p><a :href="activityLink" target="_blank" class="activityLink">预览</a></li>
      </ul>
      <div class="wrap">
        <div class="bannerMain">
          <img :src="banner" />
        </div>
        <div class="listMain">
          <ul>
            <li v-for="(item,index) in arrId" v-if="item!='no'"><a :href="'http://www.yijiago.com/h5/#/goods/'+item" target="_blank"><img src="http://util.yijiago.com:8097/yiJiaGo/images/20190113/pting/pro_img.png"><span v-text="aStoreName[index]"></span></a></li>
          </ul>
        </div>
      </div>
      <div class="btnWrap">
        <input type="button" value="保存" @click="bSubmit()" />
        <input type="button" value="取消" @click="bCancel()" />
      </div>
    </div>
  </div>
</template>


<script>
import {fightGroup} from './fightGroupJs'

export default fightGroup

</script>

<style scoped>
@import "fightGroupCss.css";
</style>
