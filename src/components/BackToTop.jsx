import React, { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-sealia-mint to-sealia-green text-sealia-forest p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6 group-hover:animate-bounce" />
        </button>
      )}
    </>
  )
}

export default BackToTop


