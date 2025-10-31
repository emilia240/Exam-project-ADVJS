import { ref } from 'vue'
import { animate, stagger } from 'animejs'
import { useScrollAnimations } from './shared/useScrollAnimations'

export function useDashboardAnimations() {
    // Import shared scroll functionality
    const { createScrollObserver } = useScrollAnimations()
    
    // Template refs for animations
    const recentLogsCards = ref([])

    // Welcome Title Animation - Same as HomeView hero text
    const animateWelcomeTitle = (welcomeTitleElement) => {
        console.log('🎬 Starting welcome title animation')
        
        if (welcomeTitleElement) {
            // Set initial state
            animate(welcomeTitleElement, {
                opacity: 0,
                y: 40,
                duration: 0
            })
            
            // Animate on load (since welcome is immediately visible)
            setTimeout(() => {
                animate(welcomeTitleElement, {
                    opacity: 1,
                    y: 0,
                    duration: 800,
                    ease: 'out(3)'
                })
                console.log('✅ Welcome title animation completed')
            }, 500)
        }
    }

    // Recent Sleep Log Cards Animation - Same as HomeView feature cards
    const animateRecentLogCards = () => {
        console.log('🎬 Starting recent log cards stagger animation')
        
        // Get all sleep log cards
        const cards = document.querySelectorAll('.sleep-log-card')
        const cardArray = Array.from(cards)
        
        if (cardArray.length > 0) {
            // Set initial state
            animate(cardArray, {
                opacity: 0,
                y: 60,
                scale: 0.9,
                duration: 0
            })
            
            // Animate in sequence with stagger
            animate(cardArray, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 400,
                ease: 'out(2)',
                delay: stagger(100) // 100ms delay between each card
            })
            
            console.log('✅ Recent log cards animation completed')
        }
    }

    // Setup hover animations for sleep log cards
    const setupCardHoverAnimations = () => {
        console.log('🎭 Setting up sleep log card hover animations')
        
        const cards = document.querySelectorAll('.sleep-log-card')
        
        cards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                console.log('🎭 Sleep log card hover enter')
                animate(card, {
                    scale: 1.02,
                    duration: 300,
                    ease: 'out(2)'
                })
            })
            
            card.addEventListener('mouseleave', () => {
                console.log('🎭 Sleep log card hover leave')
                animate(card, {
                    scale: 1,
                    duration: 300,
                    ease: 'out(2)'
                })
            })
        })
        
        console.log('✅ Card hover animations setup complete')
    }

    // Initialize all scroll-triggered animations
    const initializeDashboardAnimations = (welcomeTitleElement) => {
        console.log('🔄 Initializing dashboard animations')
        
        // Animate welcome title immediately (always visible)
        animateWelcomeTitle(welcomeTitleElement)
        
        // Set up scroll observer for recent log cards section
        const recentLogsSection = document.querySelector('.recent-logs-section')
        if (recentLogsSection) {
            createScrollObserver(recentLogsSection, () => {
                animateRecentLogCards()
                // Setup hover animations after cards are animated
                setTimeout(() => {
                    setupCardHoverAnimations()
                }, 600)
            })
        }
        
        console.log('✅ All dashboard animations initialized')
    }

    return {
        // Template refs
        recentLogsCards,
        
        // Animation functions
        animateWelcomeTitle,
        animateRecentLogCards,
        setupCardHoverAnimations,
        initializeDashboardAnimations
    }
}