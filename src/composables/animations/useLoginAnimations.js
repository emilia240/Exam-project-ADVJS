import { ref } from 'vue'
import { animate } from 'animejs'
import { useRouter } from 'vue-router'


export function useLoginAnimations() {
    const router = useRouter()

    // Template refs
    const loginCard = ref(null)
    const successMessage = ref(null)
    const logoRef = ref(null)

    // Entrance animations when component mounts
    const startEntranceAnimations = () => {
  
        console.log('🎬 Starting login entrance animations')
        
        // Set initial states (invisible)
        if (loginCard.value) {
            animate(loginCard.value, {
                opacity: 0,
                y: 80,
                scale: 0.9,
                duration: 0
            })
        }
        
        if (logoRef.value) {
            animate(logoRef.value, {
                opacity: 0,
                scale: 0.8,
                rotate: -10,
                duration: 0
            })
        }
        
        // Start entrance sequence
        setTimeout(() => {
            console.log('🎬 Animating login card entrance')
            // Step 1: Card swipes up from below
            animate(loginCard.value, {
                opacity: [0, 1],
                y: [80, 0],
                scale: [0.9, 1],
                duration: 800,
                ease: 'out(3)',
                complete: () => {
                    console.log('✅ Card animation complete, starting logo animation')
                    // Step 2: Logo wiggles after card appears
                    animateLogo()
                }
            })
        }, 200)
    }

    // Logo animation
    const animateLogo = () => {
        console.log('🎬 Animating logo wiggle')
        // Logo fade in and wiggle sequence
        animate(logoRef.value, {
            opacity: [0, 1],
            scale: [0.8, 1.1, 1],
            rotate: [-10, 5, -3, 0],
            duration: 1000,
            ease: 'spring(1, 80, 10, 0)'
        })
        console.log('✅ Logo animation started')
    }

    
    return {
        // Template refs (to be assigned in component)
        loginCard,
        successMessage,
        logoRef,
        
        // Animation functions
        startEntranceAnimations,
        animateLogo,

    }
}