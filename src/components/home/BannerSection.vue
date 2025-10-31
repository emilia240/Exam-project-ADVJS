<template>
       <!-- Banner Section with Facts -->
    <section class="banner-section relative !py-10 !md:py-16 !px-6 !lg:px-10 overflow-hidden">
      
      <div class="banner-container !max-w-6xl !mx-auto relative !z-10">
        <!-- Section Header -->
        <h2 ref="bannerHeader" class="banner-header text-center !mb-12 !md:mb-16">Did you know?</h2>
        
        <!-- Facts Content -->
        <div class="facts-content relative !py-14 !md:py-18 !px-10 !md:px-14 rounded-2xl">
          <!-- Scattered Background Icons - only 3, positioned over facts content -->
          <img src="@/assets/img/moon.svg" alt="" class="scattered-icon moon-1 absolute !w-8 !h-8 opacity-20 z-10">
          <img src="@/assets/img/cloud.svg" alt="" class="scattered-icon cloud-1 absolute !w-8 !h-8 opacity-20 z-10">
          <img src="@/assets/img/star.svg" alt="" class="scattered-icon star-1 absolute !w-8 !h-8 opacity-20 z-10">

          <!-- Did You Know SVG - positioned at bottom center -->
          <img ref="didYouKnowIcon" src="@/assets/img/did-you-know.svg" alt="" class="did-you-know-icon absolute z-20 !mb-10 cursor-pointer transition-all duration-300">
          
          <!-- Facts Grid -->
          <div class="facts-grid grid grid-cols-1 md:grid-cols-3 !gap-8 !md:gap-12">
            
            <!-- Fact 1 -->
            <div class="fact-item text-center">
              <h3 class="fact-header !mb-4">1/3</h3>
              <p class="fact-text">of your life is spent sleeping - that's about 26 years for the average person.</p>
            </div>

            <!-- Fact 2 -->
            <div class="fact-item text-center">
              <h3 class="fact-header !mb-4">4-6</h3>
              <p class="fact-text">dreams per night on average, though most are forgotten within minutes of waking.</p>
            </div>

            <!-- Fact 3 -->
            <div class="fact-item text-center">
              <h3 class="fact-header !mb-4">12%</h3>
              <p class="fact-text">of people dream entirely in black and white, while the rest dream in full color.</p>
            </div>

          </div>
        </div>

      </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

// Create the refs
const bannerHeader = ref(null)
const didYouKnowIcon = ref(null)

// Define template refs for parent to access
defineExpose({
  bannerHeader,
  didYouKnowIcon
})
</script>

<style scoped>


/* BANNER SECTION STYLES */
.banner-section {
  background-color: var(--color-background);
}

/* Banner Header */
.banner-header {
  font-family: var(--font-serif);
  font-size: var(--font-size-xl);
  color: var(--color-text-light);
  font-weight: 600;
}

/* Facts Content with Gradient Background */
.facts-content {
  background: linear-gradient(
    to right,
    rgba(58, 62, 108, 0.35) 0%,
    rgba(58, 62, 108, 0.35) 50%,
    rgba(224, 197, 143, 0.35) 100%
  );
}

/* Fact Typography */
.fact-header {
  font-family: var(--font-serif);
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  font-weight: 600;
}

.fact-text {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  line-height: 1.6;
}

/* Icon Positions - Mobile (relative to facts-content div) */
.moon-1 { top: 20%; left: 10%; }
.cloud-1 { top: 50%; right: 15%; }
.star-1 { top: 75%; left: 20%; }

/* Did You Know Icon - positioned at bottom center of facts content */
.did-you-know-icon {
  bottom: -35%;
  left: 43%;
  transform: translateX(-50%);
  width: 1.5rem;
  height: 2rem;
}

.did-you-know-icon:hover {
  filter: drop-shadow(0 4px 8px rgba(224, 197, 143, 0.4));
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .banner-header {
    font-size: var(--font-size-2xl);
  }
  
  .fact-header {
    font-size: var(--font-size-xl);
  }
  
  .fact-text {
    font-size: var(--font-size-base);
  }
  
  /* Adjust icon positions for larger screens */
  .scattered-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .star-1 { top: 15%; left: 8%; }
  .cloud-1 { top: 20%; right: 5%; }
  .moon-1 { top: 70%; left: 43%; }

   /* Larger did-you-know icon on desktop */
  .did-you-know-icon {
    width: 9rem;
    height: 6rem;
  }
}
</style>