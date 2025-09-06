import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Video,
  FileText,
  BookOpen,
  Wrench,
  Play,
  ExternalLink,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { Challenge } from '@/types/challenge'

interface ChallengeResourcesProps {
  challenge: Challenge
}

export function ChallengeResources({ challenge }: ChallengeResourcesProps) {
  const { resources } = challenge

  return (
    <div className='space-y-8'>
      {/* Video Tutorials - Featured Section */}
      <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
        <div className='flex items-center px-6'>
          <div className='p-2 bg-primary/10 rounded-lg mr-3'>
            <Video className='h-6 w-6 text-primary' />
          </div>
          <div>
            <h3 className='text-xl font-bold text-foreground'>
              Video Tutorials
            </h3>
            <p className='text-sm text-muted-foreground'>
              Step-by-step visual guides
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6'>
          {resources.videos.map((video, index) => (
            <div
              key={index}
              className='bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border'
            >
              <div className='aspect-video bg-muted relative overflow-hidden'>
                <img
                  src={video.thumbnail || '/placeholder.svg'}
                  alt={video.title}
                  className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                />
                <div className='absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                  <div className='w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110'>
                    <Play className='h-7 w-7 text-primary-foreground ml-1' />
                  </div>
                </div>
                <div className='absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-full font-medium'>
                  {video.duration}
                </div>
              </div>
              <div className='p-4'>
                <h4 className='font-semibold text-foreground mb-2 line-clamp-1'>
                  {video.title}
                </h4>
                <p className='text-sm text-muted-foreground mb-4 line-clamp-2'>
                  {video.description}
                </p>
                <Link to={video.url}>
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full group transition-all duration-300 hover:scale-105'
                  >
                    Watch Now
                    <ExternalLink className='ml-2 h-4 w-4 group-hover:text-primary transition-colors' />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Documents */}
        <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
          <div className='flex items-center px-6'>
            <div className='p-2 bg-primary/10 rounded-lg mr-3'>
              <FileText className='h-6 w-6 text-primary' />
            </div>
            <div>
              <h3 className='text-xl font-bold text-foreground'>Documents</h3>
              <p className='text-sm text-muted-foreground'>
                Reference materials and tutorials
              </p>
            </div>
          </div>

          <div className='space-y-3 px-6'>
            {/* Documents */}
            {resources.documents.map((doc, index) => (
              <div
                key={`doc-${index}`}
                className='bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-border group'
              >
                <div className='flex items-start space-x-3'>
                  <div className='p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors'>
                    <FileText className='h-4 w-4 text-primary' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between mb-2'>
                      <h5 className='font-semibold text-foreground text-sm'>
                        {doc.title}
                      </h5>
                      <Badge
                        variant='secondary'
                        className='text-xs bg-primary/10 text-primary'
                      >
                        {doc.type}
                      </Badge>
                    </div>
                    <p className='text-xs text-muted-foreground mb-3'>
                      {doc.description}
                    </p>
                    <Link to={doc.url}>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-xs h-7 hover:bg-primary/10 transition-all duration-300 hover:scale-105'
                      >
                        View Document
                        <ExternalLink className='ml-1 h-3 w-3' />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Guides */}
            {resources.guides.map((guide, index) => (
              <div
                key={`guide-${index}`}
                className='bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-border group'
              >
                <div className='flex items-start space-x-3'>
                  <div className='p-2 bg-secondary/50 rounded-lg group-hover:bg-secondary transition-colors'>
                    <BookOpen className='h-4 w-4 text-foreground' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between mb-2'>
                      <h5 className='font-semibold text-foreground text-sm'>
                        {guide.title}
                      </h5>
                      <Badge variant='secondary' className='text-xs'>
                        Guide
                      </Badge>
                    </div>
                    <p className='text-xs text-muted-foreground mb-3'>
                      {guide.description}
                    </p>
                    <Link to={guide.url}>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-xs h-7 hover:bg-secondary transition-all duration-300 hover:scale-105'
                      >
                        Read Guide
                        <ExternalLink className='ml-1 h-3 w-3' />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Tools */}
        <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
          <div className='flex items-center px-6'>
            <div className='p-2 bg-primary/10 rounded-lg mr-3'>
              <Wrench className='h-6 w-6 text-primary' />
            </div>
            <div>
              <h3 className='text-xl font-bold text-foreground'>
                Recommended Tools
              </h3>
              <p className='text-sm text-muted-foreground'>
                Essential development tools
              </p>
            </div>
          </div>

          <div className='space-y-3 px-6'>
            {resources.tools.map((tool, index) => (
              <div
                key={`tool-${index}`}
                className='bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] border border-border group'
              >
                <div className='flex items-start space-x-3'>
                  <div className='p-2 bg-secondary/50 rounded-lg group-hover:bg-secondary transition-colors'>
                    <Wrench className='h-4 w-4 text-foreground' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between mb-2'>
                      <h5 className='font-semibold text-foreground text-sm'>
                        {tool.title}
                      </h5>
                      <Badge variant='secondary' className='text-xs'>
                        {tool.category}
                      </Badge>
                    </div>
                    <p className='text-xs text-muted-foreground mb-3'>
                      {tool.description}
                    </p>
                    <a
                      href={tool.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-xs h-7 hover:bg-secondary transition-all duration-300 hover:scale-105'
                      >
                        Open Tool
                        <ExternalLink className='ml-1 h-3 w-3' />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
