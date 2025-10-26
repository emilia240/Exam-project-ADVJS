export function useLogoAnimations() {
    // Logo continuous floating animation - Never stops
    const startLogoFloating = () => {
        console.log('🌙 Starting logo floating animation')
        
        const logo = document.querySelector('.hero-logo')
        console.log('🌙 Logo found:', logo)
        if (!logo) return
        
        // Continuous sine wave animation
        let startTime = Date.now()
        
        const continuousFloat = () => {
            const elapsed = (Date.now() - startTime) / 1000 // Time in seconds
            const amplitude = 10 // How high/low it goes (10px)
            const frequency = 0.5 // How fast it oscillates
            
            // Calculate smooth sine wave position
            const yPosition = Math.sin(elapsed * frequency * 2 * Math.PI) * amplitude
            
            // Apply transform directly for smooth continuous movement
            logo.style.transform = `translateY(${yPosition}px)`
            
            // Continue the animation
            requestAnimationFrame(continuousFloat)
        }
        
        // Start floating immediately
        setTimeout(() => {
            console.log('✅ Logo floating animation started')
            continuousFloat()
        }, 1000)
    }

    return {
        startLogoFloating
    }
}