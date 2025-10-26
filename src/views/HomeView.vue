<template>
  <main class="min-h-screen">
    <!-- Hero Section with Background Image & Gradient -->
    <section class="hero-section relative w-screen overflow-hidden flex justify-center items-center">
      <!-- Background Image with Gradient Overlay -->
      <div class="absolute inset-0 bg-hero-image bg-cover bg-center bg-no-repeat"></div>
      <div class="absolute inset-0 bg-hero-gradient"></div>
      
      <!-- Hero Content -->
      <div class="hero-content relative z-10 text-center !px-4 !max-w-4xl !mx-auto">
        <!-- Logo -->
        <img 
          src="@/assets/img/Logo-somnus.svg" 
          alt="Somnus Logo" 
          class="hero-logo !block !mx-auto !mb-24 md:!mb-32 lg:!mb-40"
        >
        
        <!-- Hero Text -->
        <p ref="heroText" class="hero-text !text-center !leading-relaxed !mx-auto !mb-16 md:!mb-20 !max-w-2xl">
          A minimalist haven for tracking your sleep patterns and journaling your dreams. 
          Understand your rest, unlock your subconscious.
        </p>
        
        <!-- CTA Button -->
        <button class="cta-button !font-semibold !px-8 !py-4 md:!px-12 md:!py-5 !rounded-xl !border-none !cursor-pointer !transition-all !duration-300 hover:!-translate-y-0.5">
          Get Started
        </button>
      </div>
    </section>

    <!-- Features Section with Three Cards -->
    <section class="features-section !py-8 md:!py-16 !px-4 lg:!px-8">
      <div class="features-container !max-w-6xl !mx-auto">
        <!-- Cards Grid -->
        <div class="features-grid !grid !grid-cols-1 md:!grid-cols-3 !gap-8 md:!gap-12">
          
          <!-- Card 1 - Track Sleep -->
          <div ref="card1" class="feature-card !text-center !p-8 !rounded-2xl">
            <!-- Icon Circle -->
            <div class="icon-circle !w-15 !h-15 !mx-auto !mb-6 !rounded-full !flex !items-center !justify-center">
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
          <div ref="card2" class="feature-card !text-center !p-8 !rounded-2xl">
            <!-- Icon Circle -->
            <div class="icon-circle !w-15 !h-15 !mx-auto !mb-6 !rounded-full !flex !items-center !justify-center">
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
          <div ref="card3" class="feature-card !text-center !p-8 !rounded-2xl">
            <!-- Icon Circle -->
            <div class="icon-circle !w-15 !h-15 !mx-auto !mb-6 !rounded-full !flex !items-center !justify-center">
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
    <section class="banner-section !relative !py-8 md:!py-16 !px-4 lg:!px-8">
      
      <div class="banner-container !max-w-6xl !mx-auto !relative !z-10">
        <!-- Section Header -->
        <h2 ref="bannerHeader" class="banner-header !text-center !mb-12 md:!mb-16">Did you know?</h2>
        
        <!-- Facts Content -->
        <div class="facts-content !relative !py-12 md:!py-16 !px-8 md:!px-12 !rounded-2xl">
          <!-- Scattered Background Icons - only 3, positioned over facts content -->
          <img src="@/assets/img/moon.svg" alt="" class="scattered-icon moon-1">
          <img src="@/assets/img/cloud.svg" alt="" class="scattered-icon cloud-1">
          <img src="@/assets/img/star.svg" alt="" class="scattered-icon star-1">
          
          <!-- Did You Know SVG - positioned at bottom center -->
          <img ref="didYouKnowIcon" src="@/assets/img/did-you-know.svg" alt="" class="did-you-know-icon">
          
          <!-- Facts Grid -->
          <div class="facts-grid !grid !grid-cols-1 md:!grid-cols-3 !gap-8 md:!gap-12">
            
            <!-- Fact 1 -->
            <div class="fact-item !text-center">
              <h3 class="fact-header !mb-4">1/3</h3>
              <p class="fact-text">of your life is spent sleeping - that's about 26 years for the average person.</p>
            </div>

            <!-- Fact 2 -->
            <div class="fact-item !text-center">
              <h3 class="fact-header !mb-4">4-6</h3>
              <p class="fact-text">dreams per night on average, though most are forgotten within minutes of waking.</p>
            </div>

            <!-- Fact 3 -->
            <div class="fact-item !text-center">
              <h3 class="fact-header !mb-4">12%</h3>
              <p class="fact-text">of people dream entirely in black and white, while the rest dream in full color.</p>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- Footer Section -->
    <footer class="footer-section !py-8 md:!py-16 !px-4 lg:!px-8">
      <div class="footer-container !max-w-6xl !mx-auto">
        <!-- Footer Header -->
        <h2 ref="footerHeader" class="footer-header !text-center !mb-8 md:!mb-16">Track your sleep. Decode your dreams.</h2>
        
        <!-- Footer Links -->
        <div class="footer-links !grid !grid-cols-1 md:!grid-cols-3 !gap-4 md:!gap-8 !text-center">
          
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
import { ref, onMounted } from 'vue'
import { animate, stagger } from 'animejs'

// Template refs for animations
const heroText = ref(null)
const card1 = ref(null)
const card2 = ref(null)
const card3 = ref(null)
const bannerHeader = ref(null)
const didYouKnowIcon = ref(null)
const footerHeader = ref(null)

// Logo continuous floating animation - Never stops
const startLogoFloating = () => {
  const logo = document.querySelector('.hero-logo')
  console.log('Logo found:', logo)
  if (!logo) return
  
  // Continuous sine wave animation
  let startTime = Date.now()
  
  const continuousFloat = () => {
    const elapsed = (Date.now() - startTime) / 3000 // Time in seconds
    const amplitude = 5 // How high/low it goes (5px)
    const frequency = 1 // How fast it oscillates (adjust for speed)
    
    // Calculate smooth sine wave position
    const yPosition = Math.sin(elapsed * frequency * 2 * Math.PI) * amplitude
    
    // Apply transform directly for smooth continuous movement
    logo.style.transform = `translateY(${yPosition}px)`
    
    // Continue the animation
    requestAnimationFrame(continuousFloat)
  }
  
  // Start floating immediately
  setTimeout(() => {
    continuousFloat()
  }, 1000)
}

// Intersection Observer for scroll animations
const createScrollObserver = (element, animationCallback) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animationCallback()
          observer.unobserve(entry.target) // Only animate once
        }
      })
    },
    {
      threshold: 0.01, // Trigger when 1% of element is visible
      rootMargin: '0px 0px -10px 0px' // Start animation 100px before element comes into view
    }
  )
  
  if (element) {
    observer.observe(element)
  }
}

// Fun hover animations for circles and did-you-know icon
const setupHoverAnimations = () => {
  // Feature card circle hover animations
  const circles = document.querySelectorAll('.icon-circle')
  
  circles.forEach((circle) => {
    const icon = circle.querySelector('img')
    
    circle.addEventListener('mouseenter', () => {
      // Bounce and rotate the circle
      animate(circle, {
        scale: 1.1,
        rotate: '360deg',
        duration: 600,
        ease: 'spring(1, 80, 10, 0)'
      })
      
      // Pulse the icon inside
      animate(icon, {
        scale: [1, 1.2, 1],
        duration: 400,
        ease: 'out(2)'
      })
    })
    
    circle.addEventListener('mouseleave', () => {
      // Return to normal
      animate(circle, {
        scale: 1,
        rotate: '0deg',
        duration: 400,
        ease: 'out(2)'
      })
      
      animate(icon, {
        scale: 1,
        duration: 300,
        ease: 'out(2)'
      })
    })
  })
  
  // Did You Know icon hover animation
  if (didYouKnowIcon.value) {
    didYouKnowIcon.value.addEventListener('mouseenter', () => {
      animate(didYouKnowIcon.value, {
        scale: 1.15,
        rotate: '10deg',
        duration: 300,
        ease: 'out(2)'
      })
    })
    
    didYouKnowIcon.value.addEventListener('mouseleave', () => {
      animate(didYouKnowIcon.value, {
        scale: 1,
        rotate: '0deg',
        duration: 400,
        ease: 'spring(1, 80, 10, 0)'
      })
    })
  }
}

onMounted(() => {
  // Start logo floating animation
   startLogoFloating()

  // Hero Text Animation - Simple slide up and fade in
  if (heroText.value) {
    // Set initial state
    animate(heroText.value, {
      opacity: 0,
      y: 40,
      duration: 0
    })
    
    // Animate on load (since hero is immediately visible)
    setTimeout(() => {
      animate(heroText.value, {
        opacity: 1,
        y: 0,
        duration: 800,
        ease: 'out(3)'
      })
    }, 500)
  }

  // Feature Cards Animation - Slide up with stagger
  const animateCards = () => {
    const cards = [card1.value, card2.value, card3.value].filter(Boolean)
    
    // Set initial state
    animate(cards, {
      opacity: 0,
      y: 60,
      scale: 0.9,
      duration: 0
    })
    
    // Animate in sequence
    animate(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 400,
      ease: 'out(2)',
      delay: stagger(100)
    })
    
    // Setup hover animations after cards are visible
    setTimeout(() => {
      setupHoverAnimations()
    }, 800)
  }
  
  // Set up scroll observer for cards
  if (card1.value) {
    createScrollObserver(card1.value, animateCards)
  }

  // Banner Header Animation - Simple slide up
  const animateBannerHeader = () => {
    if (bannerHeader.value) {
      // Set initial state
      animate(bannerHeader.value, {
        opacity: 0,
        y: 40,
        duration: 0
      })
      
      // Animate
      animate(bannerHeader.value, {
        opacity: 1,
        y: 0,
        duration: 700,
        ease: 'out(3)'
      })
    }
  }
  
  if (bannerHeader.value) {
    createScrollObserver(bannerHeader.value, animateBannerHeader)
  }

  // Did You Know Icon Animation - Bounce in
  const animateDidYouKnowIcon = () => {
    if (didYouKnowIcon.value) {
      // Set initial state
      animate(didYouKnowIcon.value, {
        opacity: 0,
        scale: 0,
        rotate: -180,
        duration: 0
      })
      
      // Animate
      animate(didYouKnowIcon.value, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 800,
        ease: 'spring(1, 80, 10, 0)'
      })
    }
  }
  
  if (didYouKnowIcon.value) {
    createScrollObserver(didYouKnowIcon.value, animateDidYouKnowIcon)
  }

  // Footer Header Animation - Simple slide up
  const animateFooterHeader = () => {
    if (footerHeader.value) {
      // Set initial state
      animate(footerHeader.value, {
        opacity: 0,
        y: 30,
        duration: 0
      })
      
      // Animate
      animate(footerHeader.value, {
        opacity: 1,
        y: 0,
        duration: 600,
        ease: 'out(2)'
      })
    }
  }
  
  if (footerHeader.value) {
    createScrollObserver(footerHeader.value, animateFooterHeader)
  }
})
</script>

<style scoped>
/* All your existing styles remain the same... */
/* HERO SECTION STYLES */
.hero-section {
  min-height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
}

.hero-logo {
  width: 16rem !important; 
  height: 16rem !important;
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
  ) !important;
}

.hero-text {
  font-size: var(--font-size-base) !important;
  color: var(--color-text-light) !important;
}

.cta-button {
  background-color: var(--color-gold) !important;
  color: var(--color-midnight) !important;
  font-family: var(--font-sans) !important;
  font-size: var(--font-size-base) !important;
}

.cta-button:hover {
  background-color: var(--color-lavender) !important;
}

/* FEATURES SECTION STYLES */
.features-section {
  background-color: var(--color-background) !important; /* midnight background continues */
}

/* Feature Cards */
.feature-card {
  background-color: var(--color-lavender) !important;
  transition: transform 0.3s ease !important;
}

.feature-card:hover {
  transform: translateY(-8px) !important;
}

/* Icon Circles */
.icon-circle {
  background-color: var(--color-midnight) !important;
  cursor: pointer !important;
  transition: box-shadow 0.3s ease !important;
}

.icon-circle:hover {
  box-shadow: 0 8px 25px rgba(131, 135, 195, 0.3) !important; /* lavender glow */
}

/* Card Typography */
.card-header {
  font-family: var(--font-serif) !important; /* Alice for headers */
  font-size: var(--font-size-sm) !important;
  color: var(--color-midnight) !important;
  font-weight: 600 !important;
}

.card-text {
  font-family: var(--font-sans) !important; /* Anuphan for body text */
  font-size: var(--font-size-xs) !important;
  color: var(--color-midnight) !important;
  line-height: 1.6 !important;
}

/* BANNER SECTION STYLES */
.banner-section {
  background-color: var(--color-background) !important; /* midnight background continues */
  overflow: hidden !important;
}

/* Banner Header */
.banner-header {
  font-family: var(--font-serif) !important; /* Alice for headers */
  font-size: var(--font-size-xl) !important;
  color: var(--color-text-light) !important; /* cream text */
  font-weight: 600 !important;
}

/* Facts Content with Gradient Background */
.facts-content {
  background: linear-gradient(
    to right,
    rgba(58, 62, 108, 0.35) 0%,    /* --color-deep-purple with 35% opacity */
    rgba(58, 62, 108, 0.35) 50%,   /* --color-deep-purple with 35% opacity */
    rgba(224, 197, 143, 0.35) 100% /* --color-gold with 35% opacity */
  ) !important;
}

/* Fact Typography */
.fact-header {
  font-family: var(--font-serif) !important; /* Alice for headers */
  font-size: var(--font-size-lg) !important;
  color: var(--color-text-light) !important; /* cream text */
  font-weight: 600 !important;
}

.fact-text {
  font-family: var(--font-sans) !important; /* Anuphan for body text */
  font-size: var(--font-size-sm) !important;
  color: var(--color-text-light) !important; /* cream text */
  line-height: 1.6 !important;
}

/* Scattered Background Icons - positioned relative to facts-content */
.scattered-icon {
  position: absolute !important;
  width: 2rem !important;
  height: 2rem !important;
  opacity: 0.2 !important;
  z-index: 1 !important;
}

/* Icon Positions - Mobile (relative to facts-content div) */
.moon-1 { top: 20% !important; left: 10% !important; }
.cloud-1 { top: 50% !important; right: 15% !important; }
.star-1 { top: 75% !important; left: 20% !important; }

/* Did You Know Icon - positioned at bottom center of facts content */
.did-you-know-icon {
  position: absolute !important;
  bottom: -17% !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 1.5rem !important;
  height: 2rem !important;
  z-index: 5 !important;
  cursor: pointer !important;
  transition: filter 0.3s ease !important;
}

.did-you-know-icon:hover {
  filter: drop-shadow(0 4px 8px rgba(224, 197, 143, 0.4)) !important; /* gold glow */
}

/* FOOTER SECTION STYLES */
.footer-section {
  background-color: var(--color-background) !important; /* midnight background continues */
}

/* Footer Header */
.footer-header {
  font-family: var(--font-serif) !important; /* Alice for headers */
  font-size: var(--font-size-base) !important;
  color: var(--color-text-light) !important; /* cream text */
  font-weight: 600 !important;
}

/* Footer Text */
.footer-text {
  font-family: var(--font-sans) !important; /* Anuphan for body text */
  font-size: var(--font-size-xs) !important;
  color: var(--color-text-light) !important; /* cream text */
  line-height: 1.6 !important;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .hero-section {
    min-height: 130vh !important;
  }
  
  .hero-logo {
    width: 16rem !important;
    height: 16rem !important;
  }
  
  .hero-text {
    font-size: var(--font-size-base) !important;
  }
  
  .cta-button {
    font-size: var(--font-size-base) !important;
  }
  
  .card-header {
    font-size: var(--font-size-base) !important;
  }
  
  .card-text {
    font-size: var(--font-size-xs) !important;
  }
  
  .banner-header {
    font-size: var(--font-size-2xl) !important;
  }
  
  .fact-header {
    font-size: var(--font-size-xl) !important;
  }
  
  .fact-text {
    font-size: var(--font-size-base) !important;
  }
  
  .footer-header {
    font-size: var(--font-size-lg) !important;
  }
  
  .footer-text {
    font-size: var(--font-size-sm) !important;
  }
  
    /* Adjust icon positions for larger screens */
  .scattered-icon {
    width: 2.5rem !important;
    height: 2.5rem !important;
  }
  
  .star-1 { top: 15% !important; left: 8% !important; }
  .cloud-1 { top: 20% !important; right: 5% !important; }
  .moon-1 { top: 70% !important; left: 43% !important; }

   /* Larger did-you-know icon on desktop */
  .did-you-know-icon {
    width: 9rem !important;
    height: 6rem !important;
  }
  
}

@media (min-width: 1024px) {
  .hero-section {
    min-height: 140vh !important;
  }
  
  .hero-logo {
    width: 20rem !important;
    height: 20rem !important;
  }
}
</style>