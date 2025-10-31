export function showToast(message, duration = 2500) {
    // Create container if it doesn't exist
    let container = document.getElementById('toast-container')
    if (!container) {
        container = document.createElement('div')
        container.id = 'toast-container'
        container.style.position = 'fixed'
        container.style.top = '20px'
        container.style.left = '50%'
        container.style.transform = 'translateX(-50%)'
        container.style.zIndex = '9999'
        container.style.display = 'flex'
        container.style.flexDirection = 'column'
        container.style.gap = '12px'
        document.body.appendChild(container)
    }

    // Create toast element
    const toast = document.createElement('div')
    
    // Set all styles inline for reliability
    toast.style.backgroundColor = '#E0C58F' // sand color
    toast.style.color = '#0A1123' // midnight color
    toast.style.fontFamily = 'var(--font-sans)'
    toast.style.fontSize = 'var(--font-size-sm)'
    toast.style.fontWeight = '500'
    toast.style.minWidth = '300px'
    toast.style.padding = '16px 24px'
    toast.style.borderRadius = '8px'
    toast.style.border = '1px solid #D4B570'
    toast.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    toast.style.textAlign = 'center'
    
    // Initial state - hidden above
    toast.style.transform = 'translateY(-100px)'
    toast.style.opacity = '0'
    toast.style.transition = 'all 0.4s ease-out'
    
    // Set message
    toast.textContent = message

    // Add to container
    container.appendChild(toast)

    // Trigger slide-in animation from top
    setTimeout(() => {
        toast.style.transform = 'translateY(0)'
        toast.style.opacity = '1'
    }, 50)

    // Auto remove after duration
    setTimeout(() => {
        // Fade out to top
        toast.style.transform = 'translateY(-100px)'
        toast.style.opacity = '0'
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast)
            }
            
            // Remove container if no more toasts
            if (container.children.length === 0) {
                document.body.removeChild(container)
            }
        }, 400) // Wait for animation to complete
    }, duration)
}