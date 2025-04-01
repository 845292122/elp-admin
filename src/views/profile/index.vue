<script setup>
import BaseInfo from './base-info'
import ProfileSetting from './profile.setting.vue'
</script>

<template>
  <el-row :gutter="24">
    <el-col :span="6">
      <el-card>
        <BaseInfo />
      </el-card>
    </el-col>
    <el-col :span="18">
      <ProfileSetting />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped></style>
