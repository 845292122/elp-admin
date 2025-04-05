<script setup>
import { cloneDeep } from 'lodash'
import { useAuthStore } from '@/store'
import { AuthApi } from '../../api'

const activeTab = ref('info')
const authStore = useAuthStore()

// * 基本信息
const { info } = authStore
const infoFormRef = ref()
const infoForm = ref(cloneDeep(authStore.info))
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
  infoFormRef.value.validate(async isValid => {
    if (!isValid) {
      return
    }

    await authStore.updateInfo(infoForm.value)

    ElMessage({
      type: 'success',
      message: '更新成功',
      plain: true
    })
  })
}

watch(
  () => authStore.info,
  newInfo => {
    infoForm.value = cloneDeep(newInfo)
  },
  { deep: true }
)

// * 安全设置
const secureFormRef = ref()
const secureForm = ref({
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined
})
const secureFormRules = reactive({
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== secureForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

async function updatePassword() {
  secureFormRef.value.validate(async isValid => {
    if (!isValid) {
      return
    }

    await AuthApi.updatePwd({
      oldPassword: secureForm.value.oldPassword,
      newPassword: secureForm.value.newPassword
    })

    ElMessage({
      type: 'success',
      message: '更新成功',
      plain: true
    })
  })
}
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
            <el-input v-model="infoForm.nickname" style="width: 240px" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="infoForm.phone" style="width: 240px" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="infoForm.email" style="width: 240px" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="updateInfo"> 更新信息 </el-button>
      </el-tab-pane>
      <el-tab-pane label="安全设置" name="secure">
        <el-form :model="secureForm" label-width="auto" :rules="secureFormRules" ref="secureFormRef">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="secureForm.oldPassword" type="password" show-password style="width: 240px" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="secureForm.newPassword" type="password" show-password style="width: 240px" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="secureForm.confirmPassword" type="password" show-password style="width: 240px" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="updatePassword"> 更新密码 </el-button>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
