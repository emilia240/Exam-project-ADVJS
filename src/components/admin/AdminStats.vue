<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 !mb-8">
        <div class="stat-card !p-6 !rounded-xl !text-center">
          <h3 class="stat-title">Total Users</h3>
          <p class="stat-number">{{ totalUsers }}</p>
        </div>
        
        <div class="stat-card !p-6 !rounded-xl !text-center">
          <h3 class="stat-title">Total Sleep Logs</h3>
          <p class="stat-number">{{ totalSleepLogs }}</p>
        </div>
      </div>
</template>

<script setup>

const props = defineProps({
  totalUsers: {
    type: Number,
    required: true
  },
  totalSleepLogs: {
    type: Number,
    required: true
  }
})


</script>

<style scoped>
.stat-card {
  background-color: var(--color-deep-purple);
  border: 1px solid color-mix(in srgb, var(--color-lavender) 20%, transparent);
}

.stat-title {
  font-family: var(--font-serif);
  color: var(--color-cream);
  font-size: var(--font-size-xl);
}

.stat-number {
  font-size: var(--font-size-3xl);
  color: var(--color-gold);
  font-weight: 500;
}
</style>