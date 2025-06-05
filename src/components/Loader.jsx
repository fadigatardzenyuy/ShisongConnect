import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#f8faff] via-[#f0f4ff] to-[#e8f2ff] flex items-center justify-center z-50">
      {/* Background blur effect */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      {/* Main loader container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Loader animation area */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          {/* Outer rotating ring */}
          <div className="absolute w-32 h-32 rounded-full border-2 border-transparent animate-spin [animation-duration:3s]"
               style={{
                 background: 'conic-gradient(from 0deg, #306ce9, #4f86f7, #7ba7ff, #306ce9)',
                 WebkitMask: 'radial-gradient(circle, transparent 60px, black 62px)',
                 mask: 'radial-gradient(circle, transparent 60px, black 62px)'
               }}>
          </div>
          
          {/* Middle pulsing ring */}
          <div className="absolute w-28 h-28 rounded-full border border-[#306ce9]/20 animate-pulse"></div>
          
          {/* Inner spinning dots */}
          <div className="absolute w-24 h-24 animate-spin [animation-duration:2s] [animation-direction:reverse]">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#306ce9] rounded-full transform -translate-x-1/2 animate-pulse"></div>
            <div className="absolute top-1/2 right-0 w-2 h-2 bg-[#4f86f7] rounded-full transform -translate-y-1/2 animate-pulse [animation-delay:0.2s]"></div>
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#7ba7ff] rounded-full transform -translate-x-1/2 animate-pulse [animation-delay:0.4s]"></div>
            <div className="absolute top-1/2 left-0 w-2 h-2 bg-[#306ce9] rounded-full transform -translate-y-1/2 animate-pulse [animation-delay:0.6s]"></div>
          </div>
          
          {/* Center SHICO text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl font-bold text-[#306ce9] tracking-wider">
              <span className="inline-block animate-bounce [animation-delay:0s]">S</span>
              <span className="inline-block animate-bounce [animation-delay:0.1s]">H</span>
              <span className="inline-block animate-bounce [animation-delay:0.2s]">I</span>
              <span className="inline-block animate-bounce [animation-delay:0.3s]">C</span>
              <span className="inline-block animate-bounce [animation-delay:0.4s]">O</span>
            </div>
          </div>
          
          {/* Floating particles around the loader */}
          <div className="absolute w-40 h-40 pointer-events-none">
            <div className="absolute top-4 left-4 w-1 h-1 bg-[#306ce9]/30 rounded-full animate-ping [animation-delay:1s]"></div>
            <div className="absolute top-6 right-6 w-1 h-1 bg-[#4f86f7]/30 rounded-full animate-ping [animation-delay:1.5s]"></div>
            <div className="absolute bottom-8 left-8 w-1 h-1 bg-[#7ba7ff]/30 rounded-full animate-ping [animation-delay:2s]"></div>
            <div className="absolute bottom-4 right-4 w-1 h-1 bg-[#306ce9]/30 rounded-full animate-ping [animation-delay:2.5s]"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="text-center mb-6">
          <div className="text-sm text-[#306ce9]/70 font-medium flex items-center justify-center">
            <span className="animate-pulse">Loading</span>
            <span className="animate-ping inline-block ml-1">.</span>
            <span className="animate-ping inline-block [animation-delay:0.2s]">.</span>
            <span className="animate-ping inline-block [animation-delay:0.4s]">.</span>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-1 bg-[#306ce9]/10 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-gradient-to-r from-[#306ce9] to-[#4f86f7] rounded-full animate-pulse"></div>
          </div>
          <p className="text-xs text-[#306ce9]/60 text-center font-medium">
            Please wait while we prepare your experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;