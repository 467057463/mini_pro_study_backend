<template>
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
      <el-scrollbar>
        <el-menu>
          <template v-for="(item, index) in routerList" :key="item.label">
            <el-sub-menu v-if="item.child?.length" :index="`${index}`">
              <template #title>
                <el-icon>
                  <component :is="item.icon"/>
                </el-icon>
                <span>{{item.label}}</span>
              </template>
            </el-sub-menu>
            <!-- <el-menu-item v-else :index="`${index}`">
              <el-icon>
                <component :is="item.icon"/>
              </el-icon
              {{item.label}}
            </el-menu-item> -->
          </template>

          <el-menu-item index="0" @click="navigateTo('/admin/')">
            <el-icon><House /></el-icon>
            首页
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><setting /></el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item index="1-1" @click="navigateTo('/admin/setting')">全局配置</el-menu-item>
            <el-menu-item index="1-2" @click="navigateTo('/admin/product')">广告配置</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Bowl /></el-icon>
              <span>商品管理</span>
            </template>
            <el-menu-item index="2-1" @click="navigateTo('/admin/product')">商品列表</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><CreditCard /></el-icon>
              <span>订单管理</span>
            </template>
            <el-menu-item index="3-1" @click="navigateTo('/admin/product')">订单列表</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
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
            <el-breadcrumb-item>{{$route.meta.title ?? 'test'}}</el-breadcrumb-item>
        </el-breadcrumb>
        </el-text>
      </el-space>

      <el-space>
        <el-button text circle :icon="Refresh" @click="refreshPage"></el-button>
        <toggle-theme-btn/>
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
import { Memo, Refresh, SwitchButton, Setting, House, Bowl, CreditCard } from '@element-plus/icons-vue';

const routerList = [
  {
    label: '首页',
    icon: House,
    path: '/'
  },
  {
    label: '系统管理',
    icon: Setting,
    child: [
      {
        label: '全局配置',
        path: '/setting'
      },
      {
        label: '广告配置',
        path: '/product'
      }
    ]
  },
  {
    label: '商品管理',
    icon: Bowl,
    child: [
      {
        label: '商品列表',
        path: '/product'
      }
    ]
  },
  {
    label: '订单管理',
    icon: CreditCard,
    child: [
      {
        label: '订单列表',
        path: '/product'
      }
    ]
  }
]
const isCollapse = ref(false)

// 刷新当前页面
const router = useRouter()
const refreshPage = async () => {
  router.go(0)
}

const { clear } = useUserSession();
function logout(){
  navigateTo('/login')
  clear();
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
  .el-menu{
    border-right: none;
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