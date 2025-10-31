<template>

  <section class="sleep-insights-section">
    <div class="section-header !flex !items-center !gap-3 !mb-6 !md:mb-8">
      <img src="@/assets/img/star.svg" alt="" class="!w-6 !h-6">
      <h2 class="section-title">Sleep Insights</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Chart placeholders -->
      <div class="insight-card !p-6 !rounded-xl">
        <h3 class="insight-title !mb-4">Sleep Quality - Last 7 Days</h3>
        <div class="chart-placeholder !h-48 !flex !items-center !justify-center !border-2 !border-dashed !rounded-lg">
          <p class="placeholder-text">Chart coming soon...</p>
        </div>
      </div>
      
      <div class="insight-card !p-6 !rounded-xl">
        <h3 class="insight-title !mb-4">Sleep Hours - This Week</h3>
        <div class="chart-placeholder !h-48 !flex !items-center !justify-center !border-2 !border-dashed !rounded-lg">
          <p class="placeholder-text">Chart coming soon...</p>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>

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

</style>