<template>
  <div>
    <el-button @click="navigateTo('/admin/product/create')">新建商品</el-button>

    <el-table :data="data?.list" style="width: 100%">
      <el-table-column label="图片">
        <template #default="{row}">
          <el-image :src="row.image"/>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="price" label="价格" width="180" />
      <el-table-column prop="count" label="库存" width="180" />
      <el-table-column prop="status" label="状态" width="180" />
      <el-table-column fixed="right" width="120">
        <template #default="{row}">
          <el-button link type="primary" size="small" @click="navigateTo('/admin/product/1')">
            编辑
          </el-button>
          <el-button link type="primary" size="small" @click="handleRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: '商品列表',
  middleware: ['auth', 'role']
})

const { data, refresh } = await useAPI("/products")

</script>