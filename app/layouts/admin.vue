<template>
  <Html :class="theme"></Html>
  <Title>{{ $route.meta.title ?? '管理后台' }}</Title>
  <Transition name="slide">
    <aside v-show="!isCollapse">
      <header>
        <el-space>
          <el-avatar :size="24" src="/logo.webp" />
          <el-text tag="b" :line-clamp="1">Nuxt Admin</el-text>
        </el-space>
        <el-icon @click="isCollapse = true">
          <Memo />
        </el-icon>
      </header>
    </aside>
  </Transition>

  <article>
    <header>
      <el-space size="large">
        <el-icon @click="isCollapse = false" v-if="isCollapse">
          <Memo />
        </el-icon>
        <el-text :line-clamp="1" truncated>
          <el-breadcrumb>
            <el-breadcrumb-item>仪表盘</el-breadcrumb-item>
        </el-breadcrumb>
        </el-text>
      </el-space>

      <el-space>
        <el-button text circle :icon="Refresh" @click="refreshPage"></el-button>
        <el-button text circle @click="toggle">
          <template #icon>
            <Transition name="rotate" mode="out-in">
              <el-icon v-if="theme === 'dark'">
                <Sunny />
              </el-icon>
              <el-icon v-else>
                <Moon />
              </el-icon>
            </Transition>
          </template>
        </el-button>
        <el-dropdown :teleported="false">
          <el-space>
            <el-avatar :size="24" src="/logo.webp" />
            <el-text tag="b" :line-clamp="1">管理员</el-text>
          </el-space>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="SwitchButton" @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
    </header>
    <main>
      <slot/>
    </main>
  </article>
</template>

<script setup lang="ts">
import { Memo, Refresh, Sunny, Moon, Setting, SwitchButton } from '@element-plus/icons-vue';

const isCollapse = ref(false)

const router = useRouter()

// 刷新当前页面
const refreshPage = async () => {
  router.go(0)
}

const { clear } = useUserSession();
function logout(){
  navigateTo('/login')
  clear();
}

const theme = ref('dark')

const toggleTheme = () => {
  const isDark = theme.value === 'dark'
  theme.value = isDark ? 'light' : 'dark'
}

// 判断是否支持视图过渡，并且没有开启“减少动态效果”选项
const isAppearanceTransition =
    typeof document !== 'undefined' &&
    // @ts-expect-error: Transition API
    document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches


// 切换颜色模式
async function toggle(event: MouseEvent){
  if (!isAppearanceTransition) {
    return
  }
  const { clientX: x, clientY: y } = event
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  const transition = document.startViewTransition(async () => {
      toggleTheme()
      await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    document.documentElement.animate(
      {
        clipPath: theme.value === 'dark' ? clipPath.reverse() : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement:
          theme.value === 'dark' ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    )
  })
}

</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  width: 0;
}

.slide-enter-to,
.slide-leave-from {
  width: 300px;
}



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

aside {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 300px;
  height: 100%;
  overflow: hidden;
  background-color: inherit;
  border-right: var(--el-border);
  user-select: none;
  header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    height: 60px;
    padding: 0 20px;
    background-color: inherit;
    border-bottom: var(--el-border);
    user-select: none;

    .el-icon {
      cursor: pointer;
    }
  }
}

article{
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 0;
  header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    height: 60px;
    padding: 0 20px;
    background-color: inherit;
    border-bottom: var(--el-border);
    user-select: none;

    .el-icon {
      cursor: pointer;
    }
  }
  main {
    flex: 1;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: auto;
    background-color: var(--el-bg-color-page);
  }
}
</style>