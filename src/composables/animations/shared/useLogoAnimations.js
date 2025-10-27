export function useLogoAnimations() {
    // Logo continuous floating animation - For Hero Section on home page
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


    // Logo pulsing animation - For Dashboard 
    const startLogoPulsing = (logoElement) => {
        console.log('💓 Starting logo pulsing animation')
        
        if (!logoElement) {
            console.warn('⚠️ No logo element provided for pulsing')
            return
        }
        
        let startTime = Date.now()
        
        const pulse = () => {
            const elapsed = (Date.now() - startTime) / 1000
            const scale = 1 + Math.sin(elapsed * 2) * 0.1 // Pulse between 0.9 and 1.1
            
            logoElement.style.transform = `scale(${scale})`
            
            requestAnimationFrame(pulse)
        }
        
        setTimeout(() => {
            console.log('✅ Logo pulsing animation started')
            pulse()
        }, 500)
    }

    return {
        startLogoFloating,
        startLogoPulsing
    }
}