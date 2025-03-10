<script setup>
import { TenantApi } from '@/api'

const tableColumns = [
  {
    label: 'ID',
    tooltip: '租户ID',
    width: 100,
    prop: 'id',
    hideInSearch: true,
    tableColumnProps: {
      fixed: 'left'
    }
  },
  {
    label: '联系人',
    width: 120,
    prop: 'contactName',
    hideInSearch: true
  },
  {
    label: '手机号',
    width: 120,
    prop: 'contactPhone',
    hideInSearch: true
  },
  {
    label: '公司名称',
    width: 120,
    prop: 'companyName'
  },
  {
    label: '统一信用代码',
    width: 120,
    prop: 'licenseNumber',
    hideInSearch: true
  },
  {
    label: '地址',
    width: 120,
    prop: 'address',
    hideInSearch: true
  },
  {
    label: '域名',
    width: 120,
    prop: 'domain',
    hideInSearch: true
  },
  {
    label: '备注',
    width: 120,
    prop: 'remark',
    hideInSearch: true
  },
  {
    label: 'premium',
    width: 120,
    prop: 'isPremium'
  },
  {
    label: '状态',
    width: 100,
    prop: 'status',
    valueType: 'select',
    hideInSearch: true,
    options: [
      {
        label: '未开始',
        value: '0',
        color: 'gray'
      },
      {
        label: '试用中',
        value: '1',
        color: 'blue'
      },
      {
        label: '试用结束',
        value: '2',
        color: 'yellow'
      },
      {
        label: '使用中',
        value: '3',
        color: 'blue'
      },
      {
        label: '已过期',
        value: '4',
        color: 'red'
      }
    ]
  },
  {
    label: '试用开始时间',
    width: 200,
    prop: 'trialStartDate',
    valueType: 'date-picker',
    hideInSearch: true
  },
  {
    label: '试用结束时间',
    width: 200,
    prop: 'trialEndDate',
    valueType: 'date-picker',
    hideInSearch: true
  },
  {
    label: '订阅开始时间',
    width: 120,
    prop: 'startDate',
    valueType: 'date-picker',
    hideInSearch: true
  },
  {
    label: '订阅结束时间',
    width: 120,
    prop: 'endDate',
    valueType: 'date-picker',
    hideInSearch: true
  }
]
const drawerFormRules = {}
const drawerFormColumns = [
  {
    label: 'ID',
    width: 100,
    prop: 'id'
  },
  {
    label: '联系人',
    width: 120,
    prop: 'contactName'
  },
  {
    label: '手机号',
    width: 120,
    prop: 'contactPhone'
  },
  {
    label: '公司名称',
    width: 120,
    prop: 'companyName'
  },
  {
    label: '统一信用代码',
    width: 120,
    prop: 'licenseNumber'
  },
  {
    label: '地址',
    width: 120,
    prop: 'address'
  },
  {
    label: '域名',
    width: 120,
    prop: 'domain'
  },
  {
    label: '备注',
    width: 120,
    prop: 'remark'
  },
  {
    label: 'premium',
    width: 120,
    prop: 'isPremium',
    valueType: 'switch'
  },
  {
    label: '状态',
    width: 100,
    prop: 'status',
    valueType: 'select',
    options: [
      {
        label: '未开始',
        value: '0',
        color: 'gray'
      },
      {
        label: '试用中',
        value: '1',
        color: 'blue'
      },
      {
        label: '试用结束',
        value: '2',
        color: 'yellow'
      },
      {
        label: '使用中',
        value: '3',
        color: 'blue'
      },
      {
        label: '已过期',
        value: '4',
        color: 'red'
      }
    ]
  },
  {
    label: '试用开始时间',
    width: 200,
    prop: 'trialStartDate',
    valueType: 'date-picker'
  },
  {
    label: '试用结束时间',
    width: 200,
    prop: 'trialEndDate',
    valueType: 'date-picker'
  },
  {
    label: '订阅开始时间',
    width: 120,
    prop: 'startDate',
    valueType: 'date-picker'
  },
  {
    label: '订阅结束时间',
    width: 120,
    prop: 'endDate',
    valueType: 'date-picker'
  }
]

const drawerFormVisible = ref(false)
const drawerFormValue = ref({})
const tableQuery = ref({
  contactName: undefined,
  isPremium: undefined
})

async function loadRecords(params) {
  const { records, total } = await TenantApi.page(params)
  return { data: records, total }
}
async function handleBatchDelete() {}
async function handleCreate() {
  drawerFormVisible.value = true
}
</script>

<template>
  <PlusPage
    ref="plusPageInstance"
    :columns="tableColumns"
    :params="tableQuery"
    :request="loadRecords"
    :search="{ labelWidth: '80px', colProps: { span: 8 } }"
    :table="{ isSelection: true, onSelectionChange: handleSelect }"
  >
    <template #table-title>
      <el-row class="button-row">
        <el-button type="primary" @click="handleCreate"> 添加 </el-button>
        <el-button type="danger" @click="handleBatchDelete" disabled> 批量删除 </el-button>
      </el-row>
    </template>
  </PlusPage>

  <PlusDrawerForm
    title="租户信息"
    v-model:visible="drawerFormVisible"
    v-model="drawerFormValue"
    :form="{ columns: drawerFormColumns, drawerFormRules }"
  />
</template>
