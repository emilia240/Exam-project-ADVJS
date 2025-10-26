<template>
    <DashboardNav navType="logs" @newLog="openSleepForm" />
    <SleepLogForm ref="sleepFormRef" />
    
</template>

<script setup>
import { ref } from 'vue'
import DashboardNav from '../components/DashboardNav.vue'
import SleepLogForm from '../components/SleepLogForm.vue'

const sleepFormRef = ref(null)

const openSleepForm = () => {
  sleepFormRef.value?.openForm()
}

</script>

<style scoped>



</style>