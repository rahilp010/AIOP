import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const HeroPage = () => {
   const quotes = [
      'The future of finance is decentralized',
      'Empowering users with financial freedom',
      'Seamless. Secure. Decentralized.',
   ];

   const [currentQuote, setCurrentQuote] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentQuote((prev) => (prev + 1) % quotes.length);
      }, 4000);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans relative overflow-hidden">
         {/* Background elements */}
         <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.1)_0%,transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.1)_0%,transparent_50%)]"></div>
         </div>

         {/* Glass Style Navbar - Centered */}
         <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <Navbar />
         </div>

         {/* Main Hero Content */}
         <main className="min-h-screen flex flex-col justify-between pt-32 pb-16 relative z-10">
            <div className="max-w-7xl mx-auto px-6 flex-grow flex flex-col justify-center">
               {/* Hero Title */}
               <div className="text-center">
                  <h1 className="text-5xl md:text-7xl mb-6  animate-fade-in-up">
                     Your single point of everything
                  </h1>
               </div>
               {/* Animated Quotes Section */}
               <div className="max-w-3xl mx-auto mb-12 h-24 flex items-center justify-center">
                  <p
                     className="text-xl md:text-2xl text-gray-300 text-center italic quote-fade"
                     key={currentQuote}>
                     "{quotes[currentQuote]}"
                  </p>
               </div>
               {/* <div className="flex justify-center space-x-4 mb-12">
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium hover:scale-105 transform">
                     Open App →
                  </button>
                  <button className="px-8 py-4 bg-transparent border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 font-medium hover:scale-105 transform">
                     Discover More
                  </button>
               </div> */}
            </div>

            {/* Visual Lines - Always at bottom */}
            <div className="max-w-7xl mx-auto px-6 w-full absolute bottom-10">
               <div className="flex justify-between items-center">
                  <div className="w-1/3 h-px bg-gradient-to-r from-transparent to-white/30"></div>
                  <div className="w-1/3 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
               </div>
            </div>
         </main>

         <style jsx>{`
            @keyframes fade-in-up {
               from {
                  opacity: 0;
                  transform: translateY(30px);
               }
               to {
                  opacity: 1;
                  transform: translateY(0);
               }
            }
            .animate-fade-in-up {
               animation: fade-in-up 0.8s ease-out forwards;
            }

            @keyframes quote-fade {
               0%,
               100% {
                  opacity: 0;
                  transform: translateY(10px);
               }
               10%,
               90% {
                  opacity: 1;
                  transform: translateY(0);
               }
            }

            .quote-fade {
               animation: quote-fade 6s ease-in-out infinite;
            }

            @keyframes quote-cycle {
               0%,
               30% {
                  content: '"The future of finance is decentralized"';
                  opacity: 1;
               }
               33%,
               36% {
                  opacity: 0;
               }
               37%,
               63% {
                  content: '"Empowering users with financial freedom"';
                  opacity: 1;
               }
               66%,
               69% {
                  opacity: 0;
               }
               70%,
               97% {
                  content: '"Seamless. Secure. Decentralized."';
                  opacity: 1;
               }
               100% {
                  opacity: 0;
               }
            }
         `}</style>
      </div>
   );
};

export default HeroPage;
