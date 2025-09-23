'use client'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useScroll, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  )
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    { stiffness: 500, damping: 90 }
  )

  return (
    <motion.div
      ref={ref}
      className={cn('relative mx-auto h-full w-full max-w-4xl', className)}
    >
      <div className='absolute top-3 left-4 md:left-1/2 md:-translate-x-1/2  '>
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? 'none'
                : 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
          className='border-primary bg-background flex h-5 w-5 items-center justify-center rounded-full border shadow-sm'
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? 'white' : '#3b82f6',
              borderColor: scrollYProgress.get() > 0 ? 'white' : '#2563eb',
            }}
            className='h-2 w-2 rounded-full border border-blue-500 bg-blue-500'
          />
        </motion.div>

        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width='20'
          height={svgHeight}
          className='block'
          aria-hidden='true'
        >
          <motion.path
            d={`M 10 0 L 10 ${svgHeight}`}
            fill='none'
            stroke='#2563eb'
            strokeOpacity='0.16'
            strokeWidth='1'
          />
          <motion.path
            d={`M 10 0 L 10 ${svgHeight}`}
            fill='none'
            stroke='url(#gradient)'
            strokeWidth='1.5'
            className='motion-reduce:hidden'
          />
          <defs>
            <motion.linearGradient
              id='gradient'
              gradientUnits='userSpaceOnUse'
              x1='0'
              x2='0'
              y1={y1}
              y2={y2}
            >
              <stop stopColor='#18CCFC' stopOpacity='0'></stop>
              <stop stopColor='#18CCFC'></stop>
              <stop offset='0.325' stopColor='#3b82f6'></stop>
              <stop offset='1' stopColor='#2563eb' stopOpacity='0'></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef} className='mt-8 flex flex-col gap-12 md:block'>
        {React.Children.map(children, (child) => (
          <div className='md:block md:pl-0 pl-16'>{child}</div>
        ))}
      </div>
    </motion.div>
  )
}



