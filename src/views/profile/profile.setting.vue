<script setup>
import { cloneDeep } from 'lodash'
import { useAuthStore } from '@/store'

const activeTab = ref('info')
const authStore = useAuthStore()
const { info } = authStore
const infoFormRef = ref()

const secureForm = ref({
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined
})

const infoForm = ref({
  phone: undefined
})

const infoFormRules = reactive({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  nickname: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  email: [
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: '请输入正确的邮箱',
      trigger: 'blur'
    }
  ]
})

async function updateInfo() {
  await ElForm.validateField(infoForm, 'infoForm')
  await authStore.updateInfo(infoForm.value)
  ElMessage({
    type: 'success',
    message: '修改成功',
    plain: true
  })
}

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
        <el-form :model="infoForm" label-width="auto" :rules="infoFormRules" ref="infoFormRef">
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
        <el-button type="primary" @click="updateInfo"> 更新信息 </el-button>
      </el-tab-pane>
      <el-tab-pane label="安全设置" name="secure">
        <el-form :model="secureForm" label-width="auto">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="secureForm.oldPassword" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="secureForm.newPassword" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="secureForm.confirmPassword" />
          </el-form-item>
        </el-form>
        <el-button type="primary"> 更新密码 </el-button>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
