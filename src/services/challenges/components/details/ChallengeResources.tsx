import { Badge } from '@/components/ui/badge'
import { Video, FileText, BookOpen, Wrench, Play } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { Challenge } from '@/types/challenge'

interface ChallengeResourcesProps {
  challenge: Challenge
}

export function ChallengeResources({ challenge }: ChallengeResourcesProps) {
  const { resources } = challenge

  return (
    <div className='space-y-6 md:space-y-8'>
      {/* Video Tutorials - Featured Section */}
      <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm'>
        <div className='flex items-center px-4 md:px-6'>
          <div className='p-1.5 md:p-2 bg-primary/10 rounded-lg mr-2 md:mr-3'>
            <Video className='h-4 w-4 md:h-6 md:w-6 text-primary' />
          </div>
          <div>
            <h3 className='text-sm md:text-xl font-bold text-foreground'>
              Video Tutorials
            </h3>
            <p className='text-xs md:text-sm text-muted-foreground'>
              Step-by-step visual guides
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 px-4 md:px-6'>
          {resources.videos.map((video, index) => (
            <div
              key={index}
              className='bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border group'
            >
              <div className='aspect-video bg-muted relative overflow-hidden'>
                <img
                  src={video.thumbnail || '/placeholder.svg'}
                  alt={video.title}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                  <Link
                    to={video.url}
                    className='w-10 h-10 md:w-14 md:h-14 bg-primary rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110'
                  >
                    <Play className='h-5 w-5 md:h-7 md:w-7 text-primary-foreground ml-0.5 md:ml-1' />
                  </Link>
                </div>
                <div className='absolute bottom-2 md:bottom-3 right-2 md:right-3 bg-black/80 text-white text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full font-medium'>
                  {video.duration}
                </div>
              </div>
              <div className='p-3 md:p-4'>
                <h4 className='font-semibold text-foreground mb-1 md:mb-2 line-clamp-1 text-sm md:text-base'>
                  {video.title}
                </h4>
                <p className='text-xs md:text-sm text-muted-foreground mb-2 md:mb-4 line-clamp-2'>
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8'>
        {/* Reading Materials */}
        <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm'>
          <div className='flex items-center px-4 md:px-6'>
            <div className='p-1.5 md:p-2 bg-primary/10 rounded-lg mr-2 md:mr-3'>
              <BookOpen className='h-4 w-4 md:h-6 md:w-6 text-primary' />
            </div>
            <div>
              <h3 className='text-sm md:text-xl font-bold text-foreground'>
                Reading Materials
              </h3>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Reference materials and tutorials
              </p>
            </div>
          </div>

          <div className='space-y-2 md:space-y-3 px-4 md:px-6'>
            {resources.documents.map((doc, index) => (
              <Link
                to={doc.url}
                key={`doc-${index}`}
                className='block bg-background rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-border group'
              >
                <div className='flex items-start space-x-3 md:space-x-4'>
                  <div className='p-2 md:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors'>
                    <FileText className='h-4 w-4 md:h-5 md:w-5 text-primary' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <h5 className='font-semibold text-foreground text-sm md:text-base'>
                        {doc.title}
                      </h5>
                      <Badge
                        variant='secondary'
                        className='text-xs bg-primary/10 text-primary'
                      >
                        {doc.type}
                      </Badge>
                    </div>
                    <p className='text-xs md:text-sm text-muted-foreground mt-1'>
                      {doc.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {resources.guides.map((guide, index) => (
              <Link
                to={guide.url}
                key={`guide-${index}`}
                className='block bg-background rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-border group'
              >
                <div className='flex items-start space-x-3 md:space-x-4'>
                  <div className='p-2 md:p-3 bg-secondary/50 rounded-lg group-hover:bg-secondary/80 transition-colors'>
                    <BookOpen className='h-4 w-4 md:h-5 md:w-5 text-foreground' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <h5 className='font-semibold text-foreground text-sm md:text-base'>
                        {guide.title}
                      </h5>
                      <Badge variant='secondary' className='text-xs'>
                        Guide
                      </Badge>
                    </div>
                    <p className='text-xs md:text-sm text-muted-foreground mt-1'>
                      {guide.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommended Tools */}
        <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm'>
          <div className='flex items-center px-4 md:px-6'>
            <div className='p-1.5 md:p-2 bg-primary/10 rounded-lg mr-2 md:mr-3'>
              <Wrench className='h-4 w-4 md:h-6 md:w-6 text-primary' />
            </div>
            <div>
              <h3 className='text-sm md:text-xl font-bold text-foreground'>
                Recommended Tools
              </h3>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Essential development tools
              </p>
            </div>
          </div>

          <div className='space-y-2 md:space-y-3 px-4 md:px-6'>
            {resources.tools.map((tool, index) => (
              <a
                href={tool.url}
                target='_blank'
                rel='noopener noreferrer'
                key={`tool-${index}`}
                className='block bg-background rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-border group'
              >
                <div className='flex items-start space-x-3 md:space-x-4'>
                  <div className='p-2 md:p-3 bg-secondary/50 rounded-lg group-hover:bg-secondary/80 transition-colors'>
                    <Wrench className='h-4 w-4 md:h-5 md:w-5 text-foreground' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <h5 className='font-semibold text-foreground text-sm md:text-base'>
                        {tool.title}
                      </h5>
                      <Badge variant='secondary' className='text-xs'>
                        {tool.category}
                      </Badge>
                    </div>
                    <p className='text-xs md:text-sm text-muted-foreground mt-1'>
                      {tool.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
