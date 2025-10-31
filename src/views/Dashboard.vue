<template>
  <div class="min-h-screen" style="background-color: var(--color-background);">
    <DashboardNav navType="dashboard"  @newLog="openSleepForm" />
    <SleepLogForm ref="sleepFormRef" />

    <div class="content !my-8 !pt-20 !md:pt-24 !px-4 !md:px-6 !max-w-7xl !mx-auto">

      <WelcomeSection 
        ref="welcomeSectionRef"
      />

     <RecentSleepLogs @openSleepForm="openSleepForm" />

     <SleepInsights />

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useLogoAnimations } from '../composables/animations/shared/useLogoAnimations.js'
import { useDashboardAnimations } from '@/composables/animations/useDashboardAnimations.js'

import DashboardNav from '../components/DashboardNav.vue'
import SleepLogForm from '../components/SleepLogForm.vue'
import WelcomeSection from '../components/dashboard/WelcomeSection.vue'
import RecentSleepLogs from '../components/dashboard/RecentSleepLogs.vue'
import SleepInsights from '../components/dashboard/SleepInsights.vue'


//animations composables
const { startLogoPulsing } = useLogoAnimations()
const { initializeDashboardAnimations } = useDashboardAnimations()

// Template refs
const sleepFormRef = ref(null)
const welcomeSectionRef = ref(null)


// Methods
const openSleepForm = () => {
  sleepFormRef.value?.openForm()
}

onMounted(() => {
  console.log('📱 Dashboard mounted')
  
  // Access the exposed refs from the WelcomeSection component
  const welcomeComponent = welcomeSectionRef.value
  
  if (welcomeComponent) {
    // Start logo animation
    startLogoPulsing(welcomeComponent?.dashboardLogo)
    
    // Initialize other dashboard animations  
    initializeDashboardAnimations(welcomeComponent?.welcomeTitle)
  }
})
</script>

<style scoped>


</style>