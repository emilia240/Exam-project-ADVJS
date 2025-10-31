<template>
  <div class="!min-h-screen" style="background-color: var(--color-background);">
    <DashboardNav navType="dashboard" @newLog="openSleepForm" />
    <SleepLogForm ref="sleepFormRef" />

    <div class="content !pt-20 !md:pt-24 !px-4 !md:px-6 !max-w-7xl !mx-auto">

      <!-- Admin Welcome Section -->
      <!-- <AdminWelcome /> -->

      <!-- Statistics Overview -->
      <!-- <AdminStats /> -->

      <!-- Recent Activity & Analytics -->
      <!-- <AdminActivity /> -->

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DashboardNav from '../components/DashboardNav.vue'
import SleepLogForm from '../components/SleepLogForm.vue'
import AdminWelcome from '../components/admin/AdminWelcome.vue'
import AdminStats from '../components/admin/AdminStats.vue'
import AdminActivity from '../components/admin/AdminActivity.vue'

// Template refs
const sleepFormRef = ref(null)

// Methods
const openSleepForm = () => {
  sleepFormRef.value?.openForm()
}

onMounted(() => {
  console.log('👑 Admin dashboard mounted')
})
</script>

<style scoped>
/* Admin-specific styles if needed */
</style>