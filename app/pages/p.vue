<template>
  <Body class="p">
    <div class="actions no-print">
      <el-button @click="handlePrint">test</el-button>
    </div>
    <div class="table-wrapper">
      <table>
        <tbody>
          <tr v-for="i in 4" :key="i">
            <td v-for="a in 3" :key="a">{{ i }} - {{ a }}</td>
          </tr>
          <tr>
            <td>111</td>
            <td>111</td>
          </tr>
        </tbody>
      </table>
      <!-- <table>
        <tbody>
          <tr v-for="i in 2" :key="i">
            <td v-for="a in 3" :key="a">{{ i }} - {{ a }}</td>
          </tr>
        </tbody>
      </table> -->
    </div>
  </Body>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank"
})

function handlePrint(){
  window.print()
}
</script>

<style lang="scss" scoped>
.actions{
  width: 250px;
  height: 100%;
  overflow: auto;
}
.table-wrapper{
  width: 100%;
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
  table{
    font-size: 9pt;
  }
}
</style>