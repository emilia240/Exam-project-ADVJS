import { ref } from 'vue'
import { animate } from 'animejs'
import { useRouter } from 'vue-router'
import { useTransition } from './shared/useTransition'


export function useLoginAnimations() {
    const router = useRouter()
    const { showLoadingOverlay } = useTransition()

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

    // Success transition animation
    const handleSuccessTransition = () => {
        console.log('🎬 Starting success transition animations')
        
        // Step 1: Animate success message in (if it exists)
        if (successMessage.value) {
            console.log('🎬 Animating success message')
            animate(successMessage.value, {
                scale: [0.8, 1.1, 1],
                opacity: [0, 1],
                duration: 600,
                ease: 'spring(1, 80, 10, 0)'
            })
        }

        // Step 2: Wait 1.5s, then start exit animation
        setTimeout(() => {
            console.log('🎬 Starting exit animation')
            // Fade out the login card
            animate(loginCard.value, {
                opacity: 0,
                scale: 0.9,
                y: -30,
                duration: 300,
                ease: 'out(2)',
                complete: () => {
                    console.log('✅ Exit animation complete, showing loading overlay')
                    // Step 3: Use shared loading overlay function
                    showLoadingOverlay('Loading Dashboard...', '/dashboard', router)
                }
            })
        }, 1500)
    }

   

    return {
        // Template refs (to be assigned in component)
        loginCard,
        successMessage,
        logoRef,
        
        // Animation functions
        startEntranceAnimations,
        animateLogo,
        handleSuccessTransition,

    }
}