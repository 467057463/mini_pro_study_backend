<template>
  <Html :class="{dark: isDark}"></Html>
  <el-button text circle @click="toggle">
    <template #icon>
      <Transition name="rotate" mode="out-in">
        <el-icon v-if="isDark">
          <Sunny />
        </el-icon>
        <el-icon v-else>
          <Moon />
        </el-icon>
      </Transition>
    </template>
  </el-button>
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useDark, useToggle} from '@vueuse/core'
const isDark = useDark();
const toggleDark = useToggle(isDark);
console.log('isDark', isDark);

// 判断是否支持视图过渡，并且没有开启“减少动态效果”选项
const isAppearanceTransition =
    typeof document !== 'undefined' &&
    // @ts-expect-error: Transition API
    document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches


// 切换颜色模式
async function toggle(event: MouseEvent){
  if (!isAppearanceTransition) {
    toggleDark()
    return
  }
  const { clientX: x, clientY: y } = event
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  const transition = document.startViewTransition(async () => {
    toggleDark()
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath.reverse() : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement:
          isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    )
  })
}
</script>


<style lang="scss" scoped>
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.2s ease;
}

.rotate-enter-from {
  transform: rotate(270deg);
  opacity: 0;
}

.rotate-leave-to {
  transform: rotate(180deg);
  opacity: 0;
}
</style>

<style lang="scss">
::view-transition-new(root),
::view-transition-old(root) {
  /* 关闭默认动画，否则影响自定义动画的执行 */
  animation: none;
}

:root.dark::view-transition-old(root) {
  z-index: 9999;
}
</style>