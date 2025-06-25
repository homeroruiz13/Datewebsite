import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './ParticleBackground.css'

const ParticleBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const particles = []
    
    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 3 + 1
        this.opacity = Math.random() * 0.3 + 0.1
        this.color = this.getRandomColor()
        this.life = Math.random() * 200 + 100
        this.maxLife = this.life
      }

      getRandomColor() {
        const colors = [
          'rgba(255, 215, 0, ',
          'rgba(255, 182, 193, ',
          'rgba(255, 240, 220, ',
          'rgba(245, 230, 168, '
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life--

        // Fade out as life decreases
        this.opacity = (this.life / this.maxLife) * 0.3

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Respawn when life ends
        if (this.life <= 0) {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.life = this.maxLife
        }
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color + this.opacity + ')'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  return (
    <div className="particle-background">
      <canvas
        ref={canvasRef}
        className="particle-canvas"
      />
      
      {/* Additional CSS-based particles for variety */}
      <div className="css-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="css-particle"
            style={{
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ParticleBackground 