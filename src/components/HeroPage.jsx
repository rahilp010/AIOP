import React, { useState, useEffect } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import Navbar from './Navbar';

const HeroPage = () => {
   const quotes = [
      'The future of finance is decentralized',
      'Empowering users with financial freedom',
      'Seamless. Secure. Decentralized.',
   ];

   const [currentQuote, setCurrentQuote] = useState(0);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
   }, []);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentQuote((prev) => (prev + 1) % quotes.length);
      }, 4000);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans relative overflow-hidden">
         {/* Hamburger Button - Always visible */}
         <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="fixed top-6 left-6 z-50 p-3 rounded-2xl 
                     bg-white/10 backdrop-blur-xl border border-white/20
                     hover:bg-white/20 hover:scale-105
                     active:scale-95
                     transition-all duration-300 
                     shadow-lg shadow-black/20">
            <CiMenuFries size={24} className="text-white" />
         </button>

         <Navbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isMobile={isMobile}
         />

         {/* Background decorations */}
         <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.1)_0%,transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.1)_0%,transparent_50%)]"></div>
         </div>

         {/* Hero content */}
         <main
            className={`min-h-screen flex flex-col justify-between pt-32 pb-16 relative z-10 transition-transform duration-500 ease-out ${
               sidebarOpen && isMobile ? 'translate-x-72 sm:translate-x-80' : ''
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex-grow flex flex-col justify-center">
               <div className="text-center">
                  <h1 className="text-5xl md:text-7xl mb-6 animate-fade-in-up">
                     Your single point of everything
                  </h1>
               </div>

               <div className="max-w-3xl mx-auto mb-12 h-24 flex items-center justify-center">
                  <p
                     className="text-xl md:text-2xl text-gray-300 text-center italic quote-fade"
                     key={currentQuote}>
                     "{quotes[currentQuote]}"
                  </p>
               </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full absolute bottom-10">
               <div className="flex justify-between items-center">
                  <div className="w-1/3 h-px bg-gradient-to-r from-transparent to-white/30"></div>
                  <div className="w-1/3 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
               </div>
            </div>
         </main>
      </div>
   );
};

export default HeroPage;
