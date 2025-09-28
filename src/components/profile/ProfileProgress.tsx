import { Target, Code, BarChart3 } from 'lucide-react'
import '../../types/profile.css'

const mockProgressData = {
  learningPaths: [
    {
      id: 'beginner',
      name: 'Beginner Path',
      completed: 8,
      total: 8,
      percentage: 100,
    },
    {
      id: 'intermediate', 
      name: 'Intermediate Path',
      completed: 6,
      total: 10,
      percentage: 60,
    },
    {
      id: 'advanced',
      name: 'Advanced Path', 
      completed: 0,
      total: 8,
      percentage: 0,
    },
  ],
  
  technologies: [
    { name: 'HTML', completed: 8, total: 10, color: 'html' },
    { name: 'CSS', completed: 7, total: 12, color: 'css' },
    { name: 'JavaScript', completed: 6, total: 15, color: 'javascript' },
    { name: 'React', completed: 3, total: 8, color: 'react' },
    { name: 'TypeScript', completed: 2, total: 6, color: 'typescript' },
    { name: 'Node.js', completed: 1, total: 4, color: 'nodejs' },
  ],
  
  difficulty: [
    { 
      level: 'Beginner', 
      completed: 12, 
      total: 15, 
      avgScore: 88,
      color: 'beginner' 
    },
    { 
      level: 'Intermediate', 
      completed: 5, 
      total: 8, 
      avgScore: 75,
      color: 'intermediate' 
    },
    { 
      level: 'Advanced', 
      completed: 1, 
      total: 4, 
      avgScore: 65,
      color: 'advanced' 
    },
  ],
}

export function ProfileProgress() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Learning Path Progress */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm relative overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1">
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="mb-6 relative overflow-hidden cursor-pointer group/header transition-all duration-300 hover:scale-[1.02] p-2 rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/header:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-primary transition-all duration-300 group-hover/header:scale-110 group-hover/header:rotate-12 group-hover/header:drop-shadow-sm" />
                <h3 className="text-lg font-semibold text-foreground transition-all duration-300 group-hover/header:text-primary group-hover/header:drop-shadow-sm">
                  Learning Path Progress
                </h3>
              </div>
              <p className="text-sm text-muted-foreground transition-all duration-300 group-hover/header:opacity-90 group-hover/header:text-primary/60">
                Your progress across different learning paths
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockProgressData.learningPaths.map((path, index) => (
              <div
                key={path.id}
                className={`p-4 rounded-lg border profile-card-${path.id} relative overflow-hidden cursor-pointer group/card transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg`}
                style={{
                  animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Card hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
                
                <div className="text-center relative z-10">
                  <div className={`text-3xl font-bold profile-text-${path.id} mb-1 transition-all duration-300 group-hover/card:scale-110 group-hover/card:drop-shadow-lg`}>
                    {path.percentage}%
                  </div>
                  <div className={`font-medium profile-text-${path.id} mb-1 transition-all duration-300 group-hover/card:scale-105 group-hover/card:drop-shadow-sm`}>
                    {path.name}
                  </div>
                  <div className="text-xs text-muted-foreground transition-all duration-300 group-hover/card:opacity-80 group-hover/card:scale-95">
                    {path.completed}/{path.total} Completed
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* By Technology */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm relative overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1">
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="mb-6 relative overflow-hidden cursor-pointer group/tech-header transition-all duration-300 hover:scale-[1.02] p-2 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/tech-header:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-primary transition-all duration-300 group-hover/tech-header:scale-110 group-hover/tech-header:rotate-12 group-hover/tech-header:drop-shadow-sm" />
                  <h3 className="text-lg font-semibold text-foreground transition-all duration-300 group-hover/tech-header:text-primary group-hover/tech-header:drop-shadow-sm">
                    By Technology
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground transition-all duration-300 group-hover/tech-header:opacity-90 group-hover/tech-header:text-primary/60">
                  Challenges completed in each technology
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {mockProgressData.technologies.map((tech, index) => (
                <div 
                  key={tech.name} 
                  className="space-y-2 relative overflow-hidden cursor-pointer group/tech-item transition-all duration-300 hover:bg-muted/30 rounded-lg p-3 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-sm"
                  style={{
                    animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Item hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/tech-item:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium transition-all duration-300 group-hover/tech-item:text-primary group-hover/tech-item:drop-shadow-sm group-hover/tech-item:scale-105">
                        {tech.name}
                      </span>
                      <span className="text-muted-foreground transition-all duration-300 group-hover/tech-item:opacity-80 group-hover/tech-item:scale-95">
                        {tech.completed}/{tech.total}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full profile-progress-${tech.color} transition-all duration-500 group-hover/tech-item:shadow-lg`}
                        style={{
                          width: `${(tech.completed / tech.total) * 100}%`,
                          animation: `progressBar 1s ease-out ${index * 0.1}s both`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* By Difficulty */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm relative overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1">
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="mb-6 relative overflow-hidden cursor-pointer group/diff-header transition-all duration-300 hover:scale-[1.02] p-2 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/diff-header:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-primary transition-all duration-300 group-hover/diff-header:scale-110 group-hover/diff-header:rotate-12 group-hover/diff-header:drop-shadow-sm" />
                  <h3 className="text-lg font-semibold text-foreground transition-all duration-300 group-hover/diff-header:text-primary group-hover/diff-header:drop-shadow-sm">
                    By Difficulty
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground transition-all duration-300 group-hover/diff-header:opacity-90 group-hover/diff-header:text-primary/60">
                  Performance across difficulty levels
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {mockProgressData.difficulty.map((diff, index) => (
                <div 
                  key={diff.level} 
                  className="space-y-2 relative overflow-hidden cursor-pointer group/diff-item transition-all duration-300 hover:bg-muted/30 rounded-lg p-3 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-sm"
                  style={{
                    animation: `slideInRight 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Item hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/diff-item:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full profile-indicator-${diff.color} transition-all duration-300 group-hover/diff-item:scale-125 group-hover/diff-item:shadow-lg`} />
                        <span className="font-medium text-sm transition-all duration-300 group-hover/diff-item:text-primary group-hover/diff-item:drop-shadow-sm group-hover/diff-item:scale-105">
                          {diff.level}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium transition-all duration-300 group-hover/diff-item:scale-105 group-hover/diff-item:drop-shadow-sm">
                          {diff.completed}/{diff.total}
                        </div>
                        <div className="text-xs text-muted-foreground transition-all duration-300 group-hover/diff-item:opacity-80">
                          avg. {diff.avgScore}%
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full profile-progress-${diff.color} transition-all duration-500 group-hover/diff-item:shadow-lg`}
                        style={{
                          width: `${(diff.completed / diff.total) * 100}%`,
                          animation: `progressBar 1s ease-out ${index * 0.1}s both`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes progressBar {
          from {
            width: 0% !important;
          }
        }
      `}</style>
    </div>
  )
}