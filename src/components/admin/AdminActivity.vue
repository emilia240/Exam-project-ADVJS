<template>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Most Active User Card -->
    <div class="activity-card !p-6 !rounded-xl !relative flex flex-col justify-center">
      <h3 class="activity-title !mb-4">Most Active User</h3>
      <div v-if="mostActiveUser" class="flex flex-col md:flex-row justify-around">
        <!-- Left side - user info -->
        <div class="user-info">
          <p class="user-name">{{ mostActiveUser.userName }}</p>
          <p class="user-logs">{{ getUserLogCount(mostActiveUser.userId) }} logs</p>
          <p class="user-detail">Last login: {{ formatDate(mostActiveUser.lastLoginAt) }}</p>
        </div>
        
        <!-- Right side - cloud SVG -->
        <img 
          src="@/assets/img/did-you-know.svg" 
          alt="" 
          class="cloud-decoration !p-4"
        >
      </div>
      <div v-else class="no-users !flex !items-center !justify-between">
        <p class="empty-text">No regular users yet</p>
        <!-- Cloud also shows when empty -->
        <img 
          src="@/assets/img/did-you-know.svg" 
          alt="" 
          class="cloud-decoration opacity-30"
        >
      </div>
    </div>
    
    <!-- Platform Activity Chart -->
    <div class="activity-card !p-6 !rounded-xl">
      <h3 class="activity-title !mb-8">Platform Activity</h3>
      <ChartsComponent 
        :data="platformData" 
        type="overview"
        color="#E0C58F"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ChartsComponent from '../ChartsComponent.vue'

const props = defineProps({
  users: {
    type: Array,
    required: true
  },
  allSleepLogs: {
    type: Array,
    required: true
  },
  totalUsers: {
    type: Number,
    required: true
  },
  totalSleepLogs: {
    type: Number,
    required: true
  }
})

// ✅ Most active user (by log count)
const mostActiveUser = computed(() => {
  if (!props.users || props.users.length === 0) return null
  
  const regularUsers = props.users.filter(user => {
    return user.role !== 'admin' && !user.email?.includes('admin')
  })
  
  if (regularUsers.length === 0) return null
  
  // Sort by number of logs (highest first)
  const sortedByActivity = regularUsers.sort((a, b) => {
    const aLogs = getUserLogCount(a.userId)
    const bLogs = getUserLogCount(b.userId)
    return bLogs - aLogs
  })
  
  return sortedByActivity[0]
})

// Helper to format date
const formatDate = (timestamp) => {
  if (!timestamp) return 'Never'
  const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp)
  return date.toLocaleDateString()
}

const getUserLogCount = (userId) => {
  return props.allSleepLogs?.filter(log => log.userId === userId).length || 0
}

const platformData = computed(() => [
  { label: 'Users', value: props.totalUsers },
  { label: 'Logs', value: props.totalSleepLogs },
  { label: 'Active', value: Math.floor(props.totalUsers * 0.7) }
])


</script>


<style scoped>
.activity-card {
  background-color: var(--color-deep-purple);
  border: 1px solid color-mix(in srgb, var(--color-lavender) 20%, transparent);
}

.activity-title {
  font-family: var(--font-serif);
  color: var(--color-cream);
  font-size: var(--font-size-xl);
}

.user-name {
  font-size: var(--font-size-lg);
  color: var(--color-gold);
}

.user-logs {
  color: var(--color-text-light);
}

.cloud-decoration {
  width: 14rem;
  height: auto;
  flex-shrink: 0;
  margin-left: 1rem;
}

.user-detail {
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
  margin-top: 0.25rem;
}

.empty-text {
  color: var(--color-text-light);
  font-style: italic;
}
</style>