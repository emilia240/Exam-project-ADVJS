<template>
  <div class="!min-h-screen" style="background-color: var(--color-background);">
    <DashboardNav navType="admin" />


    <div class="content !pt-20 !md:pt-24 !px-4 !md:px-6 !max-w-7xl !mx-auto">

      <!-- Admin Welcome -->
      <AdminWelcome />

      <!-- Stats Section -->
      <AdminStats 
        :totalUsers="totalUsers" 
        :totalSleepLogs="totalSleepLogs"
      />

      <!-- Activity Section -->
      <AdminActivity 
        :users="users" 
        :allSleepLogs="allSleepLogs" 
        :totalUsers="totalUsers"
        :totalSleepLogs="totalSleepLogs"
      /> 
      

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUsers } from '../modules/useUsers.js'
import DashboardNav from '../components/DashboardNav.vue'
import AdminWelcome from '../components/admin/AdminWelcome.vue'
import AdminStats from '../components/admin/AdminStats.vue'
import AdminActivity from '../components/admin/AdminActivity.vue'


const { users, allSleepLogs, totalUsers, totalSleepLogs, initializeAdminData } = useUsers()


onMounted(() => {
  initializeAdminData()
})
</script>

<style scoped>


</style>