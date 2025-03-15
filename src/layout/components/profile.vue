<script setup>
import { useAuthStore, useAppStore } from '@/store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const appStore = useAppStore()
const router = useRouter()

function logout() {
  ElMessageBox.confirm('确认退出登录?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      authStore.logout()
      router.push({ path: '/login', replace: true })
    })
    .catch(() => {})
}

function goProfile() {
  router.push({ path: '/profile' })
}
</script>

<template>
  <el-dropdown w-full>
    <div flex cursor-pointer items-center w-full justify-between hover-bg-blend-darken>
      <div flex items-center><i-tdesign:user-1-filled style="color: #1a56db" /></div>
      <!-- TODO 待修改 -->
      <div ma-3>管理员</div>
      <div text-16>
        <i class="i-tdesign:caret-down-small" color-black />
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-item @click="goProfile">
        <i class="i-tdesign:user-avatar" text-16 />
        账户资料
      </el-dropdown-item>
      <el-dropdown-item @click="logout">
        <i class="i-tdesign:logout" text-16 />
        退出登录
      </el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}
</style>
