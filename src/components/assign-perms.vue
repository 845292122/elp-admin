<script setup>
import { bizRoutes } from '@/router/routes'
import { RouteUtil } from '../utils'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['assign'])

const treeRef = ref()
const dialog = ref(false)
const treeData = ref([])
const assignId = ref()

// TODO: 租户管理员应该只能看到自己的权限
async function open(initValue = [], id) {
  assignId.value = id
  treeData.value = RouteUtil.transformRoutesToPermTree(bizRoutes)
  dialog.value = true
  await nextTick(() => {
    initValue.map(item => {
      const node = treeRef.value.getNode(item)
      if (node.isLeaf) {
        treeRef.value.setChecked(node.key, true, false)
      }
    })
  })
}
async function submit() {
  const treeValue = treeRef.value.getHalfCheckedKeys().concat(treeRef.value.getCheckedKeys())
  try {
    await new Promise((resolve, reject) => {
      emit(
        'assign',
        {
          id: assignId.value,
          perms: treeValue
        },
        resolve,
        reject
      )
    })
    ElMessage({
      type: 'success',
      message: '分配权限成功',
      plain: true
    })
    dialog.value = false
  } catch (error) {
    ElMessage({
      type: 'error',
      message: error.message,
      plain: true
    })
  }
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialog"
    width="500"
    title="分配权限"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <el-tree
      :data="treeData"
      default-expand-all
      show-checkbox
      ref="treeRef"
      node-key="key"
      :props="{ children: 'children', label: 'label', value: 'perm' }"
    />

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="submit"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
