import { ref } from 'vue'
import { animate, stagger } from 'animejs'
import { useScrollAnimations } from './shared/useScrollAnimations'

export function useSleepLogListAnimations() {
    // Import shared scroll functionality
    const { createScrollObserver } = useScrollAnimations()
    
    // Template refs for animations
    const sleepLogCards = ref([])

    // All Sleep Log Cards Animation - Same pattern as HomeView feature cards
    const animateAllLogCards = () => {
        console.log('🎬 Starting all sleep log cards stagger animation')
        
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
            
            console.log('✅ All sleep log cards animation completed')
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

    // Initialize all scroll-triggered animations for SleepLogListView
    const initializeSleepLogListAnimations = () => {
        console.log('🔄 Initializing sleep log list animations')
        
        // Set up scroll observer for sleep logs section
        const sleepLogsSection = document.querySelector('.sleep-logs-section')
        if (sleepLogsSection) {
            createScrollObserver(sleepLogsSection, () => {
                animateAllLogCards()
                // Setup hover animations after cards are animated
                setTimeout(() => {
                    setupCardHoverAnimations()
                }, 600)
            })
        }
        
        console.log('✅ All sleep log list animations initialized')
    }

    return {
        // Template refs
        sleepLogCards,
        
        // Animation functions
        animateAllLogCards,
        setupCardHoverAnimations,
        initializeSleepLogListAnimations
    }
}