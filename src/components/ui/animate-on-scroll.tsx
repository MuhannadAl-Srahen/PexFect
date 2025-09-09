'use client'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface AnimateOnScrollProps {
  children: ReactNode
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideLeft'
    | 'slideRight'
    | 'scale'
    | 'stagger'
  delay?: number
  duration?: number
  className?: string
}

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  stagger: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
}

export function AnimateOnScroll({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  className,
}: AnimateOnScrollProps) {
  const variant = animationVariants[animation]

  return (
    <motion.div
      initial={variant.initial}
      whileInView={variant.animate}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: {
  children: ReactNode
  staggerDelay?: number
  className?: string
}) {
  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  animation = 'slideUp',
  className,
}: {
  children: ReactNode
  animation?: 'slideUp' | 'slideLeft' | 'slideRight' | 'scale'
  className?: string
}) {
  const variants = {
    slideUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  }

  return (
    <motion.div
      variants={variants[animation]}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
