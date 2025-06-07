import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, FileText, Bell, Shield, Users, Heart, Star, ArrowRight, CheckCircle } from 'lucide-react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1920&q=80'
];

const userAvatars = [
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

const SHICOLandingPage = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">SHICo</h2>
          <p className="text-white/80">Loading your healthcare platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden">
      {/* Dynamic Background Images */}
      <div className="fixed inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-2000 ease-in-out ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              transform: 'scale(1.05)'
            }}
          />
        ))}
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/70 to-teal-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 z-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-20 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full h-full py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
            {/* Left Column - Hero */}
            <div 
              className={`space-y-4 transition-all duration-1000 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white rounded-full text-sm font-medium border border-green-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Shisong Connect (SHICo)
                </div>
                
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                  Your Health Journey,{' '}
                  <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Simplified
                  </span>
                </h1>
                
                <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
                  Experience seamless healthcare management in Cameroon with our patient-centric platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGetStarted}
                  className="group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-base shadow-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-green-500/25 flex items-center justify-center gap-2"
                >
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={handleSignIn}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-base border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </button>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-3">
                  {userAvatars.map((avatar, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-lg overflow-hidden"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <img 
                        src={avatar} 
                        alt={`User ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-white/80">
                    <span className="font-bold text-xl text-white block">15,000+</span>
                    patients joined
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-white/80 text-xs">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/80 text-xs">256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white/80 text-xs">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right Column - Features */}
            <div 
              className={`relative space-y-3 transition-all duration-1000 ease-out delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              {/* Feature Cards */}
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-xl p-4 rounded-xl shadow-xl border border-white/20 hover:bg-white/15 hover:border-green-400/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Smart Scheduling</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Book appointments instantly with real-time availability
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl p-4 rounded-xl shadow-xl border border-white/20 hover:bg-white/15 hover:border-green-400/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Digital Health Records</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Secure access to your complete medical history
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl p-4 rounded-xl shadow-xl border border-white/20 hover:bg-white/15 hover:border-green-400/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Intelligent Reminders</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Personalized notifications for appointments
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl p-4 rounded-xl border border-green-400/30 shadow-xl">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-xl font-bold text-white">50+</div>
                    <div className="text-white/80 text-xs">Hospitals</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">24/7</div>
                    <div className="text-white/80 text-xs">Support</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">99.9%</div>
                    <div className="text-white/80 text-xs">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 py-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <p className="text-white/70 text-sm">
              © 2024 SHICo. Trusted by leading healthcare providers in Cameroon.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="text-white/60 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#terms" className="text-white/60 hover:text-white transition-colors text-sm">Terms</a>
            <a href="#support" className="text-white/60 hover:text-white transition-colors text-sm">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SHICOLandingPage;