<template>
  <main class="min-h-screen">
    <!-- Hero Section with Background Image & Gradient -->
    <section class="hero-section relative !w-screen overflow-hidden flex justify-center items-center">
      <!-- Background Image with Gradient Overlay -->
      <div class="absolute inset-0 bg-hero-image bg-cover bg-center bg-no-repeat"></div>
      <div class="absolute inset-0 bg-hero-gradient"></div>
      
      <!-- Hero Content -->
      <div class="hero-content relative !z-10 text-center !px-4 !max-w-4xl !mx-auto">
        <!-- Logo -->
        <img 
          src="@/assets/img/Logo-somnus.svg" 
          alt="Somnus Logo" 
          class="hero-logo block !mx-auto !mb-24 !md:mb-32 !lg:mb-40"
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

    <!-- Footer Section -->
    <footer class="footer-section !py-8 !md:py-16 !px-4 !lg:px-8 !mt-12">
      <div class="footer-container !max-w-6xl !mx-auto">
        <!-- Footer Header -->
        <h2 ref="footerHeader" class="footer-header text-center !mb-8 !md:mb-16">Track your sleep. Decode your dreams.</h2>
        
        <!-- Footer Links -->
        <div class="footer-links grid grid-cols-1 md:grid-cols-3 !gap-4 !md:gap-8 text-center">
          
          <!-- Privacy Policy -->
          <p class="footer-text">Privacy Policy</p>
          
          <!-- Copyright -->
          <p class="footer-text">© 2025 Somnus. All rights reserved.</p>
          
          <!-- Support Contact -->
          <p class="footer-text">Support Contact</p>
          
        </div>
      </div>
    </footer>

  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useHomeAnimations } from '@/composables/animations/useHomeAnimations';
import { useLogoAnimations } from '@/composables/animations/shared/useLogoAnimations';

// IMPORT ALL ANIMATION LOGIC
const {
  heroText,
  card1,
  card2,
  card3,
  bannerHeader,
  didYouKnowIcon,
  footerHeader,

  animateHeroText,
  initializeScrollAnimations
} = useHomeAnimations();

const { startLogoFloating } = useLogoAnimations();

onMounted(() => {
  // Start logo floating
  startLogoFloating();
  
  // Animate hero text immediately (always visible)
  animateHeroText();
  
  // Initialize ALL scroll-triggered animations (handles everything else)
  initializeScrollAnimations();
});
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

/* FOOTER SECTION STYLES */
.footer-section {
  background-color: var(--color-background);
}

/* Footer Header */
.footer-header {
  font-family: var(--font-serif);
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  font-weight: 600;
}

/* Footer Text */
.footer-text {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  line-height: 1.6;
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
  
  .card-header {
    font-size: var(--font-size-base);
  }
  
  .card-text {
    font-size: var(--font-size-xs);
  }
  
  .banner-header {
    font-size: var(--font-size-2xl);
  }
  
  .fact-header {
    font-size: var(--font-size-xl);
  }
  
  .fact-text {
    font-size: var(--font-size-base);
  }
  
  .footer-header {
    font-size: var(--font-size-lg);
  }
  
  .footer-text {
    font-size: var(--font-size-sm);
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