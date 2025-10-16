import React, { useMemo, useState } from 'react';
import emojis from 'emoji-datasource';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar';

const unifiedToEmoji = (unified) =>
   unified
      .split('-')
      .map((u) => String.fromCodePoint(parseInt(u, 16)))
      .join('');

const EmojiCopy = () => {
   const [selectedTab, setSelectedTab] = useState('All');

   const [toast, setToast] = useState({
      message: '',
      type: 'success', // 'success' | 'error'
      visible: false,
   });

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
         showNotification(`Copied ${emoji} to clipboard!`, 'success', 2000);
      } catch (err) {
         showNotification('Failed to copy 😞', 'error', 2000);
      }
   };

   const showNotification = (message, type = 'success', duration = 3000) => {
      setToast({ message, type, visible: true });
      setTimeout(
         () => setToast((prev) => ({ ...prev, visible: false })),
         duration
      );
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans px-4 py-8 md:px-10 relative overflow-auto h-screen customScrollbar">
         <div className="z-50 mb-10 -mt-2 flex justify-center">
            <Navbar />
         </div>

         {/* Toast notification */}
         {toast.visible && (
            <div className={`fixed top-6 right-6 z-50 animate-slideIn`}>
               <div
                  className={`px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 border 
            ${
               toast.type === 'success'
                  ? 'bg-green-500/20 border-green-400 text-green-100'
                  : 'bg-red-500/20 border-red-400 text-red-100'
            } backdrop-blur-md`}>
                  <svg
                     className="w-5 h-5"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2">
                     {toast.type === 'success' ? (
                        <polyline points="20 6 9 17 4 12"></polyline>
                     ) : (
                        <line x1="18" y1="6" x2="6" y2="18" /> && (
                           <line x1="6" y1="6" x2="18" y2="18" />
                        )
                     )}
                  </svg>
                  <p className="text-sm">{toast.message}</p>
               </div>
            </div>
         )}

         {/* Background animation */}
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1)_0%,transparent_50%)] animate-pulse"></div>
         </div>

         <h1 className="text-center text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white relative z-10 animate-fade-in-down">
            Emoji Browser
         </h1>

         {/* Tabs */}
         <div className="flex flex-wrap justify-center gap-3 mb-8 relative z-10">
            {categories.map((cat) => (
               <button
                  key={cat}
                  onClick={() => setSelectedTab(cat)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ease-out relative overflow-hidden group cursor-pointer ${
                     selectedTab === cat
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
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
                     className="aspect-square flex items-center justify-center text-2xl sm:text-5xl bg-white/5 hover:bg-white/20 active:bg-white/30 rounded-2xl transition-all duration-300 ease-out hover:scale-110 hover:rotate-3 active:scale-95 shadow-md hover:shadow-lg hover:shadow-yellow-500/20 border border-white/10 min-h-[4rem] sm:min-h-[5rem] relative overflow-hidden group">
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
            @keyframes slideIn {
               from {
                  transform: translateX(100%);
                  opacity: 0;
               }
               to {
                  transform: translateX(0);
                  opacity: 1;
               }
            }
            .animate-slideIn {
               animation: slideIn 0.3s ease-out;
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
