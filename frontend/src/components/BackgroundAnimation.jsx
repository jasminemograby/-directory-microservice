import React, { useEffect, useRef } from 'react'

const BackgroundAnimation = () => {
  const particlesRef = useRef(null)

  useEffect(() => {
    const particlesContainer = particlesRef.current
    if (!particlesContainer) return

    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      
      // Random position and animation delay
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 20 + 's'
      particle.style.animationDuration = (Math.random() * 10 + 15) + 's'
      
      particlesContainer.appendChild(particle)
      
      // Remove particle after animation completes
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, 25000)
    }

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(createParticle, i * 1000)
    }

    // Create new particles periodically
    const interval = setInterval(createParticle, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {/* Animated Background */}
      <div className="bg-animation" />
      
      {/* Floating Particles */}
      <div ref={particlesRef} className="particles" />
    </>
  )
}

export default BackgroundAnimation
