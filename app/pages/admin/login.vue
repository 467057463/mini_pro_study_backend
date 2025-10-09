<template>
  <van-form @submit="handleSubmit">
    <van-cell-group>
      <van-field
        v-model="data.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请输入用户名' }]"
      />
      <van-field
        v-model="data.password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请输入密码' }]"
        type="password"
      />
      <van-field 
        v-model="data.code" 
        name="code" 
        label="验证码" 
        placeholder="请输入验证码" 
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <template #button>
          <span v-html="code.data.captcha" @click="refresh"></span>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">登录</van-button>
    </div>
  </van-form>

</template>

<script setup>
definePageMeta({
  layout: false
})

const { data: code, refresh } = await useAPI('/captcha');
console.log(code.value.data)

const data = reactive({
  username: '',
  password: '',
  code: ''
})

async function handleSubmit(values){
  console.log('submit', values, code, {
    ...data,
    uuid: code.value.data.uuid
  });
  const r = await $fetch("/api/admin_login", {
    method: "post",
    body: {
      ...data,
      uuid: code.value.data.uuid
    }
  })
  console.log(r)
}

</script>