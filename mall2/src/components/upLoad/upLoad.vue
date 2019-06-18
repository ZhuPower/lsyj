<template>
  <div class="upLoadWrap" v-if="bPermission">
    <h2>上传文件</h2>
    <div class="upLoadMain">
      <p>仅支持  changeConfig.js  和  changeStyle.css  及以 _schedule.js结尾的文件上传。</p>
      <p>注：上传成功后会替换原有文件，请先下载原文件修改后再上传</p>
      <input type="text" class="filePath" v-model="filePath">
      <input type="button"  value="上传文件" class="upBtn" @click="upFile()" />
      <input type="file" accept="text/css,text/javascript,application/javascript" ref="upInput">
    </div>
  </div>
</template>


<script>
import {upLoad} from './upLoadJs'

export default upLoad

</script>

<style scoped>
@import "upLoadCss.css";
</style>
