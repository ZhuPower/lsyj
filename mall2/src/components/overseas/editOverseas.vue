<template>
  <div class="editOverseasWrap">
      <form>
        <ul class="ul">
            <li>
                <span>title：</span>
                <input type="text" v-model="title">
            </li>
            <li>
                <span>模板：</span>
                <select class="template" ref="template" v-model="templateKey">
                    <option value="0">请选择</option>
                </select>
            </li>
            <li><span>背景：</span><input type="text" v-model="background"></li>
            <li>
              <span>头图：</span>
              <input type="text" class="banner" v-model="banner">
              <input type="button"  value="上传图片" class="upBtn" @click="upBanner()" />
              <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" ref="fileBanner">
            </li>
            <li>
              <span>商品列表：</span>
              <div class="customizeWerap" ref="customizeWerap">
                <ul class="typeWrap">
                  <li>
                    <span>类型：</span>
                    <label>文本<input type="radio" v-model="typeTemplat" value="txt"/></label>
                    <label>图片<input type="radio" v-model="typeTemplat" value="image"/></label>
                    <label>Tab<input type="checkbox" v-model="typeTab" /></label>
                    <label>Tab-5<input type="checkbox" v-model="typeTab2" /></label>
                  </li>
                  <li v-if="typeTemplat == 'image'">
                    <span>个数：</span>
                    <select ref="rowNum" v-model="rowNum">
                      <option value="1">一行一个</option>
                      <option value="2">一行两个</option>
                      <option value="3">一行三个</option>
                      <option value="4">一行四个</option>
                    </select>
                  </li>
                </ul>
                <a href="javascript:;" class="addPor" @click="addProduct()">添加</a>
                <div class="proTemplate" ref="proTemplate">
                  <div class="cList" v-if="typeTemplat == 'txt'">
                    <ul>
                      <li v-if="tabInput"><span>tab选项：</span><select class="tabSelect" ref="tabSelect"><option value="0">请选择</option></select></li>
                      <li><span>商品ID：</span><input type="text" class="proId"></li>
                      <li class="oddWrap"><span class="oddSpan">单数：</span><input type="checkbox" class="odd"/></li>
                      <li class="oddWrap"><span>接口：</span><input type="checkbox" class="jiekou"/></li>
                      <li class="oddWrap"><span>半价：</span><input type="checkbox" class="halfPrice"/><input type="text" class="halfPrices"></li>
                      <li class="markWordWrap"><span>标识词：</span><input type="text" class="markWord"></li>
                    </ul>
                    <a href="javascript:;" class="delPor">删除</a>
                  </div>
                  <div class="cList imageWrap" v-if="typeTemplat == 'image'">
                    <div class="col-1-list" v-if="rowNum == 1">
                      <div class="list">
                        <img src="../../assets/defaultProduct.jpg" />
                        <div class="site">
                          <label>图片链接：<input type="text" value="http://www.yijiago.com/promotion/app/rearEnd/mall/upload/defaultProduct.jpg" class="productImg"></label>
                          <label>商品链接：<input type="text" value="javascript:;"></label>
                          <label style="display:none">优惠券ID：<input type="text"></label>
                          <input type="button"  value="上传" class="upBtn" />
                          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="fileProduct">
                          </div>
                      </div>
                    </div>
                    <div class="col-2-list" v-if="rowNum == 2">
                      <div class="list">
                        <img src="../../assets/defaultProduct.jpg" />
                        <div class="site">
                          <label>图片链接：<input type="text" value="http://www.yijiago.com/promotion/app/rearEnd/mall/upload/defaultProduct.jpg" class="productImg"></label>
                          <label>商品链接：<input type="text" value="javascript:;"></label>
                          <label style="display:none">优惠券ID：<input type="text"></label>
                          <input type="button"  value="上传" class="upBtn" />
                          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="fileProduct">
                          </div>
                      </div>
                      <div class="list">
                        <img src="../../assets/defaultProduct.jpg" />
                        <div class="site">
                          <label>图片链接：<input type="text" value="http://www.yijiago.com/promotion/app/rearEnd/mall/upload/defaultProduct.jpg" class="productImg"></label>
                          <label>商品链接：<input type="text" value="javascript:;"></label>
                          <label style="display:none">优惠券ID：<input type="text"></label>
                          <input type="button"  value="上传" class="upBtn" />
                          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="fileProduct">
                          </div>
                      </div>
                    </div>
                    <div class="col-3-list" v-if="rowNum == 3">
                      <div class="list">
                        <img src="../../assets/defaultProduct.jpg" />
                        <div class="site">
                          <label>图片：<input type="text" value="http://www.yijiago.com/promotion/app/rearEnd/mall/upload/defaultProduct.jpg" class="productImg"></label>
                          <label>商品：<input type="text" value="javascript:;"></label>
                          <label style="display:none">优惠券ID：<input type="text"></label>
                          <input type="button"  value="上传" class="upBtn" />
                          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="fileProduct">
                          </div>
                      </div>
                      <div class="list">
                        <img src="../../assets/defaultProduct.jpg" />
                        <div class="site">
                          <label>图片：<input type="text" value="http://www.yijiago.com/promotion/app/rearEnd/mall/upload/defaultProduct.jpg" class="productImg"></label>
                          <label>商品：<input type="text" value="javascript:;"></label>
                          <label style="display:none">优惠券ID：<input type="text"></label>
                          <input type="button"  value="上传" class="upBtn" />
                          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="fileProduct">
                          </div>
                      </div>
                      <div class="list">
                        <img src="../../assets/defaultProduct.jpg" />
                        <div class="site">
                          <label>图片：<input type="text" value="http://www.yijiago.com/promotion/app/rearEnd/mall/upload/defaultProduct.jpg" class="productImg"></label>
                          <label>商品：<input type="text" value="javascript:;"></label>
                          <label style="display:none">优惠券ID：<input type="text"></label>
                          <input type="button"  value="上传" class="upBtn" />
                          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="fileProduct">
                          </div>
                      </div>
                    </div>
                    <div class="col-4-list" v-if="rowNum == 4">
                      <div class="list">
                        <img src="../../assets/defaultProduct.jpg" />
                        <div class="site">
                          <label>图片：<input type="text" value="http://www.yijiago.com/promotion/app/rearEnd/mall/upload/defaultProduct.jpg" class="productImg"></label>
                          <label>商品：<input type="text" value="javascript:;"></label>
                          <label style="display:none">优惠券ID：<input type="text"></label>
                          <input type="button"  value="上传" class="upBtn" />
                          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="fileProduct">
                          </div>
                      </div>
                      <div class="list">
                        <img src="../../assets/defaultProduct.jpg" />
                        <div class="site">
                          <label>图片：<input type="text" value="http://www.yijiago.com/promotion/app/rearEnd/mall/upload/defaultProduct.jpg" class="productImg"></label>
                          <label>商品：<input type="text" value="javascript:;"></label>
                          <label style="display:none">优惠券ID：<input type="text"></label>
                          <input type="button"  value="上传" class="upBtn" />
                          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="fileProduct">
                          </div>
                      </div>
                      <div class="list">
                        <img src="../../assets/defaultProduct.jpg" />
                        <div class="site">
                          <label>图片：<input type="text" value="http://www.yijiago.com/promotion/app/rearEnd/mall/upload/defaultProduct.jpg" class="productImg"></label>
                          <label>商品：<input type="text" value="javascript:;"></label>
                          <label style="display:none">优惠券ID：<input type="text"></label>
                          <input type="button"  value="上传" class="upBtn" />
                          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="fileProduct">
                          </div>
                      </div>
                      <div class="list">
                        <img src="../../assets/defaultProduct.jpg" />
                        <div class="site">
                          <label>图片：<input type="text" value="http://www.yijiago.com/promotion/app/rearEnd/mall/upload/defaultProduct.jpg" class="productImg"></label>
                          <label>商品：<input type="text" value="javascript:;"></label>
                          <label style="display:none">优惠券ID：<input type="text"></label>
                          <input type="button"  value="上传" class="upBtn" />
                          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" class="fileProduct">
                          </div>
                      </div>
                    </div>
                    <a href="javascript:;" class="delPor">删除</a>
                  </div>
                  <div class="cList imageWrap2" v-if="typeTemplat == 'image2'">
                    <ul>
                      <li v-if="tabInput"><span>tab选项：</span><select class="tabSelect" ref="tabSelect"><option value="0">请选择</option></select></li>
                      <li><span>商品ID：</span><input type="text" class="proId"></li>
                      <li><span>图片链接：</span><input type="text" class="imgSrc"></li>
                      <li><span>每行列数：</span><input type="text" class="rowNum"></li>
                    </ul>
                    <a href="javascript:;" class="delPor">删除</a>
                  </div>
                  <div class="cList timeWrap" v-if="typeTemplat == 'timing'">
                    <ul>
                      <li><span>日期：</span><input type="date" class="startDate">——<input type="date" class="endDate"></li>
                      <li><span>商品ID：</span><input type="text" class="proId"></li>
                    </ul>
                    <a href="javascript:;" class="delPor">删除</a>
                  </div>
                </div>
                <div class="proWrap" ref="proWrap"></div>
              </div> 
            </li>
        </ul>
        <div class="btnWrap">
         <input type="button" value="保存" @click="bSubmit()" />
         <input type="button" value="取消" @click="bCancel()" />
       </div>
    </form>

    <div class="bjBox" v-if="popShow"></div>
    <div class="popBox" v-if="popShow">
      <div>
        <p v-html="sPrompt" :class="{'scz':((sPrompt=='数据生成中。。。')?true:false)}"></p>
        <a href="javascript:;" @click="iKnow()" v-if="popBtnShow">修改</a>
        <a href="javascript:;" @click="iDelete()" v-if="popBtnShow">删除</a>
      </div>
    </div>

  </div>
</template>


<script>
import {editOverseas} from './editOverseasJs'

export default editOverseas

</script>

<style scoped>
@import "editOverseasCss.css";
</style>
