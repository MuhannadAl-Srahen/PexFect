import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Bookmark, Star, Clock, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

interface SavedChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  rating: string;
  duration: string;
  savedAt: string;
}

function RouteComponent() {
  const [savedChallenges, setSavedChallenges] = useState<SavedChallenge[]>([]);

  useEffect(() => {
    // Load saved challenges from localStorage
    const saved = localStorage.getItem('savedChallenges');
    if (saved) {
      setSavedChallenges(JSON.parse(saved));
    }
  }, []);

  const removeBookmark = (challengeId: string) => {
    // Remove from saved challenges
    const updatedChallenges = savedChallenges.filter(c => c.id !== challengeId);
    setSavedChallenges(updatedChallenges);
    localStorage.setItem('savedChallenges', JSON.stringify(updatedChallenges));
    
    // Remove from bookmarked challenges
    const bookmarked = JSON.parse(localStorage.getItem('bookmarkedChallenges') || '[]');
    const updatedBookmarked = bookmarked.filter((id: string) => id !== challengeId);
    localStorage.setItem('bookmarkedChallenges', JSON.stringify(updatedBookmarked));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Profile</h1>
          <p className="text-lg text-muted-foreground">
            Manage your saved challenges and track your progress
          </p>
        </div>

        {/* Saved Challenges Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Bookmark className="w-6 h-6 text-red-500 fill-red-500" />
            <h2 className="text-2xl font-bold">Saved Challenges ({savedChallenges.length})</h2>
          </div>

          {savedChallenges.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No saved challenges yet</h3>
              <p className="text-muted-foreground mb-4">
                Start bookmarking challenges from the home page to see them here
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300"
              >
                Explore Challenges
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedChallenges.map((challenge) => (
                <div key={challenge.id} className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="absolute top-3 left-3">
                      <span className={`${getDifficultyColor(challenge.difficulty)} text-white text-xs px-2 py-1 rounded font-medium`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => removeBookmark(challenge.id)}
                        className="p-2 bg-white/80 hover:bg-white rounded-lg transition-colors duration-200"
                        aria-label="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {challenge.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {challenge.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {challenge.duration}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">
                      Saved on {new Date(challenge.savedAt).toLocaleDateString()}
                    </div>
                    <Link 
                      to="/challenges" 
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300"
                    >
                      Start Challenge
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
