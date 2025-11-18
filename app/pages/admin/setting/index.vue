<template>
  <section>
    <search-form 
      v-model:category="searchFormData.category"
      v-model:condition="searchFormData.condition"
      v-model:keyword="searchFormData.keyword"
      :category-options="categoryOptions" 
      :condition-options="conditionOptions"
      @search="handleSearch" 
      @reset="handleRestore"
    />

    <el-card>
      <el-space direction="vertical" size="default" fill style="width: 100%;">
        <div class="btn-wrapper">
          <el-button :icon="Plus" type="primary" @click="handleCreate">新建</el-button>
        </div>
        <el-table :border="true" stripe highlight-current-row :data="data?.list" style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column prop="group" label="分组" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="value" label="值" />
          <el-table-column label="" fixed="right" width="120">
            <template #default="{row}">
              <el-button link type="primary" size="small" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button link type="primary" size="small" @click="handleRemove(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination 
          v-model:current-page="searhchQuery.page" 
          v-model:page-size="searhchQuery.size"
          background layout="prev, pager, next, ->, sizes, jumper, total" 
          :total="data?.count"
        />
      </el-space> 
    </el-card>
  </section>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import CreateForm from './components/CreateForm.vue'

definePageMeta({
  title: '全局配置',
  middleware: ['auth', 'role']
})

const categoryOptions = [
  {
    label: '分组',
    value: 'group'
  },
  {
    label: '名称',
    value: 'name'
  },
  // {
  //   label: '值',
  //   value: 'value'
  // }
]

const { conditionOptions, searchFormData, searhchQuery, handleSearch, handleRestore } = useSearchForm({
  categoryOptions: categoryOptions
})

const { data, refresh } = await useAPI("/settings", {
  query: searhchQuery
})

function handleCreate(){
  const { promise } = showAppDialog(CreateForm, {
    title: '新建配置',
  })
   
  promise.then(r => {
    if(r === 'confirm'){
      ElMessage({
        type: 'success',
        message: '创建成功'
      })
      refresh()
    }
  })
}

function handleEdit(data){
  const { promise } = showAppDialog(CreateForm, {
    title: '新建配置',
    prop: data
  })
   
  promise.then(r => {
    if(r === 'confirm'){
      ElMessage({
        type: 'success',
        message: '修改成功'
      })
      refresh()
    }
  })
}

async function handleRemove({id}){
  try {
    await useRequest(`/settings/${id}`, {
      method: "delete"
    })
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    refresh()
  } catch (error) {
    console.error(error)
  }
}
</script>

