<template>
  <div class="eventDetailsWrap" v-if="bPermission">
    <div class="eventDetailsMain">
      <h2>编辑联盛购物中心活动页</h2>
      <ul class="ul">
        <li>
            <span>轮播图：</span>
            <div class="li-right">
                <img :src="banner" />
                <input type="text" v-model="banner" class="banner on">
                <input type="button"  value="上传图片" class="upBtn" @click="upBanner()" />
                <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" ref="fileBanner">
            </div>
        </li>
        <li><span>主题大标题：</span><input type="text" title="请输入活动标题" ref="title" v-model="title" @focus="setFocus($event)" @blur="setBlur($event)"></li>
        <li><span>小标题（利益点）：</span><input type="text" title="请输入活动小标题" ref="subtitle" v-model="subtitle" @focus="setFocus($event)" @blur="setBlur($event)"></li>
        <li><span>活动时间：</span><input type="text" title="请输入活动时间" ref="date" v-model="date" @focus="setFocus($event)" @blur="setBlur($event)"></li>
        <li><span>活动地点：</span><input type="text" title="请输入活动地点" ref="place" v-model="place" @focus="setFocus($event)" @blur="setBlur($event)"></li>
        <li><span>参与对象：</span><input type="text" title="不限" ref="member" v-model="member" @focus="setFocus($event)" @blur="setBlur($event)"></li>
        <li>
            <span>活动详情：</span>
            <vue-editor v-model="content" useCustomImageHandler @imageAdded="handleImageAdded" :placeholder="placeholder"></vue-editor>
        </li>
        <li><span>样式代码：</span><input type="text" v-model="setStyle" class="on"></li>
        <li><span>代码：</span><textarea class="createCode" ref="createCode"></textarea></li>
      </ul>
      <div class="btnWrap">
          <input type="button"  value="生成代码" @click="getCode()" />
          <a href="javascript:;" class="run" @click='createHtml()'>浏览</a>
          <input type="reset"  value="重置" @click="_reset()"  />
      </div>
    </div>
  </div>
</template>


<script>
import { VueEditor } from 'vue2-editor'
import {eventDetails} from './eventDetailsJs'

eventDetails.components = {VueEditor}

export default eventDetails

</script>

<style scoped>
@import "eventDetailsCss.css";
</style>
