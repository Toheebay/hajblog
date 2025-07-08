
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Users, Award, TrendingUp, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-marketplace-primary via-marketplace-accent to-marketplace-secondary text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-white/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-marketplace-secondary/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="marketplace-container relative z-10">
        <div className="py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Trusted by 10,000+ pilgrims worldwide</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your Trusted
                <span className="block text-yellow-300">Hajj Marketplace</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                Connect with verified agents, discover premium packages, and join a community 
                of faithful pilgrims preparing for their sacred journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-marketplace-primary font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Explore Packages
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-marketplace-primary font-semibold px-8 py-4 text-lg transition-all"
                >
                  Join Community
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-2 mx-auto">
                    <Users className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm text-white/80">Happy Pilgrims</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-2 mx-auto">
                    <Award className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Verified Agents</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-2 mx-auto">
                    <Star className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-sm text-white/80">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-2 mx-auto">
                    <TrendingUp className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div className="text-2xl font-bold">99%</div>
                  <div className="text-sm text-white/80">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Business Section */}
            <div className="relative animate-fade-in">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-marketplace-primary px-4 py-2 rounded-full font-semibold text-sm">
                    <Sparkles className="w-4 h-4" />
                    LIMITED TIME OFFER
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Start Your Hajj Business Today
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
                      <span className="text-white/90">Free Ads Included</span>
                      <span className="bg-yellow-400 text-marketplace-primary px-3 py-1 rounded-full font-bold">
                        20 FREE
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
                      <span className="text-white/90">Verified Badge</span>
                      <Award className="w-5 h-5 text-yellow-300" />
                    </div>
                    
                    <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
                      <span className="text-white/90">Premium Support</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 text-marketplace-primary font-bold py-4 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                    >
                      Get Started Free
                      <Sparkles className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                  
                  <p className="text-xs text-white/70">
                    No credit card required • Setup in 5 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
