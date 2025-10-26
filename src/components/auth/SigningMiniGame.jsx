import React, { useState, useEffect, useRef } from 'react'
import { PenTool, CheckCircle, RotateCcw, Target } from 'lucide-react'

const SigningMiniGame = ({ formData, onGameComplete, gameCompleted }) => {
  const [gameState, setGameState] = useState('ready') // ready, playing, completed
  const [signaturePosition, setSignaturePosition] = useState({ x: 50, y: 200 })
  const [targetPosition, setTargetPosition] = useState({ x: 200, y: 150 })
  const [isDragging, setIsDragging] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isInTarget, setIsInTarget] = useState(false)
  
  const canvasRef = useRef(null)
  const gameAreaRef = useRef(null)

  // Game completion effect
  useEffect(() => {
    if (gameCompleted && onGameComplete) {
      onGameComplete(true)
    }
  }, [gameCompleted, onGameComplete])

  // Timer countdown
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('completed')
    }
  }, [gameState, timeLeft])

  // Check if signature is in target
  useEffect(() => {
    const distance = Math.sqrt(
      Math.pow(signaturePosition.x - targetPosition.x, 2) + 
      Math.pow(signaturePosition.y - targetPosition.y, 2)
    )
    
    const wasInTarget = isInTarget
    const nowInTarget = distance < 40
    
    if (nowInTarget && !wasInTarget) {
      setIsInTarget(true)
      setScore(prev => prev + 10)
    } else if (!nowInTarget && wasInTarget) {
      setIsInTarget(false)
    }
  }, [signaturePosition, targetPosition, isInTarget])

  const startGame = () => {
    setGameState('playing')
    setTimeLeft(30)
    setScore(0)
    setSignaturePosition({ x: 50, y: 200 })
    setTargetPosition({ 
      x: Math.random() * 300 + 100, 
      y: Math.random() * 200 + 100 
    })
  }

  const resetGame = () => {
    setGameState('ready')
    setScore(0)
    setTimeLeft(30)
    setSignaturePosition({ x: 50, y: 200 })
    setIsInTarget(false)
  }

  const handleMouseDown = (e) => {
    if (gameState !== 'playing') return
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || gameState !== 'playing') return
    
    const rect = gameAreaRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setSignaturePosition({ x, y })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const completeGame = () => {
    setGameState('completed')
    if (onGameComplete) {
      onGameComplete(true)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Quick Signing Challenge</h3>
        <p className="text-[#A7E3B5]">Drag your signature to the target via WhatsApp</p>
      </div>

      {/* Game Stats */}
      {gameState === 'playing' && (
        <div className="flex justify-between items-center mb-4 p-3 bg-[#1a1f2e]/50 rounded-lg border border-[#A7E3B5]/30">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-[#A7E3B5]" />
            <span className="text-white font-semibold">Score: {score}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">{timeLeft}s</span>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="relative w-full h-80 bg-gradient-to-br from-[#1a1f2e] to-[#10131A] rounded-lg border border-[#A7E3B5]/30 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Document Background */}
        <div className="absolute inset-4 bg-white/5 rounded border border-[#A7E3B5]/20">
          <div className="p-4">
            <div className="text-xs text-[#A7E3B5] mb-2">Agreement Document</div>
            <div className="text-sm text-white mb-4">
              This agreement is between {formData.businessName || 'Your Company'} and the client...
            </div>
            <div className="border-b border-[#A7E3B5]/30 pb-2">
              <div className="text-xs text-[#A7E3B5]">Signature Line:</div>
            </div>
          </div>
        </div>

        {/* Target Zone */}
        {gameState === 'playing' && (
          <div
            className={`absolute w-20 h-12 rounded-lg border-2 transition-all duration-300 ${
              isInTarget 
                ? 'border-[#A7E3B5] bg-[#A7E3B5]/20 shadow-lg shadow-[#A7E3B5]/25' 
                : 'border-[#A7E3B5] bg-[#A7E3B5]/10'
            }`}
            style={{
              left: targetPosition.x - 40,
              top: targetPosition.y - 24
            }}
          >
            <div className="flex items-center justify-center h-full">
              <Target className={`w-6 h-6 ${isInTarget ? 'text-[#A7E3B5]' : 'text-[#A7E3B5]'}`} />
            </div>
          </div>
        )}

        {/* Signature */}
        {gameState === 'playing' && (
          <div
            className={`absolute w-16 h-8 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all duration-200 ${
              isInTarget 
                ? 'border-[#A7E3B5] bg-[#A7E3B5]/20 shadow-lg shadow-[#A7E3B5]/25' 
                : 'border-[#A7E3B5] bg-[#A7E3B5]/20'
            }`}
            style={{
              left: signaturePosition.x - 32,
              top: signaturePosition.y - 16
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center justify-center h-full">
              <PenTool className={`w-4 h-4 ${isInTarget ? 'text-[#A7E3B5]' : 'text-[#A7E3B5]'}`} />
            </div>
          </div>
        )}

        {/* Game States */}
        {gameState === 'ready' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1f2e]/80 backdrop-blur-sm">
            <div className="text-center">
              <Target className="w-12 h-12 text-[#A7E3B5] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Ready to Sign?</h4>
              <p className="text-sm text-[#A7E3B5] mb-4">Drag your signature to the target zone</p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-[#A7E3B5] to-[#7dd87d] text-[#10131A] font-semibold px-6 py-2 rounded-lg hover:from-[#7dd87d] hover:to-[#A7E3B5] transition-all duration-200"
              >
                Start Challenge
              </button>
            </div>
          </div>
        )}

        {gameState === 'completed' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1f2e]/80 backdrop-blur-sm">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-[#A7E3B5] mx-auto mb-4 animate-bounce" />
              <h4 className="text-xl font-bold text-white mb-2">Signature Complete!</h4>
              <p className="text-sm text-[#A7E3B5] mb-4">Final Score: {score}</p>
              <div className="space-x-2">
                <button
                  onClick={completeGame}
                  className="bg-gradient-to-r from-[#A7E3B5] to-[#7dd87d] text-[#10131A] font-semibold px-6 py-2 rounded-lg hover:from-[#7dd87d] hover:to-[#A7E3B5] transition-all duration-200"
                >
                  Continue
                </button>
                <button
                  onClick={resetGame}
                  className="bg-[#A7E3B5] text-[#10131A] font-semibold px-6 py-2 rounded-lg hover:bg-[#A7E3B5]/80 transition-all duration-200"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-[#A7E3B5]/10 px-4 py-2 rounded-full border border-[#A7E3B5]/20">
          <PenTool className="w-4 h-4 text-[#A7E3B5]" />
          <span className="text-[#A7E3B5] text-sm font-medium">
            {gameState === 'ready' && 'Click to start your first digital signing!'}
            {gameState === 'playing' && 'Drag the signature to the target zone'}
            {gameState === 'completed' && 'You just completed your first digital signing!'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SigningMiniGame
