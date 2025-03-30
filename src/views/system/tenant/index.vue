<script setup>
import { TenantApi } from '@/api'
import TenantInfo from './tenant-info.vue'
import AssignPerms from '@/components/assign-perms.vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { dayjs } from 'element-plus'

const queryFormRef = ref()
const infoRef = ref()
const assignPermsRef = ref()
const queryPageParams = ref({
  pageNo: 1,
  pageSize: 10
})
const queryParams = ref({})
const tableData = ref({
  records: [],
  total: 0
})
const loading = ref(false)

async function loadRecords(params) {
  try {
    loading.value = true
    const { records, total } = await TenantApi.page(params)
    tableData.value = { records, total }
  } finally {
    loading.value = false
  }
}

function handleAdd() {
  infoRef.value.open({
    userCount: 10,
    isPremium: 0,
    status: 0
  })
}

async function handleReset() {
  queryFormRef.value.resetFields()
  queryPageParams.value = {
    pageNo: 1,
    pageSize: 10
  }
  await loadRecords({ ...queryPageParams.value, ...queryParams.value })
}

async function handleSearch() {
  queryPageParams.value = {
    pageNo: 1,
    pageSize: 10
  }
  await loadRecords({ ...queryPageParams.value, ...queryParams.value })
}

async function handleEdit(id) {
  const info = await TenantApi.info(id)
  info.subscribeDate = [info.startDate, info.endDate]
  info.trialDate = [info.trialStartDate, info.trialEndDate]
  infoRef.value.open(info)
}

async function handleRemove(id) {
  await TenantApi.remove(id)
  ElMessage({
    type: 'success',
    message: '删除成功',
    plain: true
  })
  await handleReload()
}

async function handleReload() {
  await loadRecords({ ...queryPageParams.value, ...queryParams.value })
}

async function handleAssignPerms(id) {
  const initValue = await TenantApi.getPerms(id)
  assignPermsRef.value.open(initValue, id)
}

async function assign(params, resolve, reject) {
  try {
    await TenantApi.assignPerms(params)
    resolve()
  } catch (error) {
    reject(new Error('分配权限失败：' + error.message)) // 失败时调用 reject
  }
}

;(() => {
  loadRecords({ ...queryPageParams.value })
})()
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
        <el-select v-model="queryParams.status" placeholder="租户状态" clearable style="width: 240px">
          <el-option label="未使用" :value="0" />
          <el-option label="试用中" :value="1" />
          <el-option label="试用结束" :value="2" />
          <el-option label="正在使用" :value="3" />
          <el-option label="已到期" :value="4" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">
          <template #icon>
            <i-tdesign:search />
          </template>
          搜索
        </el-button>
        <el-button @click="handleReset">
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
          <el-button @click="handleAdd">新增租户</el-button>
        </div>
      </div>
    </template>
    <el-table :data="tableData.records" stripe border style="width: 100%">
      <el-table-column prop="id" label="租户ID" width="100" fixed="left" />
      <el-table-column prop="companyName" label="公司名称" width="150" show-overflow-tooltip fixed="left" />
      <el-table-column prop="contactName" label="联系人" width="100" />
      <el-table-column prop="contactPhone" label="联系电话" width="150" />
      <el-table-column prop="licenseNumber" label="统一社会信用代码" width="150" show-overflow-tooltip />
      <el-table-column prop="address" label="地址" width="200" show-overflow-tooltip />
      <el-table-column prop="userCount" label="用户数量" width="100" />
      <el-table-column prop="trialStartDate" label="试用开始日期" width="120">
        <template #default="scope">
          {{ scope.row.trialStartDate ? dayjs(scope.row.trialStartDate).format('YYYY-MM-DD') : undefined }}
        </template>
      </el-table-column>
      <el-table-column prop="trialEndDate" label="试用结束日期" width="120">
        <template #default="scope">
          {{ scope.row.trialEndDate ? dayjs(scope.row.trialEndDate).format('YYYY-MM-DD') : undefined }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column prop="isPremium" label="PREMIUM" width="100" />
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template #default="scope">
          <el-space spacer="|">
            <el-button link type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-popconfirm :icon="InfoFilled" icon-color="#626AEF" title="确认删除数据?" @confirm="handleRemove(scope.row.id)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
            <el-dropdown placement="bottom-end">
              <el-button link type="primary" size="small">更多</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleAssignPerms(scope.row.id)">分配权限</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
    <div flex justify-end mt-20>
      <el-pagination background size="small" layout="prev, pager, next" :total="tableData.total" />
    </div>
  </el-card>

  <tenant-info ref="infoRef" @reload="handleReload" />
  <assign-perms ref="assignPermsRef" @assign="assign" />
</template>
