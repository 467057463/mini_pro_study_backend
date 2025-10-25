<template>
<el-card>
  <el-form class="query-form" inline>
    <el-space wrap>
      <el-form-item label="筛选">
        <el-select v-model="category" style="width: 8em" :options="categoryOptions"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="condition" style="width: 6em" :options="conditionOptions"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="keyword" placeholder="请输入关键词"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="emits('search')">搜索</el-button>
        <el-button @click="emits('reset')">重置</el-button>
      </el-form-item>
    </el-space>
  </el-form>
</el-card>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

const category = defineModel<string>('category')
const condition = defineModel<string>('condition')
const keyword = defineModel<string>('keyword')
const emits = defineEmits(['search', 'reset'])

defineProps<{
  categoryOptions: {label: string, value: string}[],
  conditionOptions: {label: string, value: string}[]
}>()

</script>

<style lang="scss" scoped>
.query-form{
  .el-form-item {
    margin: 0;
  }
}
</style>