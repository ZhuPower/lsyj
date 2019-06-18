<template>
  <div class="editMallWrap">
    <div class="mallTitle">
      <span>标题：</span> <input type="text"  v-model="mallTitle" >
    </div>
    <div class="mallBanner">
      <div class="selectImage">
        <span>选择轮播图片：</span>
        <select v-model="bannerNum" >
            <option v-for="(item,index) in info.banner" :value="index"  v-text=" '图' + (index + 1)"></option>
        </select>
        <span class="delBanner" @click="delBanner()">删除</span>
        <span class="addBanner" @click="addBanner()">添加</span>
      </div>
      <div class="imageInfo">
        <div class="imageLeft">
          <img :src="bannerSrc" />
        </div>
        <div class="imageRight">
          <div><label><span>是否隐藏：</span><input type="checkbox" v-model="bannerShow" ></label></div>
          <div>
            <span>图片链接：</span>
            <input type="text" v-model="bannerSrc" class="banner">
            <input type="button"  value="上传图片" class="upBtn" @click="upBanner('bannerSrc')" />
            <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" ref="fileBanner">
          </div>
          <div>
            <span>活动链接：</span>
            <input type="text" v-model="activityNum">
          </div>
        </div>
      </div>
    </div>
    <div class="mallStore">
      <div class="selectFloor">
        <span>选择商场楼层：</span>
        <select v-model="floorNum" >
            <option v-for="n in floorTotal" :value="'floor' + n" v-text=" n + '楼'"></option>
        </select>
        <span>选择商铺：</span>
        <select v-model="storeNum" >
            <option v-for="(item,index) in storeList" :value="index" v-text="item.name"></option>
        </select>
        <span class="delStore" @click="delStore()">删除</span>
        <span class="addStore" @click="addStore()">添加</span>
      </div>
      <div class="storeInfo">
        <div class="imageLeft">
          <img :src="storeSrc" />
        </div>
        <div class="imageRight">
          <div>
            <label><span>是否隐藏：</span><input type="checkbox" v-model="storeShow" ></label>
            <label><span>显示“惠”：</span><input type="checkbox" v-model="storeHui"></label>
            <label><span>显示“去买单”：</span><input type="checkbox" v-model="storeQmd" ></label>
          </div>
          <div><span>商铺名称：</span><input type="text" v-model="storeName"></div>
          <div>
            <span>图片链接：</span>
            <input type="text" v-model="storeSrc" class="storeSrc">
            <input type="button"  value="上传图片" class="upBtn" @click="upBanner('storeSrc')" />
          </div>
          <div><span>商铺链接：</span><input type="text" v-model="storeHref"></div>
        </div>
      </div>
    </div>
    <div class="btnWrap">
        <input type="button" value="保存" @click="_submit()" />
    </div>
    <div class="popBanner" ref="popBanner">
      <div class="popMain">
        <h3>添加轮播图</h3>
        <div class="bannerInfo">
          <div class="imageLeft">
            <img :src="newBanner.imgSrc" />
          </div>
          <div class="imageRight">
            <div><label><span>是否隐藏：</span><input type="checkbox" v-model="newBanner.show" ></label></div>
            <div>
              <span>图片链接：</span>
              <input type="text" v-model="newBanner.imgSrc" class="newBanner" >
              <input type="button"  value="上传图片" class="upBtn" @click="upBanner('newBanner.imgSrc')" />
            </div>
            <div>
              <span>活动链接：</span>
              <input type="text" v-model="newActivityNum">
            </div>
          </div>
        </div>
        <div class="btnWrap">
            <input type="button" value="保存" @click="saveBanner()" />
            <input type="button" value="取消"  @click="cancelBanner()" />
        </div>
      </div>
    </div>
    <div class="popStore" ref="popStore">
      <div class="popMain">
        <h3>添加商铺</h3>
        <div class="storeInfo">
          <div class="imageLeft">
            <img :src="newStore.imgSrc" />
          </div>
          <div class="imageRight">
            <div>
              <span>选择楼层：</span>
              <select v-model="newFloorNum" >
                  <option v-for="n in floorTotal" :value="'floor' + n" v-text=" n + '楼'"></option>
              </select>
            </div>
            <div><span>商铺名称：</span><input type="text" v-model="newStore.name"></div>
            <div>
              <label><span>是否隐藏：</span><input type="checkbox" v-model="newStore.show" ></label>
              <label><span>显示“惠”：</span><input type="checkbox" v-model="newStore.sale"></label>
              <label><span>显示“去买单”：</span><input type="checkbox" v-model="newStore.qmd" ></label>
            </div>
            <div>
              <span>图片链接：</span><input type="text" v-model="newStore.imgSrc" class="newStore">
              <input type="button"  value="上传图片" class="upBtn" @click="upBanner('newStore.imgSrc')" />
            </div>
            <div><span>商铺链接：</span><input type="text" v-model="newStore.aHref"></div>
          </div>
        </div>
        <div class="btnWrap">
            <input type="button" value="保存" @click="saveStore()" />
            <input type="button" value="取消"  @click="cancelStore()" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {editMall} from '@/components/lsMall/editMallJs'

editMall.components = {}

export default editMall

</script>

<style scoped>
@import "editMallCss.css";
</style>
