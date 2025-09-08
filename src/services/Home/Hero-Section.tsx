import { Button } from "@/components/ui/button"
import { Badge} from "@/components/ui/badge"
import { Link } from "@tanstack/react-router"
import { Sparkles, Play , } from 'lucide-react';
import { Spotlight } from "@/components/ui/spotlight-new";


export function HeroSection() {
  return (
    <section className=" relative min-h-screen bg-background px-6 ">
      <Spotlight />
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="text-center py-20 lg:py-32">
          {/* Badge */}
          <div className="flex justify-center mb-8 ">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 px-5 py-2 text-sm font-medium rounded-full hover:bg-primary/20 transition-colors shadow-lg"
            >
              <Sparkles className="inline-block mr-1" />
              AI-Powered Learning Journey
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight max-w-4xl mx-auto">
            Master Frontend Development with{" "}
            <span className="text-primary relative ">
              AI-Powered
            </span>{" "}
            Practice
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Practice real-world coding challenges, follow structured roadmaps, and get instant AI feedback that guides you every step of the way
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.04] transition-all duration-300"
            >
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-border text-foreground hover:bg-accent/30 px-8 py-3 text-base font-semibold rounded-lg hover:shadow-xl hover:scale-[1.04] transition-all duration-300 "
            >
              <Link to="/roadmap"> <Play className="inline-block mr-1" />View Roadmap</Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
