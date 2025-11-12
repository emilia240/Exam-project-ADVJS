<template>
  <div class="chart-container">
    <Bar 
      v-if="hasData" 
      :data="chartData" 
      :options="chartOptions" 
    />
    <div v-else class="loading-placeholder">
      <p>Loading chart data...</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// ✅ Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  data: Array,
  type: String,
  color: String
})

const hasData = computed(() => {
  return props.data && props.data.length > 0
})

const chartData = computed(() => {
  if (!hasData.value) return null
  
  return {
    labels: props.data.map(item => item.label),
    datasets: [{
      data: props.data.map(item => item.value),
      backgroundColor: props.color,
      borderColor: props.color, // ✅ Add border color
      borderWidth: 2, // ✅ Add border width
      borderRadius: 6,
      borderSkipped: false,
    }]
  }
})

// ✅ Enhanced chart options with colored axes
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(45, 34, 60, 0.9)', // ✅ Match your theme
      titleColor: '#E8DCC6',
      bodyColor: '#E8DCC6',
      borderColor: props.color,
      borderWidth: 1
    }
  },
  scales: {
    y: { 
      beginAtZero: true,
      grid: { 
        display: true, // ✅ Show grid
        color: 'rgba(184, 160, 130, 0.1)', // ✅ Subtle grid color
        lineWidth: 1
      },
      ticks: { 
        display: true, // ✅ Show Y-axis labels
        color: '#E0C58F', // ✅ Color the numbers
        font: { size: 11 }
      },
      border: {
        display: true, // ✅ Show Y-axis line
        color: '#E0C58F', // ✅ Color the axis line
        width: 2
      }
    },
    x: {
      grid: { 
        display: false // ✅ Keep X grid hidden for cleaner look
      },
      ticks: { 
        color: '#E0C58F', // ✅ Color the date labels
        font: { size: 12, weight: '500' },
        maxRotation: 0, // ✅ Keep dates horizontal
        padding: 8
      },
      border: {
        display: true, // ✅ Show X-axis line
        color: '#E0C58F', // ✅ Color the axis line
        width: 2
      }
    }
  },
  // ✅ Add some padding around the chart
  layout: {
    padding: {
      top: 10,
      bottom: 5,
      left: 5,
      right: 5
    }
  }
}))
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 200px;
  position: relative;
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
}
</style>