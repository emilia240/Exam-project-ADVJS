<template>
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
</template>

<script setup>
import { ref } from 'vue'

// Create the refs
const footerHeader = ref(null)

// Define template refs for parent to access
defineExpose({
  footerHeader
})
</script>

<style scoped>
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
  .footer-header {
    font-size: var(--font-size-lg);
  }
  
  .footer-text {
    font-size: var(--font-size-sm);
  }
}
</style>