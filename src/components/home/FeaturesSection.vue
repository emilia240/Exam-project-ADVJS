<template>
 <!-- Features Section with Three Cards -->
    <section class="features-section !py-8 !md:py-16 !px-4 !lg:px-8">
      <div class="features-container !max-w-6xl !mx-auto">
        <!-- Cards Grid -->
        <div class="features-grid grid grid-cols-1 md:grid-cols-3 !gap-8 !md:gap-12">
          
          <!-- Card 1 - Track Sleep -->
          <div ref="card1" class="feature-card text-center !p-8 rounded-2xl transition-transform duration-300 hover:-translate-y-2">
            <!-- Icon Circle -->
            <div class="icon-circle !w-15 !h-15 !mx-auto !mb-6 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300">
              <img 
                src="@/assets/img/moon.svg" 
                alt="Moon Icon" 
                class="!w-7 !h-7"
              >
            </div>
            <!-- Card Header -->
            <h3 class="card-header !mb-4">Track Sleep</h3>
            <!-- Card Text -->
            <p class="card-text">Log your bedtime, wake time, and sleep quality with ease in order to maintain a healthy sleep routine.</p>
          </div>

          <!-- Card 2 - Journal Dreams -->
          <div ref="card2" class="feature-card text-center !p-8 rounded-2xl transition-transform duration-300 hover:-translate-y-2">
            <!-- Icon Circle -->
            <div class="icon-circle !w-15 !h-15 !mx-auto !mb-6 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300">
              <img 
                src="@/assets/img/cloud.svg" 
                alt="Cloud Icon" 
                class="!w-7 !h-7"
              >
            </div>
            <!-- Card Header -->
            <h3 class="card-header !mb-4">Journal Dreams</h3>
            <!-- Card Text -->
            <p class="card-text">Capture and reflect on your dreams upon waking, to unlock insights from your subconscious.</p>
          </div>

          <!-- Card 3 - Find Patterns -->
          <div ref="card3" class="feature-card text-center !p-8 rounded-2xl transition-transform duration-300 hover:-translate-y-2">
            <!-- Icon Circle -->
            <div class="icon-circle !w-15 !h-15 !mx-auto !mb-6 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300">
              <img 
                src="@/assets/img/star.svg" 
                alt="Star Icon" 
                class="!w-7 !h-7"
              >
            </div>
            <!-- Card Header -->
            <h2 class="card-header !mb-4">Discover Patterns</h2>
            <!-- Card Text -->
            <p class="card-text">Analyze your data to visualize trends and insights related to your sleep hygiene.</p>
          </div>

        </div>
      </div>
    </section>   
</template>

<script setup>
import { ref } from 'vue'

const card1 = ref(null)
const card2 = ref(null)
const card3 = ref(null)

defineExpose({
  card1,
  card2,
  card3
})

</script>

<style scoped>


/* FEATURES SECTION STYLES */
.features-section {
  background-color: var(--color-background);
}

/* Feature Cards */
.feature-card {
  background-color: var(--color-lavender);
}

/* Icon Circles */
.icon-circle {
  background-color: var(--color-midnight);
}

.icon-circle:hover {
  box-shadow: 0 8px 25px rgba(131, 135, 195, 0.3);
}

/* Card Typography */
.card-header {
  font-family: var(--font-serif);
  font-size: var(--font-size-sm);
  color: var(--color-midnight);
  font-weight: 600;
}

.card-text {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  color: var(--color-midnight);
  line-height: 1.6;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .card-header {
    font-size: var(--font-size-base);
  }
  
  .card-text {
    font-size: var(--font-size-xs);
  }
}
</style>