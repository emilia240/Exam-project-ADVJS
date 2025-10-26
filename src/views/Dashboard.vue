<template>

  <div class="min-h-screen" style="background-color: var(--color-background);">
    <DashboardNav navType="dashboard" @viewAll="goToLogsList" @newLog="openSleepForm" />
    <SleepLogForm ref="sleepFormRef" />
    <div class="content  !pt-20 !md:pt-24 !px-4 !md:px-6">
       
    </div>
    

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useSleepLogs } from '../modules/useSleepLogs.js'
import DashboardNav from '../components/DashboardNav.vue'
import SleepLogForm from '../components/SleepLogForm.vue'

const sleepFormRef = ref(null)

const openSleepForm = () => {
  sleepFormRef.value?.openForm()
}

const { sleepLogs, newSleepLogTitle, addSleepLog, deleteSleepLog, showError, resetError, editingId, editTitle, startEdit, cancelEdit, updateSleepLog } = useSleepLogs()

// Clean up loading overlay when Dashboard mounts
onMounted(() => {
  // Remove the loading overlay created in LoginView
  const loadingOverlay = document.querySelector('.loading-overlay')
  if (loadingOverlay) {
    loadingOverlay.remove()
    console.log('Loading overlay removed')
  }
})
</script>

<style>



</style>