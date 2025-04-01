<script setup>
import { cloneDeep } from 'lodash'
import { useAuthStore } from '@/store'

const activeTab = ref('info')
const authStore = useAuthStore()
const { info } = authStore

const infoForm = ref({
  phone: undefined
})
function initInfo() {
  infoForm.value = cloneDeep(info)
}
initInfo()
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>账户设置</span>
      </div>
    </template>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="info">
        <el-form :model="infoForm" label-width="auto">
          <el-form-item label="名称" prop="nickname">
            <el-input v-model="infoForm.nickname" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="infoForm.phone" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="infoForm.email" />
          </el-form-item>
        </el-form>
        <el-button type="primary"> 更新信息 </el-button>
      </el-tab-pane>
      <el-tab-pane label="安全设置" name="secure">安全设置</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
