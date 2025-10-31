<template>
<!-- Hero Section with Background Image & Gradient -->
    <section class="hero-section relative overflow-hidden flex justify-center items-center">
      <!-- Background Image with Gradient Overlay -->
      <div class="absolute inset-0 bg-hero-image bg-cover bg-center bg-no-repeat"></div>
      <div class="absolute inset-0 bg-hero-gradient"></div>
      
      <!-- Hero Content -->
      <div class="hero-content relative flex flex-col z-10 text-center items-center justify-start !px-4 !max-w-4xl !mx-auto">
        <!-- Logo -->
        <img 
          src="@/assets/img/Logo-somnus.svg" 
          alt="Somnus Logo" 
          class="hero-logo flex !mx-auto !mb-24 !md:mb-32 !lg:mb-40"
        >
        
        <!-- Hero Text -->
        <p ref="heroText" class="hero-text text-center leading-relaxed !mx-auto !mb-16 !md:mb-20 !max-w-2xl">
          A minimalist haven for tracking your sleep patterns and journaling your dreams. 
          Understand your rest, unlock your subconscious.
        </p>
        
        <!-- CTA Button -->
        <router-link to="/login" class="cta-button !font-semibold !px-8 !py-4 !md:px-12 !md:py-5 !rounded-xl !border-none !cursor-pointer !transition-all !duration-300 !hover:-translate-y-0.5 !inline-block !no-underline">
          Get Started
        </router-link>
      </div>
    </section>


</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const heroText = ref(null)

// Define template ref for parent to access
defineExpose({
  heroText
})

</script>

<style scoped>
/* HERO SECTION STYLES - Only custom variables */
.hero-section {
  min-height: 100vh;
}

.hero-logo {
  width: 16rem;
  height: 16rem;
}

.bg-hero-image {
  background-image: url('@/assets/img/starry-night.jpg');
}

.bg-hero-gradient {
  background: linear-gradient(
    to bottom,
    rgba(10, 17, 35, 0.4) 0%,     
    rgba(10, 17, 35, 0.7) 60%,    
    rgba(10, 17, 35, 1) 100%      
  );
}

.hero-text {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  line-height: 1.6;
}

.cta-button {
  background-color: var(--color-gold);
  color: var(--color-midnight);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
}

.cta-button:hover {
  background-color: var(--color-lavender);
}



/* Responsive adjustments */
@media (min-width: 768px) {
  .hero-section {
    min-height: 130vh;
  }
  
  .hero-logo {
    width: 16rem;
    height: 16rem;
  }
  
  .hero-text {
    font-size: var(--font-size-base);
  }
  
  .cta-button {
    font-size: var(--font-size-base);
  }
}

@media (min-width: 1024px) {
  .hero-section {
    min-height: 140vh;
  }
  
  .hero-logo {
    width: 20rem;
    height: 20rem;
  }
}
</style>