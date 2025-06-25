import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated, useSpringValue, useTransition } from '@react-spring/web'
import Confetti from 'react-confetti'
import FloatingPhotos from './components/FloatingPhotos'
import EventCard from './components/EventCard'
import SuccessModal from './components/SuccessModal'
import ParticleBackground from './components/ParticleBackground'
import './App.css'

function App() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [noButtonDisabled, setNoButtonDisabled] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  // Spring animations for the main container
  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.8) translateY(50px)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0px)' },
    config: { tension: 280, friction: 60, mass: 1 }
  })

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleYes = () => {
    setShowSuccess(true)
    setShowConfetti(true)
    
    // Stop confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false)
    }, 5000)
  }

  const handleNo = () => {
    setShowError(true)
    setNoButtonDisabled(true)
    
    // Hide error message after 3 seconds
    setTimeout(() => {
      setShowError(false)
    }, 3000)
  }

  const closeSuccess = () => {
    setShowSuccess(false)
    setShowConfetti(false)
  }

  return (
    <div className="app">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Floating Photos Background */}
      <FloatingPhotos />
      
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#ffd700', '#ff69b4', '#ff4500', '#00ff00', '#ff1493', '#00bfff', '#fff8dc']}
        />
      )}

      {/* Main Content */}
      <animated.div style={containerSpring} className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <EventCard
            onYes={handleYes}
            onNo={handleNo}
            showError={showError}
            noButtonDisabled={noButtonDisabled}
          />
        </motion.div>
      </animated.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessModal onClose={closeSuccess} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App 