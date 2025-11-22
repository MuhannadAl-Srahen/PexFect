interface DesignComparisonProps {
  originalDesign?: string // Made optional
  userResult?: string // Made optional
  keyDifferences: string[]
}

export function DesignComparison({
  originalDesign,
  userResult,
  keyDifferences
}: DesignComparisonProps) {
  return (
    <div className='bg-card border border-border rounded-2xl p-6 mb-6'>
      <h3 className='text-xl font-bold text-foreground mb-2'>Design Comparison</h3>
      <p className='text-muted-foreground mb-6'>
        Side-by-side comparison with the original design
      </p>

      <div className='grid md:grid-cols-2 gap-6 mb-4'>
        {/* Original Design */}
        <div>
          <h4 className='font-semibold text-foreground mb-3'>Original Design</h4>
          <div className='bg-muted rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-border'>
            {originalDesign ? (
              <img 
                src={originalDesign} 
                alt="Original design" 
                className="w-full h-full object-cover rounded-lg" 
              />
            ) : (
              <div className='text-center text-muted-foreground'>
                <div className='w-16 h-16 bg-muted-foreground/20 rounded-lg mx-auto mb-2 flex items-center justify-center'>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className='text-sm'>Original Design Preview</p>
                <p className='text-xs text-muted-foreground/70 mt-1'>No image provided</p>
              </div>
            )}
          </div>
        </div>

        {/* Your Result */}
        <div>
          <h4 className='font-semibold text-foreground mb-3'>Your Result</h4>
          <div className='bg-muted rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-border '>
            {userResult ? (
              <img 
                src={userResult} 
                alt="Your implementation" 
                className="w-full h-full object-cover rounded-lg" 
              />
            ) : (
              <div className='text-center text-muted-foreground'>
                <div className='w-16 h-16 bg-muted-foreground/20 rounded-lg mx-auto mb-2 flex items-center justify-center'>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className='text-sm'>Your Implementation</p>
                <p className='text-xs text-muted-foreground/70 mt-1'>Upload solution image</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Differences  */}
      {keyDifferences.length > 0 && (
        <div>
          <h4 className='font-semibold text-foreground mb-3'>Key Differences</h4>
          <div className='bg-muted/50 rounded-lg p-4 border border-border/50'>
            <p className='text-sm text-muted-foreground mb-3 italic'>
              Note: Image comparison is not performed by AI. Manual comparison suggested.
            </p>
            <ul className='space-y-2'>
              {keyDifferences.map((difference, index) => (
                <li key={index} className='text-sm text-muted-foreground flex items-start'>
                  <span className='text-orange-400 mr-2'>•</span>
                  {difference}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}