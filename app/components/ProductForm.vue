<template>
  <el-form :model="form" :rules="rules" label-width="4em" ref="form">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="价格" prop="price">
      <el-input v-model="form.price" />
    </el-form-item>
    <el-form-item label="图片" prop="image">
      <el-input v-model="form.image" />
    </el-form-item>
    <el-form-item label="库存" prop="count">
      <el-input v-model="form.count" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input v-model="form.status" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">
        保存
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
const form = reactive({
  name: '',
  price: ''
})

const rules = {

}

function handleSubmit(){

}
</script>