import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import './SuccessModal.css'

const SuccessModal = ({ onClose }) => {
  // Create floating hearts effect
  useEffect(() => {
    const createFloatingHearts = () => {
      const heartsContainer = document.querySelector('.floating-hearts')
      if (!heartsContainer) return

      const hearts = ['💖', '💕', '💗', '💝', '💘', '💞', '❤️', '💜', '💛', '🧡']
      
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const heart = document.createElement('div')
          heart.className = 'floating-heart'
          heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)]
          heart.style.left = Math.random() * 100 + '%'
          heart.style.animationDuration = (2 + Math.random() * 3) + 's'
          heart.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem'
          
          heartsContainer.appendChild(heart)
          
          setTimeout(() => {
            if (heart.parentNode) {
              heart.parentNode.removeChild(heart)
            }
          }, 5000)
        }, i * 200)
      }
    }

    const createFireworks = () => {
      const fireworksContainer = document.querySelector('.fireworks-container')
      if (!fireworksContainer) return

      const colors = ['#ffd700', '#ff69b4', '#ff4500', '#00ff00', '#ff1493', '#00bfff', '#fff8dc', '#ff6347']
      
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const firework = document.createElement('div')
          firework.className = 'firework'
          firework.style.left = Math.random() * 100 + '%'
          firework.style.top = Math.random() * 100 + '%'
          firework.style.background = colors[Math.floor(Math.random() * colors.length)]
          firework.style.animationDelay = Math.random() * 2 + 's'
          
          fireworksContainer.appendChild(firework)
          
          setTimeout(() => {
            if (firework.parentNode) {
              firework.parentNode.removeChild(firework)
            }
          }, 3000)
        }, i * 100)
      }
    }

    createFloatingHearts()
    createFireworks()
  }, [])

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  }

  const modalVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.5, 
      rotateY: -90,
      y: 100 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      y: 0,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 300,
        duration: 0.8
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.5, 
      rotateY: 90,
      y: -100,
      transition: { duration: 0.4 } 
    }
  }

  const titleVariants = {
    initial: { opacity: 0, y: -50, scale: 0.5 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        delay: 0.5,
        type: "spring",
        damping: 10,
        stiffness: 200
      } 
    }
  }

  const subtitleVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.8,
        duration: 0.6
      } 
    }
  }

  const pulseAnimation = useSpring({
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.05)' },
    config: { duration: 1000 },
    loop: { reverse: true }
  })

  return (
    <motion.div
      className="success-overlay"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="success-modal"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background decorations */}
        <div className="floating-hearts"></div>
        <div className="fireworks-container"></div>
        
        {/* Animated background elements */}
        <div className="modal-decorations">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`decoration decoration-${i + 1}`}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.h1
          className="success-title"
          variants={titleVariants}
        >
          <animated.span style={pulseAnimation}>
            I love you Abigail! 💖
          </animated.span>
        </motion.h1>
        
        <motion.p
          className="success-subtitle"
          variants={subtitleVariants}
        >
          Can't wait to celebrate with you! ✨
        </motion.p>

        <motion.div
          className="success-details"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="celebration-text">
            <p>🎉 Get ready for an amazing evening! 🎉</p>
            <p>💕 Six months of wonderful memories 💕</p>
            <p>🌟 And many more to come! 🌟</p>
          </div>
        </motion.div>

        <motion.button
          className="close-btn"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          Close 💕
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default SuccessModal 