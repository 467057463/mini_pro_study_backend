<template>
  <div>
    <el-button @click="handleCreate">新建配置</el-button>
    <el-table :data="data?.data?.list" style="width: 100%">
      <el-table-column prop="key" label="key" width="180" />
      <el-table-column prop="name" label="配置名称" width="180" />
      <el-table-column prop="value" label="配置值" />
      <el-table-column label="" fixed="right" width="120">
        <template #default="{row}">
          <el-button link type="primary" size="small" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button link type="primary" size="small" @click="handleRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="新建配置" width="500">
      <el-form :model="form" :rules="rules" label-width="4em" ref="createForm">
        <el-form-item label="key" prop="key">
          <el-input v-model="form.key" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input v-model="form.value" type="textarea" rows="3"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmitSetting">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
const { data, refresh } = await useAPI("/settings")

let editId = null;
const dialogFormVisible = ref(false);
const $createForm = useTemplateRef('createForm');
const form = reactive({
  key: '',
  name: '',
  value: ''
})

const rules = reactive({
  key: [{
    required: true,
    message: 'key 不能为空'
  }],
  name: [{
    required: true,
    message: '请输入配置名称'
  }],
  value: [{
    required: true,
    message: '请输入配置值'
  }]
})

async function handleSubmitSetting(){
  try {
    await $createForm.value.validate();
    const url = editId ? `/api/settings/${editId}` : "/api/settings";
    await $fetch(url, {
      method: "POST",
      body: form
    })
    dialogFormVisible.value = false
    refresh()
  } catch (error) {
    console.error(error)
  }
}

function handleCreate(){
  editId = null;
  Object.assign(form, {
    key: '',
    name: '',
    value: ''
  });
  dialogFormVisible.value = true;
  $createForm.value.clearValidate()
}

function handleEdit(data){
  const { id, ...res } = data;
  Object.assign(form, res);
  dialogFormVisible.value = true;
  editId = id;
}

function handleRemove(data){
  console.log(data)
}
</script>