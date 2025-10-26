import { ref } from 'vue'
import { animate, stagger } from 'animejs'
import { useScrollAnimations } from './shared/useScrollAnimations'

export function useHomeAnimations() {
    // Import shared scroll functionality
    const { createScrollObserver } = useScrollAnimations()
    
    // Template refs for animations
    const heroText = ref(null)
    const card1 = ref(null)
    const card2 = ref(null)
    const card3 = ref(null)
    const bannerHeader = ref(null)
    const didYouKnowIcon = ref(null)
    const footerHeader = ref(null)

    // Fun hover animations for circles and did-you-know icon
    const setupHoverAnimations = () => {
        console.log('🎭 Setting up hover animations')
        
        // Feature card circle hover animations
        const circles = document.querySelectorAll('.icon-circle')
        
        circles.forEach((circle) => {
            const icon = circle.querySelector('img')
            
            circle.addEventListener('mouseenter', () => {
                console.log('🎭 Circle hover enter')
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
                console.log('🎭 Circle hover leave')
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
                console.log('🎭 Did You Know icon hover enter')
                animate(didYouKnowIcon.value, {
                    scale: 1.15,
                    rotate: '10deg',
                    duration: 300,
                    ease: 'out(2)'
                })
            })
            
            didYouKnowIcon.value.addEventListener('mouseleave', () => {
                console.log('🎭 Did You Know icon hover leave')
                animate(didYouKnowIcon.value, {
                    scale: 1,
                    rotate: '0deg',
                    duration: 400,
                    ease: 'spring(1, 80, 10, 0)'
                })
            })
        }
        
        console.log('✅ Hover animations setup complete')
    }

    // Hero Text Animation - Simple slide up and fade in
    const animateHeroText = () => {
        console.log('🎬 Starting hero text animation')
        
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
                console.log('✅ Hero text animation completed')
            }, 500)
        }
    }

    // Feature Cards Animation - Slide up with stagger (ORIGINAL VERSION)
    const animateCards = () => {
        console.log('🎬 Starting cards stagger animation')
        
        const cards = [card1.value, card2.value, card3.value].filter(Boolean)
        
        if (cards.length > 0) {
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
            
            console.log('✅ Cards animation completed')
        }
    }

    // Banner Header Animation - Simple slide up (ORIGINAL VERSION)
    const animateBannerHeader = () => {
        console.log('🎬 Starting banner header animation')
        
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
            
            console.log('✅ Banner header animation completed')
        }
    }

    // Did You Know Icon Animation - Bounce in (ORIGINAL VERSION)
    const animateIcon = () => {
        console.log('🎬 Starting icon animation')
        
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
            
            console.log('✅ Icon animation completed')
        }
    }

    // Footer Header Animation - Simple slide up (ORIGINAL VERSION)
    const animateFooterHeader = () => {
        console.log('🎬 Starting footer header animation')
        
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
            
            console.log('✅ Footer header animation completed')
        }
    }

    // Initialize all scroll-triggered animations (ORIGINAL LOGIC)
    const initializeScrollAnimations = () => {
        console.log('🔄 Initializing all scroll animations')
        
        // Set up scroll observer for cards
        if (card1.value) {
            createScrollObserver(card1.value, animateCards)
        }

        // Banner Header scroll observer
        if (bannerHeader.value) {
            createScrollObserver(bannerHeader.value, animateBannerHeader)
        }

        // Did You Know Icon scroll observer
        if (didYouKnowIcon.value) {
            createScrollObserver(didYouKnowIcon.value, animateIcon)
        }

        // Footer Header scroll observer
        if (footerHeader.value) {
            createScrollObserver(footerHeader.value, animateFooterHeader)
        }
        
        console.log('✅ All scroll animations initialized')
    }

    return {
        // Template refs
        heroText,
        card1,
        card2,
        card3,
        bannerHeader,
        didYouKnowIcon,
        footerHeader,
        
        // Animation functions
        animateHeroText,
        animateCards,
        animateBannerHeader,
        animateIcon,
        animateFooterHeader,
        initializeScrollAnimations,
        createScrollObserver,
        setupHoverAnimations
    }
}