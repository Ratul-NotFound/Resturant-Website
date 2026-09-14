'use client'

import React, { useEffect, useRef } from 'react'

interface FlameParticlesProps {
  className?: string
  density?: number
}

export default function FlameParticles({ className = '', density = 25 }: FlameParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.height = canvas.parentElement?.clientHeight || 400
    }

    window.addEventListener('resize', handleResize)

    interface Particle {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
      alpha: number
      decay: number
    }

    const colors = ['#C8102E', '#F4A61D', '#FF5722', '#FFC107', '#FF9800']
    const particles: Particle[] = []

    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 1.5 + 0.5),
        alpha: Math.random() * 0.8 + 0.2,
        decay: Math.random() * 0.008 + 0.003,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay

        if (p.alpha <= 0 || p.y < 0) {
          p.x = Math.random() * width
          p.y = height + Math.random() * 20
          p.alpha = Math.random() * 0.8 + 0.2
          p.vy = -(Math.random() * 1.5 + 0.5)
        }

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60 ${className}`}
    />
  )
}
