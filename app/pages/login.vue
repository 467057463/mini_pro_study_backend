<template>
  <Title>登录</Title>
  <main>
    <el-form 
      class="login" 
      label-width="auto" 
      label-position="top" 
      size="large" 
      :model="data"
      :rules="rules"
      ref="form"
      hide-required-asterisk
    >
      <el-form-item>
        <h1>管理系统</h1>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input autocomplete="off" clearable v-model="data.username" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input autocomplete="off" clearable v-model="data.password" />
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <el-input autocomplete="off" clearable v-model="data.code" class="code-input">
          <template #append>
            <span class="code" v-html="code?.captcha" @click="() => refresh()"></span>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="handleSubmit"> 登录 </el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})

const { fetch } = useUserSession();
const { data: code, refresh } = await useAPI<{captcha: string, uuid: string}>('/captcha');

const $form = useTemplateRef('form')
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码'
    }
  ]
}

const data = reactive({
  username: '',
  password: '',
  code: ''
})

async function handleSubmit(){
  try {
    await $form.value?.validate()
    await useRequest('/admin_login', {
      method: 'post',
      body: {
        ...data,
        uuid: code.value?.uuid
      }
    })
    await fetch();
    navigateTo('/admin')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
main{
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: var(--el-bg-color-page);
  user-select: none;
  .login {
    width: 100%;
    max-width: 400px;

    h1 {
      width: 100%;
      margin: 0;
      padding: 0;
      text-align: center;
    }
    .code-input{
      :deep(.el-input-group__append){
        padding: 0;
      }
    }
    .code{
      height: 38px;
      cursor: pointer;
      :deep(svg){
        width: 120px!important;
        height: 38px!important;
      }
    }
  }
}
</style>