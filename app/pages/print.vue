<template>
  <div class="header no-print">
    <el-input v-model="text"/>
    <el-button @click="handlePrint">打印</el-button>
  </div>
  <div class="print-preview">
    <div class="item" v-for="i in 30">
      <b>小柒烧烤</b>
      <div class="line">
        <span class="label">订餐同学:</span> 
        <span class="value">1-1 小柒烧烤</span>
      </div>
      <div class="line">
        <span class="label">餐品:</span> 
        <div class="product-list">
          <div class="product">
            <span class="product-name">玉米排骨</span> 
            <span class="count">x1</span>
          </div>
          <div class="product">
            <span class="product-name">玉米排骨</span> 
            <span class="count">x1</span>
          </div>
        </div>
      </div>
      <div class="line">
        <span class="label">楼栋:</span>
        <span class="value">7栋</span>
      </div>
      <div class="line">
        <span class="label">备注：</span>
        <div class="remark">不要胡萝卜,不要香菜</div>
      </div>
      <!-- <div class="line bottom">
        <span class="label">客服电话</span>
        <span class="value">17683760916</span>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank"
})
const text = ref('')

function handlePrint(){
  window.print()
}
</script>

<style lang="scss">
.print-preview{
  width: 1050px;
  height: 1485px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  // grid-template-rows: 1fr 1fr 1fr 1fr;
  // grid-auto-rows: 1fr 1fr 1fr 1fr;
  grid-template-rows: 260px 260px 260px 260px;
  grid-auto-rows: 260px 260px 260px 260px;
  // gap: 20px;
  line-height: 2;
  b{
    display: block;
    padding: 5px 0;
  }
  .line{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .label{
      flex-shrink: 0;
    }
  }
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 0 20px;
    border-top: 1px dotted #ccc;
    border-left: 1px dotted #ccc;
    // &::before{
    //   content: " ";
    //   position: absolute;
    //   top: -10px;
    //   left: -10px;
    //   width: 20px;
    //   height: 1px;
    //   background: #eee;
    // }
    // &::after{
    //   content: " ";
    //   position: absolute;
    //   top: -10px;
    //   left: -10px;
    //   width: 1px;
    //   height: 20px;
    //   background: #eee;
    // }
    // border: 1px solid #eee;
  }
  .bottom{
    margin-top: auto;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // border-top: 1px dotted #ccc;
    // width: 100%;
    // padding-top: 10px;
    // img{
    //   width: 40px;
    // }
    // span{
    //   margin-left: 10px;
    // }
  }
}
@media print {
  body{
    font-size: 7.5pt;
    // width: 210mm;
    // height: 297mm;
    margin: 20mm 30mm;
    overflow: auto;
  }
  .no-print{
    display: none!important;
  }
  .print-preview {
    // width: 100%;
    height: 100%;
  }
}
</style>