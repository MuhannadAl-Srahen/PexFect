import { useState } from 'react'
import { ChevronDown, ChevronRight, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FeedbackSection } from '../types'

interface ExpandableSectionProps {
  section: FeedbackSection
  icon?: React.ReactNode
}

interface FeedbackItem {
  text: string
  type: 'success' | 'warning' | 'error' | 'info'
}

export function ExpandableSection({ section, icon }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Convert feedback items to categorized items with proper icons
  const getCategorizedFeedback = (): FeedbackItem[] => {
    const items: FeedbackItem[] = []
    
    // Add success items (what you did well)
    section.whatYouDidWell?.forEach((item: string) => {
      items.push({ text: item, type: 'success' })
    })
    
    // Add warning items (areas for improvement)
    section.areasForImprovement?.forEach((item: string) => {
      items.push({ text: item, type: 'warning' })
    })
    
    // Add error items 
    section.criticalIssues?.forEach((item: string) => {
      items.push({ text: item, type: 'error' })
    })
    
    // Add info items 
    section.specificFeedback?.forEach((item: string) => {
      items.push({ text: item, type: 'info' })
    })
    
    return items
  }

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className='w-4 h-4 text-green-500' />
      case 'warning':
        return <AlertTriangle className='w-4 h-4 text-orange-400' />
      case 'error':
        return <XCircle className='w-4 h-4 text-red-600' />
      case 'info':
        return <Info className='w-4 h-4 text-blue-500' />
      default:
        return <Info className='w-4 h-4 text-gray-500' />
    }
  }

  const getCountByType = (items: FeedbackItem[], type: string) => {
    return items.filter(item => item.type === type).length
  }

  const categorizedFeedback = getCategorizedFeedback()

  return (
    <div className='bg-card border border-border/50 rounded-2xl overflow-hidden mb-4 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary/20 group'>
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full p-4 md:p-6 text-left hover:bg-muted/50 transition-colors duration-200'
      >
        {/* Desktop Layout (keep as is) */}
        <div className='hidden md:flex items-center justify-between'>
          <div className='flex items-center space-x-4 flex-1'>
            {icon && <div className='text-muted-foreground group-hover:text-primary transition-colors duration-300'>{icon}</div>}
            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-foreground group-hover:text-primary mb-1 transition-colors duration-300'>{section.title}</h3>          
              <p className='text-sm text-muted-foreground'>{section.description}</p>
            </div>
          </div>
          
          <div className='flex items-center space-x-6'>
            {/* Feedback Summary Badges */}
            <div className='flex items-center space-x-2'>
              {getCountByType(categorizedFeedback, 'success') > 0 && (
                <div className='flex items-center bg-green-50 text-green-800 px-2 py-1 rounded-full text-xs'>
                  <CheckCircle className='w-3 h-3 mr-1' />
                  {getCountByType(categorizedFeedback, 'success')}
                </div>
              )}
              {getCountByType(categorizedFeedback, 'warning') > 0 && (
                <div className='flex items-center bg-orange-50 text-orange-400 px-2 py-1 rounded-full text-xs'>
                  <AlertTriangle className='w-3 h-3 mr-1' />
                  {getCountByType(categorizedFeedback, 'warning')}
                </div>
              )}
              {getCountByType(categorizedFeedback, 'error') > 0 && (
                <div className='flex items-center bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs'>
                  <XCircle className='w-3 h-3 mr-1' />
                  {getCountByType(categorizedFeedback, 'error')}
                </div>
              )}
              {getCountByType(categorizedFeedback, 'info') > 0 && (
                <div className='flex items-center bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-xs'>
                  <Info className='w-3 h-3 mr-1' />
                  {getCountByType(categorizedFeedback, 'info')}
                </div>
              )}
            </div>
            
            {/* Expand/Collapse Icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? (
                <ChevronDown className='w-5 h-5 text-muted-foreground' />
              ) : (
                <ChevronRight className='w-5 h-5 text-muted-foreground' />
              )}
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout - Three lines */}
        <div className='flex flex-col space-y-3 md:hidden'>
          {/* Line 1: Title + Expand Icon */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              {icon && <div className='text-muted-foreground group-hover:text-primary transition-colors duration-300'>{icon}</div>}
              <h3 className='text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300'>{section.title}</h3>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? (
                <ChevronDown className='w-5 h-5 text-muted-foreground' />
              ) : (
                <ChevronRight className='w-5 h-5 text-muted-foreground' />
              )}
            </motion.div>
          </div>

          {/* Line 2: Subtitle */}
          <div className='pl-8'>
            <p className='text-sm text-muted-foreground'>{section.description}</p>
          </div>

          {/* Line 3: getFeedbackIcon */}
          <div className='flex items-center space-x-3 pl-8'>
            {getCountByType(categorizedFeedback, 'success') > 0 && (
                <div className='flex items-center bg-green-50 text-green-800 px-2 py-1 rounded-full text-xs'>
                  <CheckCircle className='w-3 h-3 mr-1' />
                  {getCountByType(categorizedFeedback, 'success')}
                </div>
              )}
              {getCountByType(categorizedFeedback, 'warning') > 0 && (
                <div className='flex items-center bg-orange-50 text-orange-400 px-2 py-1 rounded-full text-xs'>
                  <AlertTriangle className='w-3 h-3 mr-1' />
                  {getCountByType(categorizedFeedback, 'warning')}
                </div>
              )}
              {getCountByType(categorizedFeedback, 'error') > 0 && (
                <div className='flex items-center bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs'>
                  <XCircle className='w-3 h-3 mr-1' />
                  {getCountByType(categorizedFeedback, 'error')}
                </div>
              )}
             {getCountByType(categorizedFeedback, 'info') > 0 && (
                <div className='flex items-center bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-xs'>
                  <Info className='w-3 h-3 mr-1' />
                  {getCountByType(categorizedFeedback, 'info')}
                </div>
              )}
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <div className='px-6 pb-6 border-t border-border'>
              <div className='pt-6'>
                {/* Categorized Feedback List */}
                <div className='space-y-3'>
                  {categorizedFeedback.map((item, index) => (
                    <div key={index} className='flex items-start space-x-3'>
                      {getFeedbackIcon(item.type)}
                      <span className='text-sm text-muted-foreground flex-1'>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}