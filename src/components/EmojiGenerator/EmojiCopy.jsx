import React, { useMemo, useState } from 'react';
import emojis from 'emoji-datasource';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const unifiedToEmoji = (unified) =>
   unified
      .split('-')
      .map((u) => String.fromCodePoint(parseInt(u, 16)))
      .join('');

const EmojiCopy = () => {
   const [selectedTab, setSelectedTab] = useState('All');

   // Group emojis by category
   const groupedEmojis = useMemo(() => {
      const groups = {};
      emojis.forEach((emoji) => {
         if (!emoji.category) return;
         if (!groups[emoji.category]) groups[emoji.category] = [];
         groups[emoji.category].push({
            char: unifiedToEmoji(emoji.unified),
            name: emoji.short_name,
         });
      });
      return groups;
   }, []);

   // Categories array (All + others)
   const categories = useMemo(
      () => ['All', ...Object.keys(groupedEmojis)],
      [groupedEmojis]
   );

   // Get emojis for selected tab
   const displayedEmojis = useMemo(() => {
      if (selectedTab === 'All') {
         return emojis.map((e) => ({
            char: unifiedToEmoji(e.unified),
            name: e.short_name,
         }));
      }
      return groupedEmojis[selectedTab] || [];
   }, [selectedTab, groupedEmojis]);

   const handleCopy = async (emoji) => {
      try {
         await navigator.clipboard.writeText(emoji);
         toast.success(`Copied ${emoji} to clipboard!`, {
            position: 'bottom-center',
            autoClose: 1000,
            theme: 'dark',
         });
      } catch (err) {
         toast.error('Failed to copy 😞', { theme: 'dark' });
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans px-4 py-8 md:px-10 relative overflow-auto h-screen customScrollbar">
         {/* Background animation */}
         <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1)_0%,transparent_50%)] animate-pulse"></div>
         </div>
         <ToastContainer />
         <h1 className="text-center text-4xl md:text-5xl font-bold mb-8 tracking-tight text-yellow-400 relative z-10 animate-fade-in-down">
            🌟 Emoji Browser
         </h1>

         {/* Tabs */}
         <div className="flex flex-wrap justify-center gap-3 mb-8 relative z-10">
            {categories.map((cat) => (
               <button
                  key={cat}
                  onClick={() => setSelectedTab(cat)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ease-out relative overflow-hidden group ${
                     selectedTab === cat
                        ? 'bg-yellow-400 text-black shadow-xl shadow-yellow-500/25 scale-105 ring-2 ring-yellow-400/50'
                        : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105 hover:shadow-lg hover:shadow-white/20'
                  }`}>
                  <span
                     className={`transition-all duration-300 ${
                        selectedTab === cat
                           ? 'translate-x-0'
                           : '-translate-x-full opacity-0'
                     } group-hover:translate-x-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-gradient-to-r from-yellow-500/20 to-transparent`}></span>
                  <span className="relative z-10">{cat}</span>
               </button>
            ))}
         </div>

         {/* Emoji Grid */}
         <div
            key={selectedTab}
            className="max-w-6xl mx-auto h-[75vh] mb-10 overflow-y-auto p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg shadow-2xl shadow-black/20 transition-all duration-500 ease-in-out animate-fade-in opacity-100 customScrollbar">
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4">
               {displayedEmojis.map((emoji, i) => (
                  <button
                     key={i}
                     title={emoji.name}
                     onClick={() => handleCopy(emoji.char)}
                     className="aspect-square flex items-center justify-center text-4xl sm:text-5xl bg-white/5 hover:bg-white/20 active:bg-white/30 rounded-2xl transition-all duration-300 ease-out hover:scale-110 hover:rotate-3 active:scale-95 shadow-md hover:shadow-lg hover:shadow-yellow-500/20 border border-white/10 min-h-[4rem] sm:min-h-[5rem] relative overflow-hidden group">
                     <span className="transition-transform duration-300 group-hover:scale-110">
                        {emoji.char}
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </button>
               ))}
            </div>
         </div>

         <style jsx>{`
            @keyframes fade-in-down {
               from {
                  opacity: 0;
                  transform: translateY(-20px);
               }
               to {
                  opacity: 1;
                  transform: translateY(0);
               }
            }
            @keyframes fade-in {
               from {
                  opacity: 0;
                  transform: scale(0.95);
               }
               to {
                  opacity: 1;
                  transform: scale(1);
               }
            }
            .animate-fade-in-down {
               animation: fade-in-down 0.6s ease-out;
            }
            .animate-fade-in {
               animation: fade-in 0.5s ease-out;
            }
         `}</style>
      </div>
   );
};

export default EmojiCopy;
