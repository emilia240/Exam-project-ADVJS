import { animate, stagger } from 'animejs'
import { useScrollAnimations } from './shared/useScrollAnimations'

export function useHomeAnimations() {
    // Import shared scroll functionality
    const { createScrollObserver } = useScrollAnimations()
    

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
    const animateHeroText = (heroTextElement) => {
        console.log('🎬 Starting hero text animation')
        
        if (heroTextElement) {
            // Set initial state
            animate(heroTextElement, {
                opacity: 0,
                y: 40,
                duration: 0
            })
            
            // Animate on load (since hero is immediately visible)
            setTimeout(() => {
                animate(heroTextElement, {
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
    const animateCards = (card1Element, card2Element, card3Element) => {
        console.log('🎬 Starting cards stagger animation')

        const cards = [card1Element, card2Element, card3Element].filter(Boolean)

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

    // Banner Header Animation - Simple slide up
    const animateBannerHeader = (bannerHeaderElement) => {
        console.log('🎬 Starting banner header animation')
        
        if (bannerHeaderElement) {
            // Set initial state
            animate(bannerHeaderElement, {
                opacity: 0,
                y: 40,
                duration: 0
            })
            
            // Animate
            animate(bannerHeaderElement, {
                opacity: 1,
                y: 0,
                duration: 700,
                ease: 'out(3)'
            })
            
            console.log('✅ Banner header animation completed')
        }
    }

    // Did You Know Icon Animation - Bounce in
    const animateIcon = (iconElement) => {
        console.log('🎬 Starting icon animation')
        
        if (iconElement) {
            // Set initial state
            animate(iconElement, {
                opacity: 0,
                scale: 0,
                rotate: -180,
                duration: 0
            })
            
            // Animate
            animate(iconElement, {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 800,
                ease: 'spring(1, 80, 10, 0)'
            })
            
            console.log('✅ Icon animation completed')
        }
    }

    // Footer Header Animation - Simple slide up
    const animateFooterHeader = (footerHeaderElement) => {
        console.log('🎬 Starting footer header animation')
        
        if (footerHeaderElement) {
            // Set initial state
            animate(footerHeaderElement, {
                opacity: 0,
                y: 30,
                duration: 0
            })
            
            // Animate
            animate(footerHeaderElement, {
                opacity: 1,
                y: 0,
                duration: 600,
                ease: 'out(2)'
            })
            
            console.log('✅ Footer header animation completed')
        }
    }

    // Initialize all scroll-triggered animations
    const initializeScrollAnimations = (elements) => {
        console.log('🔄 Initializing all scroll animations')
        
          // Set up scroll observer for cards
        if (elements.card1) {
            createScrollObserver(elements.card1, () => {
                animateCards(elements.card1, elements.card2, elements.card3)
            })
        }

        // Banner Header scroll observer
        if (elements.bannerHeader) {
            createScrollObserver(elements.bannerHeader, () => {
                animateBannerHeader(elements.bannerHeader)
            })
        }

        // Did You Know Icon scroll observer
        if (elements.didYouKnowIcon) {
            createScrollObserver(elements.didYouKnowIcon, () => {
                animateIcon(elements.didYouKnowIcon)
            })
        }

        // Footer Header scroll observer
        if (elements.footerHeader) {
            createScrollObserver(elements.footerHeader, () => {
                animateFooterHeader(elements.footerHeader)
            })
        }
        
        console.log('✅ All scroll animations initialized')
    }

    return {
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