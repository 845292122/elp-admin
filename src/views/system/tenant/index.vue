<script setup>
import { TenantApi } from '@/api'

const queryFormRef = ref()
const queryParams = ref({})
async function loadRecords(params) {
  const { records, total } = await TenantApi.page(params)
  return { data: records, total }
}
</script>

<template>
  <el-card shadow="always">
    <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
      <el-form-item label="联系人" prop="contactName">
        <el-input v-model="queryParams.contactName" placeholder="请输入联系人" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="公司" prop="companyName">
        <el-input v-model="queryParams.companyName" placeholder="请输入公司名称" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="租户状态" clearable style="width: 240px"> </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          <template #icon>
            <i-tdesign:search />
          </template>
          搜索
        </el-button>
        <el-button>
          <template #icon>
            <i-tdesign:refresh />
          </template>
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card shadow="always" mt-20>
    <template #header>
      <div flex justify-between items-center>
        <div flex items-center font-bold text-16><i-tdesign:list mr-5 color-primary font-extrabold text-20 /> 租户列表</div>
        <div>
          <el-button>新增租户</el-button>
        </div>
      </div>
    </template>
    <el-table>
      <el-table-column prop="contactName" label="联系人" />
      <el-table-column prop="contactPhone" label="联系电话" />
      <el-table-column prop="companyName" label="公司名称" />
      <el-table-column prop="licenseNumber" label="统一社会信用代码" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="userCount" label="用户数量" />
      <el-table-column prop="trialStartDate" label="试用开始日期" />
      <el-table-column prop="trialEndDate" label="试用结束日期" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="isPremium" label="PREMIUM" />
    </el-table>
  </el-card>
</template>
