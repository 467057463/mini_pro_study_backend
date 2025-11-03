<template>
  <Body class="p">
    <div class="actions no-print">
      <el-form label-position="top">
        <el-form-item :label="item.label" v-for="item in data">
          <el-input v-model="item.value" type="textarea" :rows="13"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="handlePrint">打印</el-button>
        </el-form-item>
      </el-form>
      <template>
        <ul>
          <li>订餐份数：{{ orders.length }}</li>
          <!-- <li>订餐份数：{{ products.length }}</li> -->
        </ul>
        <div>楼栋订餐份数统计：</div>
        <ul>
          <li v-for="item in localtionOrderArray">
            <span>{{ item.key }}栋</span>
            <span>{{ item?.list?.length }}</span>
          </li>
        </ul>
        <!-- <div>楼栋订餐份数统计：</div>
        <ul>
          <li v-for="item in localtionProductArray">
            <span>{{ item.key }}栋</span>
            <span>{{ item?.list?.length }}</span>
          </li>
        </ul> -->
        <div>餐品分类份数统计：</div>
        <ul>
          <li v-for="item in productArray">
            <span>{{ item.key }}栋</span>
            <span>{{ item?.list?.length }}</span>
          </li>
        </ul>
      </template>
    </div>
    <div class="table-wrapper">
      <table>
        <tbody>
          <tr v-for="tr in tableData">
            <td v-for="i in tr">
              <template v-if="i">
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
                  <span class="value">{{ i.productName }}</span> 
                </div>
                <div class="line">
                  <span class="label">楼栋:</span>
                  <span class="value">{{ i.localtion }}</span>
                </div>
                <div v-if="i.remark" class="line">
                  <span class="label">备注：</span>
                  <div class="remark">{{i.remark}}</div>
                </div>
                <div class="line" v-if="i.products.length > 1">
                  <span class="label">取餐提示：</span>
                  <span class="value">
                    您共有{{ i.products.length }}份
                  </span>
                </div>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Body>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { chunk } from 'lodash';
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

const data = ref([
  {
    label: '群1',
    value: `2. Qiyyiqq 玉米排骨 5栋
3. iueee   玉米排骨  五栋
4. დ᭄ꦿ挽迪꧔ꦿ℘ 玉米排骨 3栋
5. 一颗柠檬 玉米排骨  5栋
6. 不说话的耳朵  莲藕排骨 9栋
7. 24 玉米排骨 2栋
8. ꒰ঌ千汐想回家໒꒱ 莲藕排骨 2栋
9. WAHH💖 玉米排骨 2栋
10. iiiovo 玉米排骨 5栋
11. Xxi 玉米排骨 5栋
12. 柠檬汽水糖 玉米排骨x3/莲藕排骨x2 5栋
13. 绥 莲藕排骨 5栋
14. 🍒 玉米排骨 5栋`
  },
  {
    label: '群2',
    value: `2. 安笙 玉米胡萝卜淮山排骨汤 2栋
3. 蛋 玉米排骨汤 二栋
4. 四叶草 玉米排骨汤 11
5. 圆圈oᐝ 玉米排骨汤x2 11栋
6. Y.  玉米排骨汤 11栋
7. Co6bl 排骨莲藕汤 11
8. 蛋 莲藕汤 二栋
9. L. 玉米排骨汤 九栋`
  }
])

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
  let list = string
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

// 餐单
const orders = computed(() => {
  const list = data.value.map((i, index) => {
    return generateOrder(i.value, index + 1)
  })
  return list
    .flat()
    .reduce((prev, item) => {
      const list = item.products.map((p, index) => {
        return {
          ...item,
          productName: p.name,
          productCount: p.count,
          currentProductIndex: index
        }
      })
      return [...prev, ...list]
    }, [])
    .sort((a, b) => {
      const aIndex = nameKey.findIndex((i) => i.name === a.productName);
      const bIndex = nameKey.findIndex((i) => i.name === b.productName);

      return (aIndex * 100 + a.localtionValue) - (bIndex * 100 + b.localtionValue)
    })
    .map((i, index) => {
      const _index = index + 1;
      return {
        ...i,
        createTime: dayjs().format("YYYY-MM-DD"),
        orderNum: dayjs().format("YYYYMMDD") + (_index < 10 ? `0${_index}` : _index)
      }
    })
})

const tableData = computed(() => {
  const arrayLength = Math.ceil(orders.value.length / 4);
  let list = Array.from({length: arrayLength}).map(i => {
    return Array.from({length: 4})
  });
  orders.value.forEach((item, i) => {
    let parentIndex = i % arrayLength;
    let childIndex = Math.floor(i / arrayLength);

    console.log({
      parentIndex,
      childIndex
    })
    // console.log(list[parentIndex][childIndex])
    list[parentIndex][childIndex] = item;
  })

  return list;
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
  return groupBy(orders.value, 'productName')
})

function handlePrint(){
  const error = orders.value.find(o => {
    return !o.name || !o.products.length || !o.localtion
  })
  if(error){
    console.log(error)
    alert(`${error.name} 格式错误`)
    return
  }
  console.log(orders.value, tableData.value, tableData.value)
  window.print()
}
</script>

<style lang="scss" scoped>
.actions{
  width: 350px;
  height: 100%;
  overflow: auto;
  border-right: 1px solid #ccc;
  height: 100vh;
  overflow: auto;
  position: fixed;
}
.table-wrapper{
  width: 100%;
  padding-left: 350px;
}
table{
  width: 100%;
  // height: 100vh;
  border-collapse: collapse;
  line-height: 1;
  tr{
    height: calc(100vh/3);
  }
  td {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    align-content: flex-start;
    padding: 10px;
    line-height: 2;
    width: 25%;
    b{
      margin-top: 30px;
      display: block;
      text-align: center;
    }
    .line{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .label{
        flex-shrink: 0;
      }
      .value{
        text-align: right;
        width: calc(100% - 5em);
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
  tr:first-child td{
    border-top: none;
  }

  td:first-child{
    border-left: none;
  }
}

@media print {
  @page {
    size: portrait;
    // 去掉页眉页脚
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
  }
  // 告诉浏览器在渲染它时不要对框进行颜色或样式调整
  * {
    -webkit-print-color-adjust: exact !important;
    -moz-print-color-adjust: exact !important;
    -ms-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .no-print{
    display: none;
  }
  .table-wrapper{
    padding-left: 0;
  }
  table{
    font-size: 9pt;
  }
  b {
    font-size: 12pt;
  }
}
</style>