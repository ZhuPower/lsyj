<template>
  <div class="editScheduleWrap">
      <form>
        <ul class="ul">
            <li><span>标题：</span><input type="text" v-model="scheduleInfo.title"></li>
            <li>
            <span>档期：</span><input type="text" v-model="scheduleInfo.number" class="nameClass">
            
            <!-- <span>门店：</span>
            <select ref="client" v-model="scheduleInfo.leiBie" class="leiBie">
              <option value="dd">大档</option>
              <option value="x">小门店</option>
              <option value="jp">精品门店</option>
            </select> -->
             <span class="titleSpan">name：</span><input type="text" v-model="scheduleInfo.activityName" class="titleInput">
             <span>半价：</span><input type="checkbox" v-model="halfPriceInput" class="halfPriceInput"/>
             <span>定时：</span><input type="checkbox" v-model="timeInput" class="timeInput"/>
             <span>TAB：</span><input type="checkbox" v-model="tabInput" class="tabInput"/>
             <span>分类：</span><input type="checkbox" v-model="sortInput" class="sortInput"/>
            </li>
            <li>
                <span>客户端：</span>
                <select ref="client" v-model="clientKey">
                  <option value="0">请选择</option>
                  <option value="pc">PC端</option>
                  <option value="app">app端</option>
                </select>
                <span>栏目：</span>
                <select ref="column" v-model="columnKey">
                    <option value="0">请选择</option>
                </select>
                <span>模板：</span>
                <select ref="template" v-model="templateKey">
                    <option value="0">请选择</option>
                </select>
            </li>
            <li><span>背景：</span><input type="text" v-model="scheduleInfo.background"></li>
            <li>
              <span>头图：</span>
              <input type="text" class="banner" v-model="scheduleInfo.banner">
              <input type="button"  value="上传图片" class="upBtn" @click="upBanner()" />
              <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" ref="fileBanner">
            </li>
            <li>
              <span>表格：</span>
              <input type="text" class="banner" v-model="csvInput">
              <input type="button"  value="上传CSV表格" class="upBtn" @click="upCsv()" />
              <input type="file" accept=".csv" ref="fileCsv">
            </li>
            <li v-if="csvInput"><span>位置：</span><input type="text" v-model="csvPosition"></li>
            <li v-if="sortInput"><span class="imgSrc">栏目图片：</span><input type="text" v-model="sImgSrc"></li>
            <li v-if="sortInput"><span class="imgHref">栏目链接：</span><input type="text" v-model="sImgHref"></li>
            <li v-if="timeInput || sortInput"><span class="timeSpan">时间段：</span><input type="text" v-model="sTimeLi"></li>
            <li v-if="tabInput"><span>TAB背景：</span><input type="text" v-model="headBackground"></li>
            <li v-if="tabInput"><span>TAB类别：</span><input type="text" v-model="sTabLi"></li>
            <li>
                <span>选择门店：</span>
                <select class="chooseStore" ref="chooseStore" v-model="chooseStore">
                    <option value="0">请选择</option>
                    <option v-for="(item,key) in scheduleInfo.storeList" :value="key"  v-text="item.storeName"></option>
                </select>
                <a href="javascript:;" class="addStore" @click="addStore()">添加/修改</a>
                <a href="javascript:;" class="delStore" @click="delStore()">删除</a>
            </li>
            <li>
                <span>门店数据：</span>
                <div class="storeInfo" ref="storeInfo">
                  <div class="storeMain" ref="storeMain"></div>
                  <div class="storeLink" ref="storeLink"><span>链接：</span><p v-text="storeLink2"></p><a :href="storeLink" target="_blank">预览</a></div>
                </div>
                
                <div class="storeListWrap" ref="storeListWrap">
                  <div class="storeList" ref="storeList"></div>
                  <div class="storeDiv" ref="storeDiv"><span></span><p></p></div>
                  <a class="aA col-1-a" target="_blank"><img /></a>
                  <a class="aA col-2-a" target="_blank"><img /></a>
                  <a class="aA col-3-a" target="_blank"><img /></a>
                  <a class="aA col-4-a" target="_blank"><img /></a>
                </div> 
            </li>
        </ul>
        <div class="btnWrap">
            <input type="button" value="保存" @click="save2()" />
        </div>
        <div class="popStore" ref="popStore">
            <div class="popMain">
                <h2>添加门店</h2>
                <ul>
                    <li>
                        <span>选择门店：</span>
                        <select class="chooseStore" ref="chooseStore1" v-model="chooseStore1">
                            <option v-for="(item,key) in storeList" :value="key"  v-text="item"></option>
                        </select>
                    </li>
                    <li>
                      <span>商品列表：</span>
                      <div class="customizeWerap" ref="customizeWerap">
                        <ul class="typeWrap">
                          <li>
                            <span>类型：</span>
                            <label>文本<input type="radio" v-model="typeTemplat" value="txt"/></label>
                            <label>生鲜<input type="radio" v-model="typeTemplat" value="fresh"/></label>
                            <label>分类<input type="radio" v-model="typeTemplat" value="txt2"/></label>
                          </li>
                        </ul>
                        <a href="javascript:;" class="addPor" @click="addProduct()">添加</a>
                        <div class="proTemplate" ref="proTemplate">
                          <div class="cList" v-if="typeTemplat == 'txt'">
                            <ul>
                            <li v-if="tabInput"><span>tab选项：</span><input type="text" class="tabSelect" ref="tabSelect"></li>
                              <li><span>商品ID：</span><input type="text" class="proId"></li>
                              <!-- <li class="oddWrap"><span class="oddSpan">单数：</span><input type="checkbox" class="odd"/> -->
                              <li class="oddWrap"><span>半价：</span><input type="checkbox" class="halfPrice" ref="halfPrice" /><input type="text" class="halfPrices"></li>
                              <li class="markWordWrap"><span>标识词：</span><input type="text" class="markWord"></li>
                            </ul>
                            <a href="javascript:;" class="delPor">删除</a>
                          </div>
                          <div class="cList" v-if="typeTemplat == 'fresh'">
                            <ul>
                              <li><span>时间：</span><input type="text" class="proTime" ref="proTime"></li>
                              <li><span>商品ID：</span><input type="text" class="proId"></li>
                            </ul>
                            <a href="javascript:;" class="delPor">删除</a>
                          </div>
                          <div class="cList" v-if="typeTemplat == 'txt2'">
                            <ul>
                              <li><span>栏目图片：</span><input type="text" class="proSrc" ref="proSrc"></li>
                              <li><span>栏目链接：</span><input type="text" class="proHref" ref="proHref"></li>
                              <li><span>时间：</span><input type="text" class="proTime" ref="proTime"></li>
                              <li><span>商品ID：</span><input type="text" class="proId"></li>
                            </ul>
                            <a href="javascript:;" class="delPor">删除</a>
                          </div>
                        </div>
                        <div class="proWrap" ref="proWrap"></div>
                      </div> 
                    </li>
                    <li><span>Json：</span><textarea class="createCode" ref="createCode"></textarea></li>
                </ul>
                <div class="btnWrap">
                    <input type="button"  value="生成Json" @click="getCode()" />
                    <input type="button"  value="保存" @click="save()" />
                    <input type="button"  value="取消" @click="cancel()" />
                </div>
            </div>
        </div>
    </form>
  </div>
</template>


<script>
import {editSchedule} from '@/components/schedule2/editScheduleJs'

editSchedule.components = {}

export default editSchedule

</script>

<style scoped>
@import "editScheduleCss.css";
</style>
