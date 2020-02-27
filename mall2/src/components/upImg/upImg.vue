<template>
  <div class="upImgWrap" v-if="bPermission">
    <h2>招商银行APP电子购物卡充值底部Banner</h2>
    <div class="upImgMain">
      <!-- v-model="scheduleInfo.banner" -->
      <div class="bannerTitle">
        Banner列表
        <a href="javascript:;" @click="addBanner()">添加</a>
      </div>
      <ul>
        <li v-for="(item,index) in oData.aImg">
          <div class="box_1">
            <span>跳转链接：</span><input type="text" v-model="item.aLink">
          </div>
          <div class="box_2">
            <span>banner图片：</span>
            <input type="text" class="banner"  v-model="item.imgSrc">
            <input type="button"  value="上传图片" class="upBtn" @click="upBanner(item)" />
          </div>
          <a href="javascript:;" @click="delBanner(index)">删除</a>
        </li>
      </ul>
      <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" ref="fileBanner">
      <div class="btnMain">
        <a href="javascript:;" @click="confirm()">保存</a>
        <a href="javascript:;" @click="close()">取消</a>
      </div>
    </div>
  </div>
</template>


<script>
import {upImg} from './upImgJs'

export default upImg

</script>

<style scoped>
@import "upImgCss.css";
</style>
