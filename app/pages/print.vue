<template>
  <div class="header no-print">
    <el-form>
      <div>1群</div>
      <el-form-item>
        <el-input v-model="text" type="textarea" :rows="13"/>
      </el-form-item>
      <div>2群</div>
      <el-form-item>
        <el-input v-model="text2" type="textarea" :rows="13"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="handlePrint">打印</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="print-preview">
    <div class="item" v-for="(i, index) in orders" :key="index">
      <b>小柒烧烤</b>
      <div class="line">
        <span class="label">订餐同学:</span> 
        <span class="value">{{i.name}}</span>
      </div>
      <div class="line">
        <span class="label">餐品:</span> 
        <div class="product-list">
          <div class="product" v-for="p in i.products">
            <span class="product-name"></span> 
            <span class="count">{{ p }}</span>
          </div>
        </div>
      </div>
      <div class="line">
        <span class="label">楼栋:</span>
        <span class="value">{{ i.localtion }}</span>
      </div>
      <!-- <div class="line">
        <span class="label">备注：</span>
        <div class="remark">不要胡萝卜,不要香菜</div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank"
})
const nameMap = ['name', 'products', 'localtion']
const productNameMap = ['name', 'count']
const text = ref('')
const text2 = ref('')

const orders = computed(() => {
  let order1 = text.value.split(/\n/g);
  order1 = order1.filter(Boolean)
  .map(l => {
    return l.replace(/^(\d)+\.\s+/, '1-$1.')
  })
  order1 = order1.map(l => {
    const ary = l.split(/\s+/g);
    console.log(ary)
    return ary.reduce((prev, item ,i) => {
      const name = nameMap[i];
      if(name === 'products'){
        item = item.split(/\/\d*/g);
      }
      return {
        ...prev,
        [name]: item
      }
    }, {});
  })

  let order2 = text2.value.split(/\n/g);
  order2 = order2.filter(Boolean)
  .map(l => {
    return l.replace(/^(\d)+\.\s+/, '2-$1.')
  })
  order2 = order2.map(l => {
    const ary = l.split(/\s+/g);
    console.log(ary)
    return ary.reduce((prev, item ,i) => {
      const name = nameMap[i];
      if(name === 'products'){
        item = item.split(/\/\d*/g);
      }
      // if(name === 'products'){
      //   const ary = item.split(/\/\d*/g);
      //   const list = ary.map(p => {
      //     return p.split(/[xX]\d+/)
      //   })
      //   item = list.reduce((prev, n, i)=> {
      //     return {
      //       ...prev,
      //       [productNameMap[i]]: n ?? 1
      //     }
      //   }, {})
      // }
      return {
        ...prev,
        [name]: item
      }
    }, {});
  })
  return [...order1, ...order2]
})

watch(orders, (val) => {
  console.log('orders', val)
})

function handlePrint(){
  console.log('orders', orders)
  const errors = orders.value.filter(o => {
    return !o.name || !o.products.length || !o.localtion
  })
  if(errors.length){
    console.log(errors)
    alert(JSON.stringify(errors))
    return
  }
  window.print()
}
</script>

<style lang="scss">
.header{
  width: 250px;
  border-right: 1px solid #eee;
  // position: fixed;
  // height: 100%;
}
.print-preview{
  // margin-left: 260px;
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
    flex-wrap: wrap;
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
    // margin-left: 0;
  }
}
</style>