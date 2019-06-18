<template>
  <div class="editTimedReceiptWrap">
    <ul class="ul">
        <li><span>title：</span><input type="text" v-model="oJson.title"></li>
        <li v-if="(!isAdd)&&(!isNew)">
            <span>优惠券ID：</span>
            <select ref="coupon" v-model="coupon">
              <option v-for="(item,key) in oJson.couponInfo" :value="key"  v-text="item.couponId"></option>
            </select>
            <a href="javascript:;" class="addCoupon" @click="addCoupon()">添加</a>
            <a href="javascript:;" class="delCoupon" @click="delCoupon()">删除</a>
        </li>
        <li><span>优惠券ID：</span><input type="text" v-model="couponInfo.couponId"></li>
        <li><span>开始时间：</span><input type="text" v-model="couponInfo.startTime"></li>
        <li><span>结束时间：</span><input type="text" v-model="couponInfo.takeTime"></li>
        <li><span>切换时间：</span><input type="text" v-model="couponInfo.spaceTime"></li>
        <li>
          <span>未领完图：</span>
          <input type="text" class="banner" v-model="couponInfo.imgSrc.ing">
          <input type="button"  value="上传图片" class="upBtn" @click="upBanner()"  />
          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" ref="fileBanner">
        </li>
        <li>
          <span>已领完图：</span>
          <input type="text" class="banner"  v-model="couponInfo.imgSrc.end">
          <input type="button"  value="上传图片" class="upBtn" @click="upBanner2()"  />
        </li>
        <li><span>背景：</span><input type="text" v-model="couponInfo.imgBj"></li>
     </ul>
     <div class="btnWrap">
        <input type="button" value="保存" @click="bSubmit()" />
        <input type="button" value="取消" @click="bCancel()" />
      </div>
  </div>
</template>


<script>
import {editTimedReceipt} from './editTimedReceiptJs'

export default editTimedReceipt

</script>

<style scoped>
@import "editTimedReceiptCss.css";
</style>
