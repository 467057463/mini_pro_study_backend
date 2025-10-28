<template>
  <section>
    <el-card shadow="never">
      admin index {{ c }} {{ b }}
    </el-card>

    <el-card shadow="never">
      <button @click="handleTest">+</button>
      <button @click="b += 33">-</button>
    </el-card>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  title: '首页',
  middleware: ['auth', 'role']
})

const a = ref(1)
const b = ref(2)
function add(a: Ref<number> | number, b: Ref<number> | number){
  return computed(() => unref(a) + unref(b))
}
const c = add(a, 10)

function handleTest(){
  a.value = 10
}

unref(1)
toValue(1)

watchEffect(()=> {
  console.log(a, b)
  console.log('sssbbb')
  // onCleanup(() => {
  //   console.log('ssss')
  // })
})
</script>