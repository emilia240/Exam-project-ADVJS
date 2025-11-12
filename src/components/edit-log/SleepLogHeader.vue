<template>

  <!-- Sleep Log Details Header -->
  <div class="details-header-card !p-10 rounded-xl !mb-6 border">
    <div class="flex items-start justify-between">
      <!-- Left Side: Title and Timestamps -->
      <div class="header-info">
        <div class="flex items-center !gap-3 !mb-4">
          <img src="@/assets/img/moon.svg" alt="" class="!w-6 !h-6">
          <h2 class="details-title font-medium">Sleep Log Details</h2>
        </div>
        
        <!-- Timestamps -->
        <div class="timestamps">
          <p class="timestamp !mb-2">
            <span class="timestamp-label">Created:</span> 
            {{ formatTimestamp(log?.createdAt) }}
          </p>
          <p v-if="hasBeenUpdated" class="timestamp !mb-2">
            <span class="timestamp-label">Updated:</span> 
            {{ formatTimestamp(log?.updatedAt) }}
          </p>
        </div>
      </div>
      
      <!-- Right Side: Quality Rating -->
      <div class="quality-rating flex items-center !gap-2">
        <span class="quality-score">{{ log?.sleepQuality || 0 }}/10</span>
        <img src="@/assets/img/star.svg" alt="" class="!w-5 !h-5">
      </div>
    </div>
  </div>

</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuth } from '../../modules/useAuth.js'


// Props
const props = defineProps({
  log: {
    type: Object,
    required: true
  }
})

// Computed values
const hasBeenUpdated = computed(() => {
  if (!props.log) return false
  const created = new Date(props.log.createdAt?.toDate?.() || props.log.createdAt)
  const updated = new Date(props.log.updatedAt?.toDate?.() || props.log.updatedAt)
  return updated.getTime() - created.getTime() > 1000 // More than 1 second difference
})

// Methods
const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'Unknown'
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}



const { updateLastLogin, currentUser } = useAuth()

// Call it when viewing log details
onMounted(() => {
  if (currentUser.value) {
    updateLastLogin(currentUser.value.uid)
  }
})
</script>

<style scoped>

/* Cards */
.details-header-card {
  background-color: var(--color-deep-purple);
  border-color: color-mix(in srgb, var(--color-lavender) 20%, transparent);
}

/* Details Title */
.details-title {
  font-family: var(--font-serif);
  color: var(--color-cream);
  font-size: var(--font-size-xl);
}

/* Timestamps */
.timestamp {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.timestamp-label {
  color: var(--color-sand);
  font-weight: 500 !important;
}

/* Quality Rating */
.quality-score {
  font-family: var(--font-sans);
  color: var(--color-gold);
  font-weight: 600 !important;
  font-size: var(--font-size-2xl);
}

</style>