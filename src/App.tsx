import { useState, useEffect, useRef } from 'react';
import './App.css';
import BirthdayScene from './components/BirthdayScene';
import Confetti from './components/Confetti';
import { Heart, Sparkles, Gift, Star, Music, Cake, Balloon } from 'lucide-react';

function App() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [currentWish, setCurrentWish] = useState(0);
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({});
  const wishesRef = useRef<HTMLDivElement>(null);
  const memoriesRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const wishes = [
    {
      title: "Happy Birthday",
      text: "To the most beautiful soul I've ever known",
      icon: <Cake className="w-8 h-8" />
    },
    {
      title: "My Everything",
      text: "You make every day brighter just by being in it",
      icon: <Star className="w-8 h-8" />
    },
    {
      title: "Forever Yours",
      text: "I promise to love you more with each passing day",
      icon: <Heart className="w-8 h-8" />
    },
    {
      title: "My Lucky Star",
      text: "Thank you for choosing me to be by your side",
      icon: <Sparkles className="w-8 h-8" />
    }
  ];

  const reasons = [
    "Your smile lights up my world",
    "Your laugh is my favorite sound",
    "You make me a better person",
    "Your kindness knows no bounds",
    "You're my best friend and soulmate",
    "Every moment with you is precious"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.2 }
    );

    [wishesRef, memoriesRef, messageRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWish((prev) => (prev + 1) % wishes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [wishes.length]);

  return (
    <div className="min-h-screen bg-gradient-romantic overflow-x-hidden">
      <Confetti active={showConfetti} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Floating decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Star 
                className="text-yellow-400/60" 
                size={8 + Math.random() * 12}
                fill="currentColor"
              />
            </div>
          ))}
        </div>

        {/* Main Title */}
        <div className="text-center z-10 mb-4">
          <div className="flex items-center justify-center gap-3 mb-4 animate-bounce-in">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            <span className="text-pink-300 text-lg tracking-widest uppercase">Special Day</span>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-glow animate-bounce-in">
            Happy Birthday
          </h1>
          
          <div className="flex items-center justify-center gap-4 mt-6 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            <Heart className="w-6 h-6 text-rose-500 animate-heartbeat" fill="currentColor" />
            <p className="text-2xl md:text-4xl text-pink-200 font-script">
              My Beautiful Love
            </p>
            <Heart className="w-6 h-6 text-rose-500 animate-heartbeat" fill="currentColor" />
          </div>
        </div>

        {/* 3D Scene */}
        <div className="w-full max-w-5xl z-10 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <BirthdayScene />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-pink-400/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-pink-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Wishes Carousel Section */}
      <section 
        id="wishes"
        ref={wishesRef}
        className="py-20 px-4 relative"
      >
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible['wishes'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="font-script text-5xl md:text-6xl text-pink-300 mb-4">Birthday Wishes</h2>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
              ))}
            </div>
          </div>

          <div className={`glass-pink rounded-3xl p-8 md:p-12 text-center transition-all duration-1000 delay-300 ${isVisible['wishes'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white animate-pulse-glow">
                {wishes[currentWish].icon}
              </div>
            </div>
            
            <h3 className="font-script text-4xl md:text-5xl text-pink-200 mb-4 transition-all duration-500">
              {wishes[currentWish].title}
            </h3>
            
            <p className="text-xl md:text-2xl text-pink-100/80 transition-all duration-500">
              {wishes[currentWish].text}
            </p>

            {/* Dots indicator */}
            <div className="flex justify-center gap-3 mt-8">
              {wishes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentWish(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentWish 
                      ? 'bg-pink-400 w-8' 
                      : 'bg-pink-400/30 hover:bg-pink-400/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reasons I Love You Section */}
      <section 
        id="memories"
        ref={memoriesRef}
        className="py-20 px-4 relative"
      >
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['memories'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="font-script text-5xl md:text-6xl text-pink-300 mb-4">Reasons I Love You</h2>
            <p className="text-pink-200/70 text-lg">Just a few of the infinite reasons</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className={`glass rounded-2xl p-6 text-center group hover:bg-pink-500/10 transition-all duration-500 ${
                  isVisible['memories'] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <p className="text-pink-100 text-lg">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Message Section */}
      <section 
        id="message"
        ref={messageRef}
        className="py-20 px-4 relative"
      >
        <div className="max-w-3xl mx-auto">
          <div className={`glass-pink rounded-3xl p-8 md:p-12 transition-all duration-1000 ${isVisible['message'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center">
              <Gift className="w-16 h-16 text-pink-400 mx-auto mb-6 animate-float" />
              
              <h2 className="font-script text-4xl md:text-5xl text-pink-300 mb-8">
                My Dearest Love
              </h2>
              
              <div className="space-y-6 text-lg text-pink-100/90 leading-relaxed">
                <p>
                  On this special day, I want you to know that you are the most precious gift 
                  life has ever given me. Every moment spent with you is a treasure I hold 
                  close to my heart.
                </p>
                
                <p>
                  Your smile brightens my darkest days, your laughter is the melody that 
                  plays in my heart, and your love is the warmth that keeps me going. 
                  I am endlessly grateful to have you in my life.
                </p>
                
                <p>
                  May this birthday bring you as much joy as you bring to everyone around you. 
                  Here's to many more years of love, laughter, and beautiful memories together.
                </p>
              </div>

              <div className="mt-10 flex items-center justify-center gap-4">
                <Balloon className="w-8 h-8 text-pink-400 animate-float-slow" />
                <span className="font-script text-3xl text-pink-300">
                  I Love You Forever
                </span>
                <Music className="w-8 h-8 text-rose-400 animate-pulse" />
              </div>

              <div className="mt-8 flex justify-center gap-2">
                {[...Array(10)].map((_, i) => (
                  <Heart 
                    key={i}
                    className="w-5 h-5 text-rose-500"
                    fill="currentColor"
                    style={{ 
                      animation: `heartbeat 1.5s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-rose-500 animate-heartbeat" fill="currentColor" />
          <span className="font-script text-2xl text-pink-300">Made with Love</span>
          <Heart className="w-6 h-6 text-rose-500 animate-heartbeat" fill="currentColor" />
        </div>
        <p className="text-pink-200/50 text-sm">
          Happy Birthday to the love of my life
        </p>
      </footer>

      {/* Toggle Confetti Button */}
      <button
        onClick={() => setShowConfetti(!showConfetti)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-40 glow-pink"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;
