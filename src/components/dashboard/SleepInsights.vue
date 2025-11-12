<template>
  <section class="sleep-insights-section">
    <div class="section-header !flex !items-center !gap-3 !mb-6 !md:mb-8">
      <img src="@/assets/img/star.svg" alt="" class="!w-6 !h-6">
      <h2 class="section-title">Sleep Insights</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Quality Chart -->
      <div class="insight-card !p-6 !rounded-xl !relative">
        <h3 class="insight-title !mb-10">Sleep Quality - Last 7 Days</h3>
        <ChartsComponent 
          :data="qualityChartData" 
          type="quality"
          color="#D9CBC2"
        />
        
        <!-- ✅ Add cloud SVG to bottom right -->
        <img 
          src="@/assets/img/did-you-know.svg" 
          alt="" 
          class="cloud-decoration"
        >
      </div>
      
      <!-- Hours Chart -->
      <div class="insight-card !p-6 !rounded-xl !relative">
        <h3 class="insight-title !mb-10">Sleep Hours - This Week</h3>
        <ChartsComponent 
          :data="hoursChartData" 
          type="hours"
          color="#F5F0E9"
        />

        <div class="average-section !mt-4 !text-center">
          <p class="average-label">Average Hours</p>
          <p class="average-value">{{ averageHours }}</p>
        </div>

        <!-- ✅ Add cloud SVG to bottom right -->
        <img 
          src="@/assets/img/did-you-know.svg" 
          alt="" 
          class="cloud-decoration"
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useSleepLogs } from '../../modules/useSleepLogs.js'
import ChartsComponent from '../ChartsComponent.vue'

const { sleepLogs } = useSleepLogs()

// ✅ Helper function to format dates nicely
const formatDate = (dateString) => {
  if (!dateString) return 'No Date'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }) // Returns "Nov 7", "Oct 31", etc.
  } catch (error) {
    return 'Invalid Date'
  }
}

const qualityChartData = computed(() => {
  if (!sleepLogs.value || sleepLogs.value.length === 0) {
    return []
  }
  
  const recentLogs = sleepLogs.value.slice(0, Math.min(5, sleepLogs.value.length))
  
  const chartData = recentLogs.map((log) => ({
    label: formatDate(log.date), // ✅ Use actual date instead of "Log X"
    value: log.sleepQuality || 5
  })).reverse()
  
  console.log('📊 Quality chart data with dates:', chartData)
  return chartData
})

const hoursChartData = computed(() => {
  if (!sleepLogs.value || sleepLogs.value.length === 0) {
    return []
  }
  
  const recentLogs = sleepLogs.value.slice(0, Math.min(5, sleepLogs.value.length))
  
  const chartData = recentLogs.map((log) => {
    let hours = 0
    if (log.hoursSlept) {
      hours = log.hoursSlept
    } else if (log.bedTime && log.wakeTime) {
      try {
        const bedTime = new Date(`2000-01-01T${log.bedTime}:00`)
        let wakeTime = new Date(`2000-01-01T${log.wakeTime}:00`)
        
        if (wakeTime < bedTime) {
          wakeTime.setDate(wakeTime.getDate() + 1)
        }
        
        const diffMs = wakeTime - bedTime
        hours = Math.round((diffMs / (1000 * 60 * 60)) * 10) / 10
      } catch (error) {
        hours = 0
      }
    }
    
    return {
      label: formatDate(log.date), // ✅ Use actual date instead of "Log X"
      value: hours
    }
  }).reverse()
  
  console.log('📊 Hours chart data with dates:', chartData)
  return chartData
})


// ✅ Debug watch for chart data
watch(qualityChartData, (newData) => {
  console.log('🔄 Quality chart data changed:', newData)
}, { immediate: true })

watch(hoursChartData, (newData) => {
  console.log('🔄 Hours chart data changed:', newData)
}, { immediate: true })

const averageHours = computed(() => {
  const data = hoursChartData.value
  if (!data || data.length === 0) return '0.0'
  
  const total = data.reduce((sum, item) => sum + (item.value || 0), 0)
  const avg = total / data.length
  return avg.toFixed(1)
})
</script>


<style scoped>

/* Section Headers */
.section-title {
  font-family: var(--font-serif);
  font-size: var(--font-size-xl);
  color: var(--color-cream);
  font-weight: 600;
}

/* Section 3: Sleep Insights */
.insight-card {
  background-color: var(--color-deep-purple);
  border: 1px solid color-mix(in srgb, var(--color-lavender) 20%, transparent);
}

.insight-title {
  font-family: var(--font-serif);
  font-size: var(--font-size-base);
  color: var(--color-cream);
  font-weight: 500;
}

.chart-placeholder {
  border-color: color-mix(in srgb, var(--color-lavender) 30%, transparent);
}

.placeholder-text {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  opacity: 0.7;
}

.average-section {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-text-cream);
}
.average-value {
  font-family: var(--font-sans);
  font-size: var(--font-size-2xl);
  color: var(--color-lavender);
}


/* ✅ Cloud decoration styling */
.cloud-decoration {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 10rem;
  height: auto;
  pointer-events: none; /* Makes it non-clickable */
  z-index: 1;
}


/* ✅ Make sure the card has relative positioning */
.insight-card {
  background-color: var(--color-deep-purple);
  border: 1px solid color-mix(in srgb, var(--color-lavender) 20%, transparent);
  position: relative; /* ✅ Ensure relative positioning for absolute child */
}

</style>