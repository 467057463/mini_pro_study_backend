<template>
  <div class="layout-wrapper">
    <div class="header">
      <span class="app-name">
        小柒烧烤后台管理系统
      </span>
      <span class="user-info" v-if="user">
        {{ user.username }}
        <span @click="clier">[退出]</span>
      </span>
    </div>
    <div class="content">
      <div class="slider">
        <el-menu>
          <el-menu-item @click="navigateTo(`/admin/${menu.path}`)" :index="menu.key" v-for="menu in menus">
            <el-icon>
              <van-icon :name="menu.icon" />
            </el-icon>
            <span>{{menu.label}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content-wrapper">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user, clear } = useUserSession();
const menus = [
  {
    label: "首页",
    key: 'main',
    path: '',
    icon: 'wap-home-o'
  },
  {
    label: "全局配置",
    key: 'setting',
    path: 'setting',
    icon: 'setting-o'
  },
  {
    label: "商品管理",
    key: 'product',
    path: 'product',
    icon: 'setting-o'
  },
  {
    label: "订单管理",
    key: 'order',
    path: 'setting',
    icon: 'setting-o'
  }
]
</script>

<style lang="scss" scoped>
.layout-wrapper{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header{
  height: 60px;
  border-bottom: 1px solid var(--el-menu-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  .app-name{
    font-weight: bold;
    font-size: 18px;
    color: #000000;
  }
  .user-info{
    font-size: 14px;
    color: #2c2c2c;
    span{
      cursor: pointer;
      &:hover{
        color: #000;
        text-decoration: underline;
      }
    }
  }
}
.content{
  display: flex;
  flex: 1;
  .slider{
    width: 200px;
    .el-menu{
      height: 100%;
    }
  }
  .content-wrapper{
    flex: 1;
    padding: 15px;
  }
}
</style>