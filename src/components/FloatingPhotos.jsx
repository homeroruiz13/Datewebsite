import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import './FloatingPhotos.css'

const FloatingPhotos = () => {
  // Import all the user's photos
  const photos = [
    'IMG_1346.HEIC',
    'IMG_1392.JPG',
    'IMG_1553.JPG',
    'IMG_1588.JPG',
    'IMG_1598.JPG',
    'IMG_1605.JPG',
    'IMG_1631.JPG',
    'IMG_1672.HEIC',
    'IMG_1693.HEIC',
    'IMG_1857.HEIC',
    'IMG_1937.HEIC',
    'IMG_2054.HEIC',
    'IMG_2085.HEIC',
    'IMG_2110.JPG',
    'IMG_2130.JPG',
    'IMG_2228.HEIC'
  ]

  // Select 15 random photos for floating
  const [selectedPhotos, setSelectedPhotos] = useState([])

  useEffect(() => {
    // Adjust number of photos based on screen size
    const isMobile = window.innerWidth <= 768
    const photoCount = isMobile ? 10 : 16 // More photos for fuller background
    
    // Shuffle and select photos
    const shuffled = [...photos].sort(() => 0.5 - Math.random())
    setSelectedPhotos(shuffled.slice(0, photoCount))
  }, [])

  // Generate random positions and animations with better distribution
  const generateRandomPosition = (index) => {
    const isMobile = window.innerWidth <= 768
    const centerArea = isMobile ? 40 : 30 // Avoid center area where content is
    
    let top, left
    
    // Try to avoid the center area where the main content is
    do {
      top = Math.random() * 85 + 5 // Keep some margin from edges
      left = Math.random() * 85 + 5
    } while (
      top > (50 - centerArea/2) && top < (50 + centerArea/2) &&
      left > (50 - centerArea/2) && left < (50 + centerArea/2)
    )
    
    return {
      top: top + '%',
      left: left + '%',
      animationDelay: `${index * 0.7}s`,
      animationDuration: `${7 + Math.random() * 4}s`
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const hoverVariants = {
    scale: 1.2,
    rotate: 15,
    transition: { duration: 0.3 }
  }

  return (
    <div className="floating-photos-container">
      {selectedPhotos.map((photo, index) => {
        const position = generateRandomPosition(index)
        
        return (
          <motion.div
            key={`${photo}-${index}`}
            className="floating-photo"
            style={{
              top: position.top,
              left: position.left,
              zIndex: Math.floor(Math.random() * 5) + 3
            }}
            variants={floatingVariants}
            whileHover={hoverVariants}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.7, 0.7, 0.7, 0],
              scale: [0, 1, 1, 1, 0.8],
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
          >
            <div className="photo-frame">
              <img
                src={`/${photo}`}
                alt={`Memory ${index + 1}`}
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  e.target.style.display = 'none'
                  e.target.parentElement.classList.add('placeholder')
                }}
              />
              <div className="photo-glow"></div>
            </div>
          </motion.div>
        )
      })}
      

    </div>
  )
}

export default FloatingPhotos 