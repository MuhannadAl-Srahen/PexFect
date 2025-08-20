import { createFileRoute, Link } from '@tanstack/react-router'
import { Play, Swords, Map, Brain, BookKey, MoveRight } from "lucide-react";
import { Sparkles } from 'lucide-react'; 
import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';

interface ChallengeData {
  title: string;
  description: string;
  difficulty: string;
  rating: string;
  duration: string;
}

interface SavedChallenge extends ChallengeData {
  id: string;
  savedAt: string;
}

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  
  // Bookmark state management
  const [bookmarkedChallenges, setBookmarkedChallenges] = useState<Set<string>>(
    () => {
      const saved = localStorage.getItem('bookmarkedChallenges');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
  );

  // useEffect to save bookmarked challenges to localStorage
  useEffect(() => {
    localStorage.setItem('bookmarkedChallenges', JSON.stringify([...bookmarkedChallenges]));
  }, [bookmarkedChallenges]);

  // Toggle bookmark function
  const toggleBookmark = (challengeId: string, challengeData: ChallengeData) => {
    setBookmarkedChallenges(prev => {
      const newSet = new Set(prev);
      if (newSet.has(challengeId)) {
        newSet.delete(challengeId);
        // Remove from saved challenges
        const savedChallenges: SavedChallenge[] = JSON.parse(localStorage.getItem('savedChallenges') || '[]');
        const filtered = savedChallenges.filter((c: SavedChallenge) => c.id !== challengeId);
        localStorage.setItem('savedChallenges', JSON.stringify(filtered));
      } else {
        newSet.add(challengeId);
        // Add to saved challenges
        const savedChallenges = JSON.parse(localStorage.getItem('savedChallenges') || '[]');
        savedChallenges.push({ id: challengeId, ...challengeData, savedAt: new Date().toISOString() });
        localStorage.setItem('savedChallenges', JSON.stringify(savedChallenges));
      }
      return newSet;
    });
  };
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          const children = entry.target.querySelectorAll('.card-animate, .step-card, .feature-card, .challenge-card, .cta-button');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
              child.classList.remove('opacity-0', 'translate-y-8');
            }, index * 150); 
          });
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
      '.scroll-trigger, .scroll-fade, .scroll-scale, .section-title, .card-animate, .challenge-card, .cta-button'
    );
    animateElements.forEach((el) => observer.observe(el));

    return () => {
      animateElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content mx-auto text-center max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="ai-powered-badge blue-Glow text-blue-500 ai-powered-text hero-line-3 text-sm sm:text-base lg:text-lg">
            <a href="#" className="flex items-center gap-2">
              <Sparkles size={16} className="hero-sparkles sm:w-5 sm:h-5" />
              AI-Powered Learning Journey
            </a>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight hero-title hero-title-animate">
            Master Frontend Development with <br className="hidden sm:block" />
            <span className="ai-powered-text text-blue-500 hero-line-3 blue-Glow">
              AI-Powered
            </span>{" "}
            Practice
          </h2>

          <p className="hero-subtitle text-base sm:text-lg lg:text-xl px-4 sm:px-0">
            Practice real-world coding challenges, follow structured roadmap, and get instant AI feedback that guides you every step of the way.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link to="/roadmap" className="btn-secondary flex items-center">
              <Play size={16} className="mr-2 " />
              View Roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-background scroll-trigger"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16 scroll-scale">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-4 section-title">
              Start your creative journey with{" "}
              <span className="ai-powered-text text-blue-500 hero-line-3 blue-Glow">
                PexFect
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto fade-up px-4 sm:px-0">
              PexFect combines real-world challenges, structured learning paths,
              and AI-powered feedback — so you can become a confident, job-ready
              developer.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            
            {/* Interactive Challenges */}
            <Link to="/challenges" className="block group">
              <div className="feature-card card-animate opacity-0 transform translate-y-8 transition-all duration-500 bg-card border rounded-lg p-6 sm:p-8 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:scale-105 lg:hover:scale-110 hover:-translate-y-2 lg:hover:-translate-y-4 active:scale-95">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                    <Swords size={20} className="text-orange-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-card-foreground transform group-hover:scale-105 transition-transform duration-300">
                    Interactive Challenges
                  </h3>
                </div>
                <p className="text-muted-foreground transform group-hover:translate-x-1 transition-transform duration-300">
                  Practice with real-world coding problems across different difficulty levels and programming languages.
                </p>
              </div>
            </Link>

            {/* Structured Roadmap */}
            <Link to="/roadmap" className="block group">
              <div className="feature-card card-animate opacity-0 transform translate-y-8 transition-all duration-500 bg-card border rounded-lg p-8 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:scale-110 hover:-translate-y-4 active:scale-95">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                    <Map size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground transform group-hover:scale-105 transition-transform duration-300">
                    Structured Roadmap
                  </h3>
                </div>
                <p className="text-muted-foreground transform group-hover:translate-x-1 transition-transform duration-300">
                  Follow a clear learning path from HTML/CSS basics to advanced full-stack development.
                </p>
              </div>
            </Link>

            {/* AI-Powered Feedback */}
            <Link to="/progress" className="block group">
              <div className="feature-card card-animate opacity-0 transform translate-y-8 transition-all duration-500 bg-card border rounded-lg p-8 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:scale-110 hover:-translate-y-4 active:scale-95">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                    <Brain size={20} className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground transform group-hover:scale-105 transition-transform duration-300">
                    AI-Powered Feedback
                  </h3>
                </div>
                <p className="text-muted-foreground transform group-hover:translate-x-1 transition-transform duration-300">
                  Get instant, personalized feedback on your code with actionable suggestions for improvement.
                </p>
              </div>
            </Link>

            {/* Curated Resources */}
            <Link to="/resources" className="block group">
              <div className="feature-card card-animate opacity-0 transform translate-y-8 transition-all duration-500 bg-card border rounded-lg p-8 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:scale-110 hover:-translate-y-4 active:scale-95">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                    <BookKey size={20} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground transform group-hover:scale-105 transition-transform duration-300">
                    Curated Resources
                  </h3>
                </div>
                <p className="text-muted-foreground transform group-hover:translate-x-1 transition-transform duration-300">
                  Access hand-picked tutorials, documentation, and videos to accelerate your learning journey.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/30 scroll-trigger border-b border-border">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-scale">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 section-title ">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-up">
              Simple steps to elevate your frontend skills and build an impressive portfolio.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Central Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary h-full opacity-60 rounded-full"></div>
            
            {/* Step 1 - Choose a Challenge  */}
            <div className="relative mb-20 scroll-scale">
              <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-16 h-0.5 bg-primary -translate-x-full"></div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
              
              <div className="flex items-center">
                <div className="w-full md:w-5/12">
                  <a href="/challenges" className="block group">
                    <div className="step-card card-animate card-hover-effect opacity-0 transform translate-y-8 transition-all duration-500 bg-card border-2 border-border rounded-lg p-8 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:scale-105 hover:-translate-x-2 active:scale-95">
                      <div className="flex items-center justify-start mb-6">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                          1
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 text-card-foreground transform group-hover:scale-105 transition-transform duration-300">Choose a Challenge</h3>
                      <p className="text-muted-foreground transform group-hover:translate-x-1 transition-transform duration-300">
                        Select from a variety of real-world frontend projects tailored to your skill level.
                      </p>
                    </div>
                  </a>
                </div>
                <div className="hidden md:block w-2/12"></div>
                <div className="hidden md:block w-5/12"></div>
              </div>
            </div>

            {/* Step 2 - Build & Submit */}
            <div className="relative mb-20 scroll-scale">
              <div className="absolute right-1/2 top-1/2 transform -translate-y-1/2 w-16 h-0.5 bg-primary translate-x-full"></div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
              
              <div className="flex items-center">
                <div className="hidden md:block w-5/12"></div>
                <div className="hidden md:block w-2/12"></div>
                <div className="w-full md:w-5/12">
                  <a href="/submit" className="block group">
                    <div className="step-card card-animate card-hover-effect opacity-0 transform translate-y-8 transition-all duration-500 bg-card border-2 border-border rounded-lg p-8 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:scale-105 hover:translate-x-2 active:scale-95">
                      <div className="flex items-center justify-start mb-6">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                          2
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 text-card-foreground transform group-hover:scale-105 transition-transform duration-300">Build & Submit</h3>
                      <p className="text-muted-foreground transform group-hover:translate-x-1 transition-transform duration-300">
                        Develop your solution using your preferred tools and submit your GitHub repo and live site.
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Step 3 - Get AI Feedback */}
            <div className="relative scroll-scale">
              <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-16 h-0.5 bg-primary -translate-x-full"></div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
              
              <div className="flex items-center">
                <div className="w-full md:w-5/12">
                  <a href="/ai-feedback" className="block group">
                    <div className="step-card card-animate card-hover-effect opacity-0 transform translate-y-8 transition-all duration-500 bg-card border-2 border-border rounded-lg p-8 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary hover:scale-105 hover:-translate-x-2 active:scale-95">
                      <div className="flex items-center justify-start mb-6">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                          3
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 text-card-foreground transform group-hover:scale-105 transition-transform duration-300">Get AI Feedback</h3>
                      <p className="text-muted-foreground transform group-hover:translate-x-1 transition-transform duration-300">
                        Receive instant insights on code quality, design, accessibility, and more.
                      </p>
                    </div>
                  </a>
                </div>
                <div className="hidden md:block w-2/12"></div>
                <div className="hidden md:block w-5/12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Challenges Section */}
      <section className="py-20 px-4 bg-background scroll-trigger">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-scale">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 section-title">
              Featured Challenges
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-up">
              Dive into real-world projects and sharp your skills
            </p>
          </div>
          
          {/* Challenge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            
            {/* Challenge Card 1 */}
            <div className="challenge-card card-animate opacity-0 transform translate-y-8 transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <Link to="/challenges" className="block group">
                <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">Beginner</span>
                    </div>
                    <div className="flex items-center justify-center h-full text-gray-400">
                      
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Responsive Navigation Bar</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a mobile-friendly navigation component with dropdown menus.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span>⭐</span>
                          4.9/5
                        </span>
                        <span className="flex items-center gap-1">
                          <span>⏱️</span>
                          30 min
                        </span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark('responsive-navbar', {
                            title: 'Responsive Navigation Bar',
                            description: 'Create a mobile-friendly navigation component with dropdown menus.',
                            difficulty: 'Beginner',
                            rating: '4.9/5',
                            duration: '30 min'
                          });
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200" 
                        aria-label="Bookmark this challenge"
                      >
                        <Bookmark 
                          className={`w-5 h-5 ${bookmarkedChallenges.has('responsive-navbar') 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-400'
                          }`} 
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Challenge Card 2 */}
            <div className="challenge-card card-animate opacity-0 transform translate-y-8 transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <Link to="/challenges" className="block group">
                <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">Beginner</span>
                    </div>
                    <div className="flex items-center justify-center h-full text-gray-400">
                      
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Interactive Dashboard</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Build a responsive dashboard with charts and data visualization components.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span>⭐</span>
                          4.8/5
                        </span>
                        <span className="flex items-center gap-1">
                          <span>⏱️</span>
                          45 min
                        </span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark('interactive-dashboard', {
                            title: 'Interactive Dashboard',
                            description: 'Build a responsive dashboard with charts and data visualization components.',
                            difficulty: 'Beginner',
                            rating: '4.8/5',
                            duration: '45 min'
                          });
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200" 
                        aria-label="Bookmark this challenge"
                      >
                        <Bookmark 
                          className={`w-5 h-5 ${bookmarkedChallenges.has('interactive-dashboard') 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-400'
                          }`} 
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Challenge Card 3 */}
            <div className="challenge-card card-animate opacity-0 transform translate-y-8 transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <Link to="/challenges" className="block group">
                <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded font-medium">Intermediate</span>
                    </div>
                    <div className="flex items-center justify-center h-full text-gray-400">
                      
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">E-commerce Product Page</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a fully functional product page with cart functionality and animations.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span>⭐</span>
                          4.7/5
                        </span>
                        <span className="flex items-center gap-1">
                          <span>⏱️</span>
                          60 min
                        </span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark('ecommerce-product-page', {
                            title: 'E-commerce Product Page',
                            description: 'Create a fully functional product page with cart functionality and animations.',
                            difficulty: 'Intermediate',
                            rating: '4.7/5',
                            duration: '60 min'
                          });
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200" 
                        aria-label="Bookmark this challenge"
                      >
                        <Bookmark 
                          className={`w-5 h-5 ${bookmarkedChallenges.has('ecommerce-product-page') 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-400'
                          }`} 
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* View All Challenges Button */}
          <div className="text-center">
            <Link to="/challenges" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 microsoft-hover">
              View All Challenges
              <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-muted/30 scroll-trigger">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto scroll-scale">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 section-title">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto fade-up">
              Join PexFect today and transform your frontend skills with personalized challenges and intelligent feedback.
            </p>
            
            {/* Sign Up Button */}
            <div className="cta-button card-animate opacity-0 transform translate-y-8 transition-all duration-500">
              <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 microsoft-hover text-lg font-semibold rotating-shadow-animation">
                Sign Up for Free
                <MoveRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
