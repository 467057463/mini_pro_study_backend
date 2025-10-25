<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="4em">
    <el-form-item label="分组" prop="group">
      <el-input v-model="form.group" />
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="值" prop="value">
      <el-input v-model="form.value" type="textarea" :rows="3"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="handleSubmitSetting">
        保存
      </el-button>
      <el-button @click="emit('close', 'cancel')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
const props = defineProps<{
  id?: string,
  group?: string,
  name?: string,
  value?: string
}>()
const emit = defineEmits(['close']);

const $form = useTemplateRef('formRef');

const loading = ref(false);
const form = reactive({
  group: props.group,
  name: props.name,
  value: props.value
})

const rules = reactive({
  group: [{
    required: true,
    message: '分组不能为空'
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
    await $form.value!.validate();
    loading.value = true;
    const url = props.id ? `/api/settings/${props.id}` : "/api/settings";
    await useRequest(url, {
      method: "POST",
      body: form
    })
    loading.value = false;
    emit('close', 'confirm')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>