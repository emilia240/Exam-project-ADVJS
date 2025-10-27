<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
      <div class="sleep-form-container" @click.stop>
        <!-- Title -->
        <h2 class="form-title">Log Your Sleep</h2>
        
        <!-- Error Display -->
        <span v-if="showError" class="error-message">{{ errorMessage }}</span>
        
        <!-- Time Inputs Section -->
        <div class="time-section">
          <div class="bedtime-group">
            <h3 class="section-header">Bedtime</h3>
            <input type="time" v-model="bedTime" class="time-input">
          </div>
          <div class="waketime-group">
            <h3 class="section-header">Waketime</h3>
            <input type="time" v-model="wakeTime" class="time-input">
          </div>
          <!-- Total Sleep Time Display -->
          <div class="sleep-total-group">
            <h3 class="section-header">Total Sleep Time</h3>
            <div class="sleep-total-display">
              {{ totalSleepTime }}
            </div>
          </div>
        </div>
        
        <!-- Sleep Quality Section -->
        <div class="quality-section">
          <h3 class="section-header">Sleep Quality (1-10)</h3>
          <div class="slider-container">
            <input 
              type="range" 
              min="1" 
              max="10" 
              v-model="sleepQuality" 
              class="quality-slider"
            >
            <div class="quality-display">
              <span class="quality-number">{{ sleepQuality }}</span>
              <span class="quality-star">⭐</span>
            </div>
          </div>
        </div>
        
        <!-- Dream Journal Section -->
        <div class="dream-section">
          <h3 class="section-header">Dream Entry</h3>
          <div class="textarea-container">
            <textarea 
              v-model="dreamJournal" 
              placeholder="Describe your dreams..."
              class="dream-textarea"
              @input="resetError"
            ></textarea>
          </div>
        </div>
        
        <!-- Tags Section -->
        <div class="tags-section">
          <h3 class="section-header">Tags</h3>
          <div class="tags-container">
            <input 
              type="text" 
              v-model="tags" 
              placeholder="e.g., vivid, nightmare, lucid"
              class="tags-input"
              @input="resetError"
            >
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="button-section">
          <button @click="saveSleepLog" :disabled="saving" class="save-button">
            {{ saving ? 'Saving...' : 'Save sleep log' }}
          </button>
          <button @click="closeForm" class="cancel-button">Cancel</button>
        </div>
        
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useSleepLogs } from '@/modules/useSleepLogs'

const { 
  // Form state
  isOpen,
  bedTime,
  wakeTime,
  sleepQuality,
  dreamJournal,
  tags,
  
  // Computed values
  totalSleepTime,
  
  // Error handling
  showError,
  errorMessage,
  resetError,
  
  // Form actions
  openForm,
  closeForm,
  saveSleepLog,
  handleOverlayClick,
  
  // Loading state
  saving

} = useSleepLogs()



// Expose methods for parent components
defineExpose({
  openForm,
  closeForm
})

</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed !important;
  inset: 0 !important;
  background-color: rgba(10, 17, 35, 0.8) !important;
  backdrop-filter: blur(5px) !important;
  z-index: 1000 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 2rem !important;
}

/* Form Container */
.sleep-form-container {
  background-color: #3A3E6C !important;
  border-radius: 1rem !important;
  padding: 2rem !important;
  max-width: 600px !important;
  width: 100% !important;
  max-height: 90vh !important;
  overflow-y: auto !important;
}

/* Title */
.form-title {
  color: var(--color-cream) !important;
  font-family: var(--font-serif) !important;
  font-size: var(--font-size-xl) !important;
  text-align: center !important;
  margin-bottom: 2rem !important;
}

/* Section Headers */
.section-header {
  color: var(--color-cream) !important;
  font-family: var(--font-sans) !important;
  font-size: var(--font-size-base) !important;
  margin-bottom: 0.5rem !important;
}

/* Time Inputs */
.time-section {
  display: flex !important;
  gap: 2rem !important;
  margin-bottom: 1.5rem !important;
}

.time-input {
  background-color: var(--color-cream) !important;
  color: var(--color-midnight) !important;
  border: 1px solid color-mix(in srgb, var(--color-lavender) 30%, transparent) !important;
  border-radius: 0.5rem !important;
  padding: 0.75rem !important;
  font-family: var(--font-sans) !important;
}

/* total sleep display */

.sleep-total-group {
  display: flex !important;
  flex-direction: column !important;
}

.sleep-total-display {
  background-color: var(--color-sand) !important;
  color: var(--color-midnight) !important;
  border: 1px solid color-mix(in srgb, var(--color-lavender) 30%, transparent) !important;
  border-radius: 0.5rem !important;
  padding: 0.75rem !important;
  font-family: var(--font-sans) !important;
  font-weight: 600 !important;
  text-align: center !important;
  min-height: 2.75rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.time-section {
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: 1rem !important;
  margin-bottom: 1.5rem !important;
}

.error-message {
  display: block !important;
  background-color: color-mix(in srgb, #dc2663 15%, transparent) !important;
  border: 1px solid color-mix(in srgb, #dc2663 40%, transparent) !important;
  color: #ff6b6b !important;
  font-family: var(--font-sans) !important;
  font-size: var(--font-size-sm) !important;
  text-align: center !important;
  padding: 0.75rem !important;
  margin-bottom: 1rem !important;
  border-radius: 0.5rem !important;
}

/* Quality Slider */
.slider-container {
  display: flex !important;
  align-items: center !important;
  gap: 1rem !important;
  margin-bottom: 1.5rem !important;
}

.quality-slider {
  flex: 1 !important;
  height: 0.5rem !important;
  background-color: var(--color-gold) !important;
  border-radius: 0.25rem !important;
}

.quality-display {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  color: var(--color-cream) !important;
  font-family: var(--font-sans) !important;
  font-size: var(--font-size-lg) !important;
}

/* Dream Textarea */
.textarea-container {
  background-color: #0A1123 !important;
  border-radius: 0.5rem !important;
  padding: 0.25rem !important;
  margin-bottom: 1.5rem !important;
}

.dream-textarea {
  width: 100% !important;
  min-height: 100px !important;
  background: transparent !important;
  color: var(--color-cream) !important;
  border: none !important;
  padding: 0.75rem !important;
  font-family: var(--font-sans) !important;
  resize: vertical !important;
}

.dream-textarea::placeholder {
  color: var(--color-cream) !important;
}

.dream-textarea:focus {
  outline: none !important;
}

/* Tags Input */
.tags-container {
  background-color: #0A1123 !important;
  border-radius: 0.5rem !important;
  padding: 0.25rem !important;
  margin-bottom: 2rem !important;
}

.tags-input {
  width: 100% !important;
  background: transparent !important;
  color: var(--color-cream) !important;
  border: none !important;
  padding: 0.75rem !important;
  font-family: var(--font-sans) !important;
}

.tags-input::placeholder {
  color: var(--color-cream) !important;
}

.tags-input:focus {
  outline: none !important;
}

/* Action Buttons */
.button-section {
  display: flex !important;
  gap: 3rem !important;
  justify-content: center !important;
}

.save-button, .cancel-button {
  font-family: var(--font-sans) !important;
  font-size: var(--font-size-base) !important;
  font-weight: 600 !important;
  padding: 0.75rem 2rem !important;
  border: none !important;
  border-radius: 0.5rem !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.save-button {
  background-color: var(--color-lavender) !important;
  color: var(--color-midnight) !important;
}

.save-button:hover {
  background-color: var(--color-gold) !important;
  transform: translateY(-2px) !important;
}

.cancel-button {
  background-color: var(--color-sand) !important;
  color: var(--color-text-dark) !important;
}

.cancel-button:hover {
  background-color: #ff6b6b !important;
  transform: translateY(-2px) !important;
}
</style>