import React from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import './EventCard.css'

const EventCard = ({ onYes, onNo, showError, noButtonDisabled }) => {
  // Spring animation for card shimmer effect
  const shimmerSpring = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 3000 },
    loop: true
  })

  // Button hover animations
  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -3,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  const cardVariants = {
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div
      className="event-card"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {/* Shimmer effect */}
      <animated.div
        className="card-shimmer"
        style={shimmerSpring}
      />
      
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Our 6 Month Anniversary
      </motion.h1>
      
      <motion.p
        className="subtitle"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        A special celebration awaits us ✨
      </motion.p>
      
      <motion.div
        className="event-details"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          You're Invited to Something Special
        </motion.h2>
        
        <div className="event-info">
          <motion.div
            className="date"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            📅 <strong>July 1st, 2025</strong>
          </motion.div>
          <motion.div
            className="time"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            🕖 <strong>7:30 PM</strong>
          </motion.div>
          <motion.div
            className="location"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            📍 <strong>JOEY Uptown</strong>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        className="buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
      >
        <motion.button
          className="btn btn-yes"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onYes}
        >
          <span className="btn-text">Yes! 💕</span>
          <div className="btn-sparkles">
            {[...Array(6)].map((_, i) => (
              <span key={i} className={`sparkle sparkle-${i + 1}`}>✨</span>
            ))}
          </div>
        </motion.button>
        
        <motion.button
          className={`btn btn-no ${noButtonDisabled ? 'disabled' : ''}`}
          variants={buttonVariants}
          whileHover={!noButtonDisabled ? "hover" : {}}
          whileTap={!noButtonDisabled ? "tap" : {}}
          onClick={onNo}
          disabled={noButtonDisabled}
        >
          <span className="btn-text">No</span>
        </motion.button>
      </motion.div>
      
      <motion.div
        className={`error-message ${showError ? 'show' : ''}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showError ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        Wrong answer, try again! There's no other option than yes! 😊
      </motion.div>
    </motion.div>
  )
}

export default EventCard 