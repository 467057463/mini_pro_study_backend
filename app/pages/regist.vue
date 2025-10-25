<!-- eslint-disable vue/no-multiple-template-root -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <main>
    <el-form 
      ref="formRef"  
      class="login" 
      label-width="auto" 
      label-position="top" 
      size="large" 
      :model="data"
      :rules="rules"
      hide-required-asterisk
    >
      <el-form-item>
        <h1>Nuxt Admin</h1>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.username" autocomplete="off" clearable />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="data.password" type="password" autocomplete="off" clearable />
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPasswrod">
        <el-input v-model="data.confirmPasswrod" type="confirmPasswrod" autocomplete="off" clearable />
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <el-input v-model="data.code" autocomplete="off" clearable class="code-input">
          <template #append>
            <span class="code" @click="refresh" v-html="code?.captcha"/>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="handleSubmit"> 注册 </el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank',
  middleware: ['no-auth']
})

useHead({
  title: '注册'
})

const { fetch } = useUserSession();
const { data: code, refresh } = await useAPI<{captcha: string, uuid: string}>('/captcha');

const $form = useTemplateRef('formRef')
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
  confirmPasswrod: [
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
  confirmPasswrod: '',
  code: ''
})

async function handleSubmit(){
  try {
    await $form.value?.validate()
    const user = await useRequest('/regist', {
      method: 'post',
      body: {
        ...data,
        uuid: code.value?.uuid
      }
    })
    await fetch();
    if(user.role === 'customer'){
      navigateTo('/')
    } else {
      navigateTo('/admin')
    }
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
