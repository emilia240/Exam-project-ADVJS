<template>

  <!-- Editable Sleep Data -->
  <div class="sleep-data-card !p-10 rounded-xl border">
    <!-- Time Inputs Section -->
    <div class="time-section grid grid-cols-1 md:grid-cols-3 !gap-4 !mb-8">
      <div class="bedtime-group flex flex-col">
        <h3 class="section-header !mb-2">Bedtime</h3>
        <input 
          type="time" 
          :value="bedTime" 
          @input="$emit('update:bedTime', $event.target.value)"
          class="time-input rounded-lg !p-3 border"
        >
      </div>
      <div class="waketime-group flex flex-col">
        <h3 class="section-header !mb-2">Waketime</h3>
        <input 
          type="time" 
          :value="wakeTime" 
          @input="$emit('update:wakeTime', $event.target.value)"
          class="time-input rounded-lg !p-3 border"
        >
      </div>
      <!-- Total Sleep Time Display -->
      <div class="sleep-total-group flex flex-col">
        <h3 class="section-header !mb-2">Total Sleep Time</h3>
        <div class="sleep-total-display rounded-lg !p-3 border font-semibold text-center min-h-11 flex items-center justify-center">
          {{ calculatedSleepTime }} hours
        </div>
      </div>
    </div>

    <!-- Sleep Quality Section -->
    <div class="quality-section !mb-8">
      <h3 class="section-header !mb-2">Sleep Quality (1-10)</h3>
      <div class="slider-container flex items-center !gap-4 !mb-6">
        <input 
          type="range" 
          min="1" 
          max="10" 
          :value="sleepQuality"
          @input="$emit('update:sleepQuality', $event.target.value)"
          class="custom-range-slider flex-1 cursor-pointer outline-none transition-all duration-200"
        >
        <div class="quality-display flex items-center !gap-3">
          <span class="quality-number">{{ sleepQuality }}</span>
          <img src="@/assets/img/star.svg" alt="star" class="quality-star-icon !w-7 !h-7">
        </div>
      </div>
    </div>
    
    <!-- Dream Journal Section -->
    <div class="dream-section !mb-8">
      <h3 class="section-header !mb-2">Dream Entry</h3>
      <div class="textarea-container rounded-lg !p-1 !mb-6">
        <textarea 
          :value="dreamJournal" 
          @input="$emit('update:dreamJournal', $event.target.value)"
          placeholder="Describe your dreams..."
          class="dream-textarea !w-full !min-h-32 bg-transparent border-none !p-3 resize-y focus:outline-none"
        ></textarea>
      </div>
    </div>

        <!-- Tags Section -->
    <div class="tags-section">
      <h3 class="section-header !mb-2">Tags</h3>
      <div class="tags-container rounded-lg !p-1">
        <input 
          type="text" 
          :value="tags" 
          @input="$emit('update:tags', $event.target.value)"
          placeholder="e.g., vivid, nightmare, lucid"
          class="tags-input !w-full bg-transparent border-none !p-3 focus:outline-none"
        >
      </div>
    </div>
  </div>

</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  bedTime: String,
  wakeTime: String,
  sleepQuality: [String, Number],
  dreamJournal: String,
  tags: String,
  calculateSleepHours: Function
})

// Emits
defineEmits([
  'update:bedTime',
  'update:wakeTime', 
  'update:sleepQuality',
  'update:dreamJournal',
  'update:tags'
])

// Computed values
// Create a function to calculate sleep hours
//using the imported calculateSleepHours function
const calculatedSleepTime = computed(() => {
  const hours = props.calculateSleepHours(props.bedTime, props.wakeTime)
  return hours ? `${hours.toFixed(1)}` : '-'
})


</script>

<style scoped>
/* Cards */
.sleep-data-card {
  background-color: var(--color-deep-purple);
  border-color: color-mix(in srgb, var(--color-lavender) 20%, transparent);
}

/* Section Headers */
.section-header {
  color: var(--color-cream);
  font-family: var(--font-serif);
  font-size: var(--font-size-base);
}

/* Time Inputs */
.time-input {
  background-color: var(--color-cream);
  color: var(--color-midnight);
  border-color: color-mix(in srgb, var(--color-lavender) 30%, transparent);
  font-family: var(--font-sans);
}

.sleep-total-display {
  background-color: var(--color-sand);
  color: var(--color-midnight);
  border-color: color-mix(in srgb, var(--color-lavender) 30%, transparent);
  font-family: var(--font-sans);
}

/* Quality Slider */
.custom-range-slider {
  height: 0.6rem;
  border-radius: 1rem;
  background: var(--color-midnight);
  -webkit-appearance: none;
  appearance: none;
}

.custom-range-slider::-webkit-slider-track {
  height: 8px;
  border-radius: 5px;
  background: var(--color-gold);
  border: none;
}

.custom-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 50%;
  background: var(--color-lavender);
  cursor: pointer;
  border: 2px solid var(--color-cream);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.custom-range-slider::-webkit-slider-thumb:hover {
  background: var(--color-gold);
  transform: scale(1.15);
}

.quality-display {
  color: var(--color-gold);
  font-family: var(--font-sans);
  font-size: var(--font-size-3xl);
}

/* Dream Textarea */
.textarea-container {
  background-color: #0A1123;
}

.dream-textarea {
  color: var(--color-cream);
  font-family: var(--font-sans);
}

.dream-textarea::placeholder {
  color: var(--color-cream);
}

/* Tags Input */
.tags-container {
  background-color: #0A1123;
}

.tags-input {
  color: var(--color-cream);
  font-family: var(--font-sans);
}

.tags-input::placeholder {
  color: var(--color-cream);
}
</style>