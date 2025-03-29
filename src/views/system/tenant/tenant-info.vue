<script setup>
const drawer = ref(false)
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
function open() {
  drawer.value = true
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
      :destroy-on-close="false"
    >
      <el-form label-position="top" :model="formValue">
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
              <el-input v-model="formValue.userCount" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-input v-model="formValue.status" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否 Premium" prop="isPremium">
              <el-input v-model="formValue.isPremium" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formValue.remark" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="drawer = false">取 消</el-button>
          <el-button type="primary" @click="drawer = false">确 定</el-button>
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
