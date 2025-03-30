<script setup>
import { UserApi } from '@/api'
import UserInfo from './user-info.vue'
import { InfoFilled } from '@element-plus/icons-vue'

const queryPageParams = ref({
  pageNo: 1,
  pageSize: 10
})
const queryFormRef = ref()
const queryParams = ref({})
const infoRef = ref()
const tableData = ref({
  records: [],
  total: 0
})

async function loadRecords(params) {
  const { records, total } = await UserApi.page(params)
  tableData.value = { records, total }
}

function handleAdd() {
  infoRef.value.open({
    isMaster: 0,
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
  const info = await UserApi.info(id)
  infoRef.value.open(info)
}

async function handleRemove(id) {
  await UserApi.remove(id)
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

;(() => {
  loadRecords({ ...queryPageParams.value })
})()
</script>

<template>
  <el-card shadow="always">
    <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
      <el-form-item label="联系人" prop="nickname">
        <el-input v-model="queryParams.nickname" placeholder="请输入联系人" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="状态" clearable style="width: 240px">
          <el-option label="禁用" :value="0" />
          <el-option label="启用" :value="1" />
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
        <div flex items-center font-bold text-16><i-tdesign:list mr-5 color-primary font-extrabold text-20 /> 用户列表</div>
        <div>
          <el-button @click="handleAdd">新增用户</el-button>
        </div>
      </div>
    </template>

    <el-table :data="tableData.records" stripe border style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="nickname" label="联系人" width="150" />
      <el-table-column prop="phone" label="手机号" width="150" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
          <el-tag v-else type="success">启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isMaster" label="是否管理员" width="100" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.isMaster === 0" type="danger">否</el-tag>
          <el-tag v-else type="success">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-popconfirm :icon="InfoFilled" icon-color="#626AEF" title="确认删除数据?" @confirm="handleRemove(scope.row.id)">
            <template #reference>
              <el-button link type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button link type="primary" size="small">更多</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div flex justify-end mt-20>
      <el-pagination background size="small" layout="prev, pager, next" :total="tableData.total" />
    </div>
  </el-card>

  <user-info ref="infoRef" @reload="handleReload" />
</template>
