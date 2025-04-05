<script setup>
import { useAuthStore } from '@/store'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { info } = storeToRefs(authStore)
</script>

<template>
  <el-descriptions direction="vertical" title="账户信息" :column="1">
    <el-descriptions-item label="名称">{{ info.nickname }}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{ info.phone }}</el-descriptions-item>
    <el-descriptions-item label="邮箱">{{ info.email }}</el-descriptions-item>
    <el-descriptions-item label="最后登录IP">{{ info.loginIP }}</el-descriptions-item>
    <el-descriptions-item label="最后登录日期">{{ info.loginDate }}</el-descriptions-item>
  </el-descriptions>
</template>

<style lang="scss" scoped></style>
