<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div class="header no-print">
    <el-form>
      <!-- <div>1群</div> -->
      <el-form-item>
        <el-input v-model="text" type="textarea" :rows="13"/>
      </el-form-item>
      <!-- <div>2群</div> -->
      <el-form-item>
        <el-input v-model="text2" type="textarea" :rows="13"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="handlePrint">test</el-button>
      </el-form-item>
    </el-form>
    <ul>
      <li>订餐人数：{{ orders.length }}</li>
      <li>订餐份数：{{ products.length }}</li>
    </ul>
    <div>楼栋订餐人数统计：</div>
    <ul>
      <li v-for="item in localtionOrderArray">
        <span>{{ item.key }}栋</span>
        <span>{{ item?.list?.length }}</span>
      </li>
    </ul>
    <div>楼栋订餐份数统计：</div>
    <ul>
      <li v-for="item in localtionProductArray">
        <span>{{ item.key }}栋</span>
        <span>{{ item?.list?.length }}</span>
      </li>
    </ul>
    <div>餐品分类份数统计：</div>
    <ul>
      <li v-for="item in productArray">
        <span>{{ item.key }}栋</span>
        <span>{{ item?.list?.length }}</span>
      </li>
    </ul>
  </div>
  <div class="print-preview">
    <template v-for="(i, index) in orders" :key="index">
      <template v-for="(tp, tpi) in i.products" :key="tpi">
        <div class="item">
          <b>小柒烧烤</b>
          <div class="line">
            <span class="label">订餐同学:</span> 
            <span class="value">{{i.name}}</span>
          </div>
          <div class="line">
            <span class="label">订单编号:</span> 
            <span class="value">{{i.orderNum}}</span>
          </div>
          <div class="line">
            <span class="label">下单日期:</span> 
            <span class="value">{{i.createTime}}</span>
          </div>
          <div class="line">
            <span class="label">餐品:</span> 
            <div class="product-list">
              <div v-for="(p, pi) in i.products" :key="pi" class="product" :class="{active: pi === tpi}">
                <span class="product-name">{{ p.name }}</span> 
                <span class="count" v-if="pi === tpi && i.products.length > 1">*</span>
              </div>
            </div>
          </div>
          <!-- <div v-if="i.products.length > 1">您共点了{{ i.products.length }}份，当前第{{ tpi + 1 }}份</div> -->
          <div class="line">
            <span class="label">楼栋:</span>
            <span class="value">{{ i.localtion }}</span>
          </div>
          <div v-if="i.remark" class="line">
            <span class="label">备注：</span>
            <div class="remark">{{i.remark}}</div>
          </div>
        </div>
      </template>
    </template>
    <!-- <div v-for="(i, index) in orders" :key="index" class="item">
      <b>小柒烧烤</b>
      <div class="line">
        <span class="label">订餐同学:</span> 
        <span class="value">{{i.name}}</span>
      </div>
      <div class="line">
        <span class="label">餐品:</span> 
        <div class="product-list">
          <div v-for="(p, pi) in i.products" :key="pi" class="product">
            <span class="product-name">{{ p.name }}</span> 
            <span class="count">{{ p.count}}</span>
          </div>
        </div>
      </div>
      <div class="line">
        <span class="label">楼栋:</span>
        <span class="value">{{ i.localtion }}</span>
      </div>
      <div v-if="i.remark" class="line">
        <span class="label">备注：</span>
        <div class="remark">{{i.remark}}</div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
definePageMeta({
  layout: "blank"
})
const nameMap = ['name', 'products', 'localtion', 'remark'];
const productNameMap = ['name', 'count'];
const nameKey = [
  {key: ['玉米'], name: '玉米排骨'},
  {key: ['莲藕'], name: '莲藕排骨'},
];
const numberMap = {
  '一':1,
  '二':2,
  '三':3,
  '四':4,
  '五':5,
  '六':6,
  '七':7,
  '八':8,
  '九':9,
  '十':10,
  '十一':11,
  '十二':12,
  '十三':13,
  '十四':14,
  '十五':15,
  '十六':16,
  '十七':17,
  '十八':18,
  '十九':19
};

// const text = ref<string>('')
const text = ref<string>(`2. Qiyyiqq 玉米排骨 5栋
3. iueee   玉米排骨  五栋
4. დ᭄ꦿ挽迪꧔ꦿ℘ 玉米排骨 3栋
5. 一颗柠檬 玉米排骨  5栋
6. 不说话的耳朵  莲藕排骨 9栋
7. 24 玉米排骨 2栋
8. ꒰ঌ千汐想回家໒꒱ 莲藕排骨 2栋
9. WAHH💖 玉米排骨 2栋
10. iiiovo 玉米排骨 5栋
11. Xxi 玉米排骨 5栋
12. 柠檬汽水糖 玉米排骨/莲藕排骨 5栋
13. 绥 莲藕排骨 5栋
14. 🍒 玉米排骨 5栋`)
// const text2 = ref<string>('')
const text2 = ref<string>(`2. 安笙 玉米胡萝卜淮山排骨汤 2栋
3. 蛋 玉米排骨汤 二栋
4. 四叶草 玉米排骨汤 11
5. 圆圈oᐝ 玉米排骨汤x2 11栋
6. Y.  玉米排骨汤 11栋
7. Co6bl 排骨莲藕汤 11
8. 蛋 莲藕汤 二栋
9. L. 玉米排骨汤 九栋`)

function groupBy(array, key){
  return array.reduce((prev, item) => {
    let r = prev.find(i => i.key === item[key]);
    if(!r){
      r = {
        key: item[key],
        list: []
      }
      prev.push(r)
    }
    r.list.push(item)
    return prev;
  }, [])
}

function generateArray(length: number, defaultArray: Array<any>){
  return Array.from({ length }, (_, i) => defaultArray[i])
}

function generateOrder(text: MaybeRef<string>, group: number = 1){
  let string = toValue(text);

  // 如果是空无效
  if(!string){
    return []
  }

  // 过滤并替换微信名
  const nameReg = /^(\d+)\.\s*/mg;
  string = string.replace(nameReg, `${group}-$1.`);

  // 分隔成数组，并过滤无效的行
  const list = string
    .split(/\n/g)
    .filter(s => s != '')

    .map(s => {
      // 将行分隔
      const ary = generateArray(4, s.split(/\s+/g));
      return ary.reduce((prev, item , index) => {
        const key = nameMap[index];
        if(key === 'localtion'){
          let number;
          const l = item ?? '';
          if(/\d/.test(l)){
            number = l.replace(/\D+/g, '');
          } else {
            const k = Object.keys(numberMap).find(i => l.includes(i))
            number = numberMap?.[k] ?? ''
          }
          if(number){
            item = `${number}栋`
            prev.localtionValue = Number(number)
          } else {
            prev.localtionValu = undefined
          }
          console.log(item, number)
        }
        if(key === 'products'){
          const ary = (item?.split(/\//g) ?? [])
            .map(i => {
              const ary = generateArray(2, i.split(/[xX]/g));
              return ary.reduce((prev, p, pi) => {
                const key = productNameMap[pi];
                if(key === 'name'){
                  const r = nameKey.find(i => i.key.find(k => p.includes(k)))
                  p = r?.name;
                }
                if(key === 'count'){
                  p = Number(p ?? 1)
                }
                return {
                  ...prev,
                  [key!]: p
                }
              }, {})
            })
            .filter(i => i.name)
            .reduce((prev, item) => {
              return [...prev, ...Array.from({length: item.count}, () => {
                return {
                  ...item, 
                  count: 1
                }
              })]
            }, [])
          item = ary as unknown as string;
        }
        return {
          ...prev,
          [key!]: item
        }
      }, {})
    })
  return list
}

// 顾客
const orders = computed(() => {
  const order1 = generateOrder(text);
  const order2 = generateOrder(text2, 2);
  return [...order1, ...order2]
    .sort((a, b) => a.localtionValue - b.localtionValue)
    .map((i, index) => {
      const _index = index + 1;
      return {
        ...i,
        createTime: dayjs().format("YYYY-MM-DD"),
        orderNum: dayjs().format("YYYYMMDD") + (_index < 10 ? `0${_index}` : _index)
      }
    })
})

// 楼栋顾客
const localtionOrderArray = computed(() => {
  return groupBy(orders.value, 'localtionValue');
})

// 楼栋餐品
const localtionProductArray = computed(() => {
  const r = groupBy(orders.value, 'localtionValue');
  return r.map(i => {
    i.list =  i.list.reduce((prev, item) => {
      return [...prev, ...item.products]
    }, [])
    return i;
  })
})

// 餐品
const products = computed(() => {
  return orders.value.reduce((prev, item) => {
    return [...prev, ...item.products]
  }, [])
})

// 餐品分类
const productArray = computed(() => {
  return groupBy(products.value, 'name')
})

function handlePrint(){
  console.log('orders', orders.value)

  const error = orders.value.find(o => {
    return !o.name || !o.products.length || !o.localtion
  })
  if(error){
    console.log(error)
    alert(`${error.name} 格式错误`)
    return
  }

  console.table({
    orderCount: orders.value.length,
    productCount: products.value.length,
  })

  console.log(localtionOrderArray.value, localtionProductArray.value)
  console.log(productArray.value)

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