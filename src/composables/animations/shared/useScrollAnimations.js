export function useScrollAnimations() {
    // Intersection Observer for scroll animations
    const createScrollObserver = (element, animationCallback) => {
        console.log('👁️ Creating scroll observer for element')
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log('👁️ Element is visible, triggering animation')
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
            console.log('✅ Scroll observer attached to element')
        }
    }

    return {
        createScrollObserver
    }
}