<script setup>
import { TenantApi } from '@/api'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['reload'])

const drawer = ref(false)
const formRef = ref()
const formValue = ref({
  id: undefined,
  contactName: undefined,
  contactPhone: undefined,
  companyName: undefined,
  licenseNumber: undefined,
  address: undefined,
  domain: undefined,
  remark: undefined,
  userCount: undefined,
  trialStartDate: undefined,
  trialEndDate: undefined,
  startDate: undefined,
  endDate: undefined,
  status: undefined,
  isPremium: undefined
})
const rules = reactive({
  contactName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  contactPhone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }]
})

function open(initValue) {
  formValue.value = initValue
  drawer.value = true
}

async function handleOk() {
  formRef.value.validate(async valid => {
    if (valid) {
      const [startDate, endDate] = formValue.value.subscribeDate ?? []
      const [trialStartDate, trialEndDate] = formValue.value.trialDate ?? []
      formValue.value.startDate = startDate
      formValue.value.endDate = endDate
      formValue.value.trialStartDate = trialStartDate
      formValue.value.trialEndDate = trialEndDate
      delete formValue.value.subscribeDate
      delete formValue.value.trialDate

      let msg = '新增成功'
      if (formValue.value.id) {
        await TenantApi.modify(formValue.value)
        msg = '修改成功'
      } else {
        await TenantApi.create(formValue.value)
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
      title="租户信息"
      size="40%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <el-form label-position="top" :model="formValue" ref="formRef" :rules="rules">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="联系人" prop="contactName">
              <el-input v-model="formValue.contactName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="contactPhone">
              <el-input v-model="formValue.contactPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model="formValue.companyName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照号" prop="licenseNumber">
              <el-input v-model="formValue.licenseNumber" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input v-model="formValue.address" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="域名" prop="domain">
              <el-input v-model="formValue.domain" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="试用时间" prop="trialDate">
              <el-date-picker
                v-model="formValue.trialDate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订阅时间" prop="subscribeDate">
              <el-date-picker
                v-model="formValue.subscribeDate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户数" prop="userCount">
              <el-input-number v-model="formValue.userCount" :min="1" :max="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="formValue.status">
                <el-option label="未使用" :value="0" />
                <el-option label="试用中" :value="1" />
                <el-option label="试用结束" :value="2" />
                <el-option label="正在使用" :value="3" />
                <el-option label="已到期" :value="4" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Premium" prop="isPremium">
              <el-radio-group v-model="formValue.isPremium">
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
