<script setup>
import { useAppStore, useAuthStore } from '@/store'
import { storeToRefs } from 'pinia'
import MenuItem from './menu-item'

const authStore = useAuthStore()
const appStore = useAppStore()

const { permRoutes } = storeToRefs(authStore)
const menuList = permRoutes.value.filter(route => route.meta.hidden !== true)
</script>

<template>
  <el-scrollbar>
    <el-menu
      :default-active="$route.path"
      :unique-opened="true"
      router
      :collapse="appStore.menuCollapsed"
      :collapse-transition="false"
      background-color="#001628"
      text-color="#9ea7af"
      active-text-color="#0277fc"
    >
      <MenuItem :menuList="menuList" />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.el-menu {
  border-right: 1px solid #001628;
}

// $menu-height: 40px;

// .menu-wrapper {
//   transition: width 0.4s ease;
// }

// .el-menu {
//   border: none;
//   box-sizing: border-box;
// }

// .el-menu--popup {
//   height: $menu-height;
//   margin-bottom: 5px;
// }

// :deep(.el-menu) {
//   background-color: transparent;
//   &.is-active {
//     color: rgb(45, 89, 89);
//   }
// }

// :deep(.el-sub-menu__title) {
//   height: $menu-height;
//   margin-bottom: 5px;
//   color: #000000b3;
//   &:hover {
//     background-color: #ffffff14;
//     border-radius: 5px;
//   }
// }

// :deep(.el-menu-item) {
//   height: $menu-height;
//   margin-bottom: 5px;
//   color: #000000b3;
//   &:hover {
//     background-color: #ffffff14;
//     border-radius: 5px;
//   }
//   &.is-active {
//     background-color: #ffffff14;
//     color: var(--el-color-primary);
//     border-radius: 5px;
//   }
// }

// :deep(.el-sub-menu.is-active) {
//   .el-sub-menu__title {
//     color: var(--el-color-primary);
//   }
// }
</style>
