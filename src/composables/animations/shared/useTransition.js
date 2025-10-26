import { animate } from 'animejs'

export function useTransition() {
    
    // Loading overlay animation - can be used between any page transitions
    const showLoadingOverlay = (text = 'Loading...', redirectPath = null, router = null) => {
        console.log('🎬 Creating and animating loading overlay with text:', text)
        
        // Create loading overlay element
        const overlay = document.createElement('div')
        overlay.className = 'loading-overlay'
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p class="loading-text">${text}</p>
            </div>
        `
        
        // Add styles for the overlay
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background-color: rgba(10, 17, 35, 0.95);
            backdrop-filter: blur(8px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
        `
        
        // Style the content
        const content = overlay.querySelector('.loading-content')
        content.style.cssText = `
            text-align: center;
            color: var(--color-text-light);
            font-family: var(--font-sans);
        `
        
        // Style the spinner
        const spinner = overlay.querySelector('.loading-spinner')
        spinner.style.cssText = `
            width: 3rem;
            height: 3rem;
            border: 3px solid rgba(224, 197, 143, 0.3);
            border-top: 3px solid var(--color-gold);
            border-radius: 50%;
            margin: 0 auto 1rem auto;
            animation: spin 1s linear infinite;
        `
        
        // Add keyframe animation for spinner
        if (!document.querySelector('#spinner-styles')) {
            const style = document.createElement('style')
            style.id = 'spinner-styles'
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `
            document.head.appendChild(style)
        }
        
        document.body.appendChild(overlay)
        
        // Animate overlay in
        animate(overlay, {
            opacity: [0, 1],
            duration: 400,
            ease: 'out(2)',
            complete: () => {
                console.log('✅ Loading overlay animation complete')
                
                // If redirect path and router provided, navigate after delay
                if (redirectPath && router) {
                    setTimeout(() => {
                        console.log('🔄 Navigating to:', redirectPath)
                        router.push(redirectPath)
                    }, 2000)
                }
            }
        })
        
        return overlay // Return reference in case caller wants to remove it manually
    }
    
    // Remove loading overlay
    const hideLoadingOverlay = () => {
        console.log('🎬 Hiding loading overlay')
        const overlay = document.querySelector('.loading-overlay')
        if (overlay) {
            animate(overlay, {
                opacity: 0,
                duration: 300,
                ease: 'out(2)',
                complete: () => {
                    overlay.remove()
                    console.log('✅ Loading overlay removed')
                }
            })
        }
    }
    
    // Page transition fade out
    const fadeOutPage = (element, callback) => {
        console.log('🎬 Starting page fade out')
        animate(element, {
            opacity: 0,
            scale: 0.95,
            duration: 300,
            ease: 'out(2)',
            complete: () => {
                console.log('✅ Page fade out complete')
                if (callback) callback()
            }
        })
    }
    
    // Page transition fade in
    const fadeInPage = (element) => {
        console.log('🎬 Starting page fade in')
        animate(element, {
            opacity: [0, 1],
            scale: [0.95, 1],
            duration: 400,
            ease: 'out(2)',
            complete: () => {
                console.log('✅ Page fade in complete')
            }
        })
    }

    return {
        showLoadingOverlay,
        hideLoadingOverlay,
        fadeOutPage,
        fadeInPage
    }
}