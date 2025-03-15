<script setup>
import { TenantApi } from '@/api'

async function loadRecords(params) {
  const { records, total } = await TenantApi.page(params)
  return { data: records, total }
}
</script>

<template></template>
