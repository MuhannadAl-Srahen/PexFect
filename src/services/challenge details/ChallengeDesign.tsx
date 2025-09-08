import { useState } from 'react'
import { Type, Monitor, Palette } from 'lucide-react'
import type { Challenge } from '@/types'

interface ChallengeDesignProps {
  challenge: Challenge
}

export function ChallengeDesign({ challenge }: ChallengeDesignProps) {
  const { designSpecs } = challenge
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [copiedFont, setCopiedFont] = useState<boolean>(false)

  const handleColorCopy = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const handleFontCopy = () => {
    const fontString = `${designSpecs.typography.primaryFont}, ${designSpecs.typography.fallbackFonts}`
    navigator.clipboard.writeText(fontString)
    setCopiedFont(true)
    setTimeout(() => setCopiedFont(false), 2000)
  }

  return (
    <div className='space-y-6 md:space-y-8'>
      {/* Typography Section - Full Width */}
      <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
        <div className='flex items-center px-4 md:px-6'>
          <div className='p-2 bg-primary/10 rounded-lg mr-3'>
            <Type className='h-4 w-4 md:h-6 md:w-6 text-primary' />
          </div>
          <div>
            <h3 className='text-base md:text-xl font-bold text-foreground'>
              Typography
            </h3>
            <p className='text-xs md:text-sm text-muted-foreground'>
              Font families, sizes, and weights
            </p>
          </div>
        </div>

        <div className='px-4 md:px-6 space-y-4 md:space-y-6'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4'>
            {/* Font Family */}
            <div className='bg-background rounded-xl p-3 md:p-4 border border-border'>
              <h4 className='font-semibold text-foreground mb-3 flex items-center text-sm md:text-base'>
                <span className='w-2 h-2 bg-primary rounded-full mr-2'></span>
                Font Family
              </h4>
              <div
                className='bg-background rounded-xl p-3 md:p-4 cursor-pointer transition-all duration-300 group'
                onClick={handleFontCopy}
              >
                <div className='flex items-center justify-between mb-2 md:mb-3'>
                  <div className='flex items-center space-x-2 md:space-x-3'>
                    <div className='w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                      <span className='text-primary font-bold text-sm md:text-lg'>
                        Aa
                      </span>
                    </div>
                  </div>
                  <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <span className='text-xs text-primary font-medium'>
                      {copiedFont ? '✓ Copied!' : 'Copy'}
                    </span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <p className='font-mono text-sm md:text-lg text-foreground font-semibold'>
                    {designSpecs.typography.primaryFont}
                  </p>
                  <div className='flex items-center space-x-2 text-xs md:text-sm'>
                    <span className='text-muted-foreground'>Fallback:</span>
                    <code className='bg-muted/30 text-muted-foreground px-2 py-1 rounded text-xs'>
                      {designSpecs.typography.fallbackFonts}
                    </code>
                  </div>
                </div>
              </div>
            </div>
            {/* Font Sizes */}
            <div className='bg-background rounded-xl p-3 md:p-4 border border-border'>
              <h4 className='font-semibold text-foreground mb-3 flex items-center text-sm md:text-base'>
                <span className='w-2 h-2 bg-primary rounded-full mr-2'></span>
                Font Sizes
              </h4>
              <div className='space-y-2'>
                {Object.entries(designSpecs.typography.fontSizes).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className='flex justify-between items-center py-1 md:py-2'
                    >
                      <span className='capitalize text-muted-foreground text-xs md:text-sm'>
                        {key}
                      </span>
                      <code className='bg-primary/10 text-primary px-2 py-1 rounded text-xs font-mono'>
                        {value}
                      </code>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Font Weights */}
            <div className='bg-background rounded-xl p-3 md:p-4 border border-border'>
              <h4 className='font-semibold text-foreground mb-3 flex items-center text-sm md:text-base'>
                <span className='w-2 h-2 bg-primary rounded-full mr-2'></span>
                Font Weights
              </h4>
              <div className='space-y-2'>
                {Object.entries(designSpecs.typography.fontWeights).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className='flex justify-between items-center py-1 md:py-2'
                    >
                      <span className='capitalize text-muted-foreground text-xs md:text-sm'>
                        {key}
                      </span>
                      <code className='bg-primary/10 text-primary px-2 py-1 rounded text-xs font-mono'>
                        {value}
                      </code>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakpoints and Spacing - Side by Side */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Breakpoints Section */}
        <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
          <div className='flex items-center px-4 md:px-6'>
            <div className='p-2 bg-primary/10 rounded-lg mr-3'>
              <Monitor className='h-4 w-4 md:h-6 md:w-6 text-primary' />
            </div>
            <div>
              <h3 className='text-base md:text-xl font-bold text-foreground'>
                Breakpoints
              </h3>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Responsive design breakpoints
              </p>
            </div>
          </div>

          <div className='px-4 md:px-6'>
            <div className='space-y-3'>
              {Object.entries(designSpecs.breakpoints).map(
                ([device, range]) => (
                  <div
                    key={device}
                    className='bg-background rounded-xl p-3 md:p-4 border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
                  >
                    <div className='flex items-center justify-between mb-2'>
                      <span className='capitalize font-semibold text-foreground text-sm md:text-base'>
                        {device}
                      </span>
                      <div className='w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary'></div>
                    </div>
                    <div className='text-xs md:text-sm font-mono text-muted-foreground'>
                      {range}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Spacing Guidelines */}
        <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
          <div className='flex items-center px-4 md:px-6'>
            <div className='p-2 bg-primary/10 rounded-lg mr-3'>
              <div className='h-4 w-4 md:h-6 md:w-6 text-primary flex items-center justify-center'>
                <div className='grid grid-cols-2 gap-1'>
                  <div className='w-1.5 h-1.5 bg-primary rounded-sm'></div>
                  <div className='w-1.5 h-1.5 bg-primary rounded-sm'></div>
                  <div className='w-1.5 h-1.5 bg-primary rounded-sm'></div>
                  <div className='w-1.5 h-1.5 bg-primary rounded-sm'></div>
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-base md:text-xl font-bold text-foreground'>
                Spacing Guidelines
              </h3>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Consistent spacing values
              </p>
            </div>
          </div>

          <div className='px-4 md:px-6'>
            <div className='space-y-3'>
              {Object.entries(designSpecs.spacing).map(([key, value]) => (
                <div
                  key={key}
                  className='bg-background rounded-xl p-3 md:p-4 border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2 md:space-x-3'>
                      <div className='w-2 h-2 md:w-3 md:h-3 bg-primary rounded-sm'></div>
                      <span className='font-medium text-foreground capitalize text-sm md:text-base'>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <code className='bg-primary/10 text-primary px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-mono'>
                      {value}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Color Palette - Beautiful Grid Design */}
      <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
        <div className='flex items-center px-4 md:px-6'>
          <div className='p-2 bg-primary/10 rounded-lg mr-3'>
            <Palette className='h-4 w-4 md:h-6 md:w-6 text-primary' />
          </div>
          <div>
            <h3 className='text-base md:text-xl font-bold text-foreground'>
              Color Palette
            </h3>
            <p className='text-xs md:text-sm text-muted-foreground'>
              Click any color to copy hex value
            </p>
          </div>
        </div>

        <div className='px-4 md:px-6'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
            {Object.entries(designSpecs.colorPalette).map(([name, color]) => (
              <div
                key={name}
                className='group relative cursor-pointer'
                onClick={() => handleColorCopy(color)}
              >
                <div
                  className='w-full h-24 md:h-32 rounded-xl shadow-md transition-all duration-300 border border-border/20 group-hover:scale-105 group-hover:shadow-lg'
                  style={{ backgroundColor: color }}
                />
                <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='bg-white text-gray-800 text-xs px-2 py-1 rounded-full shadow-lg'>
                    {copiedColor === color ? '✓ Copied' : 'Copy'}
                  </div>
                </div>
                <div className='mt-3 text-left'>
                  <h4 className='text-sm font-semibold text-foreground capitalize'>
                    {name.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <code className='text-xs font-mono text-muted-foreground mt-1 block'>
                    {color}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
