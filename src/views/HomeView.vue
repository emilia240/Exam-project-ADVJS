<template>
  <main class="min-h-screen">

    <HeroSection 
      ref="heroSection"
    />

    <FeaturesSection 
      ref="featuresSection"
    />
    
    <BannerSection 
      ref="bannerSection"
    />


    <FooterSection 
      ref="footerSection"
    />

  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useHomeAnimations } from '@/composables/animations/useHomeAnimations';
import { useLogoAnimations } from '@/composables/animations/shared/useLogoAnimations';
import HeroSection from '@/components/home/HeroSection.vue';
import FeaturesSection from '@/components/home/FeaturesSection.vue';
import BannerSection from '@/components/home/BannerSection.vue';
import FooterSection from '@/components/home/FooterSection.vue';

// Component refs
const heroSection = ref(null)
const featuresSection = ref(null)
const bannerSection = ref(null)
const footerSection = ref(null)

// IMPORT ALL ANIMATION LOGIC
const {
  animateHeroText,
  initializeScrollAnimations
} = useHomeAnimations()


const { startLogoFloating } = useLogoAnimations();

onMounted(() => {
  // Start logo floating
  startLogoFloating()
  
  // Animate hero text immediately (always visible) - pass the actual element
  animateHeroText(heroSection.value?.heroText)
  
  // Initialize ALL scroll-triggered animations (handles everything else)
  // Pass the component refs to the animation composable
  initializeScrollAnimations({
    heroText: heroSection.value?.heroText,
    card1: featuresSection.value?.card1,
    card2: featuresSection.value?.card2,
    card3: featuresSection.value?.card3,
    bannerHeader: bannerSection.value?.bannerHeader,
    didYouKnowIcon: bannerSection.value?.didYouKnowIcon,
    footerHeader: footerSection.value?.footerHeader
  })
})
</script>

<style scoped>

</style>