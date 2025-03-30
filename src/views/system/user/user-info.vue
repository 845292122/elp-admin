<script setup>
import { UserApi } from '@/api'
import { ElMessage } from 'element-plus'
import { TenantApi } from '../../../api'

const emit = defineEmits(['reload'])

const drawer = ref(false)
const formRef = ref()
const formValue = ref({
  id: undefined,
  phone: undefined,
  nickname: undefined,
  isPlatformAdmin: false,
  isMaster: false,
  dataScope: undefined,
  email: undefined,
  avatar: undefined,
  status: undefined,
  remark: undefined,
  tenantID: undefined
})
const rules = reactive({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  tenantID: [{ required: true, message: '请选择租户', trigger: 'blur' }]
})
const tenantList = ref([])

async function open(initValue) {
  const tenantListVal = await TenantApi.list()
  tenantList.value = tenantListVal
  formValue.value = initValue
  drawer.value = true
}

async function handleOk() {
  formRef.value.validate(async valid => {
    if (valid) {
      let msg = '新增成功'
      if (formValue.value.id) {
        await UserApi.modify(formValue.value)
        msg = '修改成功'
      } else {
        await UserApi.create(formValue.value)
      }
      ElMessage({
        type: 'success',
        message: msg,
        plain: true
      })
      drawer.value = false
      emit('reload')
    }
  })
}

defineExpose({
  open
})
</script>

<template>
  <div>
    <el-drawer
      v-model="drawer"
      title="用户信息"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <el-form label-position="top" :model="formValue" ref="formRef" :rules="rules">
        <el-row :gutter="24">
          <!-- TODO 租户select -->
          <el-col :span="24">
            <el-form-item label="租户" prop="tenantID">
              <el-select v-model="formValue.tenantID">
                <el-option v-for="item in tenantList" :key="item.id" :label="item.companyName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="formValue.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="nickname">
              <el-input v-model="formValue.nickname" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formValue.email" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="formValue.status">
                <el-option label="禁用" :value="0" />
                <el-option label="启用" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据权限">
              <el-select v-model="formValue.dataScope">
                <el-option label="全部数据" :value="1" />
                <el-option label="个人数据" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主账号" prop="isMaster">
              <el-radio-group v-model="formValue.isMaster">
                <el-radio :value="1">是</el-radio>
                <el-radio :value="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formValue.remark" type="textarea" :row="2" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="drawer = false">取 消</el-button>
          <el-button type="primary" @click="handleOk">确 定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="css" scoped>
:deep(.el-drawer__header) {
  margin-bottom: 0;
}
</style>
