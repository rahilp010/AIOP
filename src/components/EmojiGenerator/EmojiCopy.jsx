/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, memo, useCallback, useEffect } from 'react';
import emojis from 'emoji-datasource';
import Navbar from '../Navbar';
import { CiMenuFries } from 'react-icons/ci';
import ReactCountryFlag from 'react-country-flag';

// Utility: Convert unified code to emoji char
const unifiedToEmoji = (unified) =>
   unified
      .split('-')
      .map((u) => String.fromCodePoint(parseInt(u, 16)))
      .join('');

// Memoized emoji button with flag support
const EmojiButton = memo(({ emoji, onCopy }) => {
   const isFlag = emoji.category?.toLowerCase().includes('flag');

   // Extract the 2-letter country code from unified (e.g., "1F1EE-1F1F3" → "IN")
   const countryCode = useMemo(() => {
      if (!isFlag) return null;
      const parts = emoji.unified?.split('-') || [];
      if (parts.length !== 2) return null;

      const code1 = parseInt(parts[0], 16);
      const code2 = parseInt(parts[1], 16);

      // Validate: Both must be regional indicators (U+1F1E6 to U+1F1FF)
      // This prevents invalid/negative code points for non-country flags
      if (
         isNaN(code1) ||
         isNaN(code2) ||
         code1 < 0x1f1e6 ||
         code1 > 0x1f1ff ||
         code2 < 0x1f1e6 ||
         code2 > 0x1f1ff
      ) {
         console.warn(
            `Invalid regional indicators for flag "${emoji.name}": ${emoji.unified}`
         ); // Optional: Log for debugging
         return null;
      }

      return (
         String.fromCodePoint(code1 - 0x1f1e6 + 65) +
         String.fromCodePoint(code2 - 0x1f1e6 + 65)
      );
   }, [isFlag, emoji.unified]);

   return (
      <button
         title={emoji.name}
         onClick={() => onCopy(emoji.char)}
         className="aspect-square flex items-center justify-center text-2xl sm:text-4xl 
               bg-white/5 hover:bg-white/20 active:bg-white/30 rounded-2xl 
               transition-all duration-300 ease-out hover:scale-110 hover:rotate-3 
               active:scale-95 shadow-md hover:shadow-lg hover:shadow-yellow-500/20 
               border border-white/10 min-h-[4rem] sm:min-h-[5rem] relative overflow-hidden group">
         {isFlag && countryCode ? (
            <ReactCountryFlag
               countryCode={countryCode}
               svg
               style={{ width: '1em', height: '1em' }}
            />
         ) : (
            <span className="transition-transform duration-300 group-hover:scale-110">
               {emoji.char}
            </span>
         )}
         <div
            className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
         />
      </button>
   );
});

// Toast notification component
const Toast = ({ toast }) => {
   if (!toast.visible) return null;
   const isSuccess = toast.type === 'success';

   return (
      <div className="fixed top-6 right-6 z-50 animate-slideIn">
         <div
            className={`px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 border backdrop-blur-md
          ${
             isSuccess
                ? 'bg-green-500/20 border-green-400 text-green-100'
                : 'bg-red-500/20 border-red-400 text-red-100'
          }`}>
            {isSuccess ? (
               <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
               </svg>
            ) : (
               <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
               </svg>
            )}
            <p className="text-sm">{toast.message}</p>
         </div>
      </div>
   );
};

export default function EmojiCopy() {
   const [selectedTab, setSelectedTab] = useState('All');
   const [searchTerm, setSearchTerm] = useState(''); // New: Search state
   const [toast, setToast] = useState({
      message: '',
      type: 'success',
      visible: false,
   });
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
   }, []);

   // Preprocess emojis once
   const processedEmojis = useMemo(
      () =>
         emojis.reduce((acc, e) => {
            if (!e.unified || !e.short_name) return acc;
            acc.push({
               char: unifiedToEmoji(e.unified),
               unified: e.unified,
               name: e.short_name,
               category: e.category || 'Others',
            });
            return acc;
         }, []),
      []
   );

   // Group by category
   const groupedEmojis = useMemo(() => {
      const groups = {};
      processedEmojis.forEach((emoji) => {
         if (!groups[emoji.category]) groups[emoji.category] = [];
         groups[emoji.category].push(emoji);
      });
      return groups;
   }, [processedEmojis]);

   const categories = useMemo(
      () => ['All', ...Object.keys(groupedEmojis)],
      [groupedEmojis]
   );

   // Updated: Filter by tab AND search term
   const displayedEmojis = useMemo(() => {
      let filtered =
         selectedTab === 'All'
            ? processedEmojis
            : groupedEmojis[selectedTab] || [];

      if (searchTerm.trim()) {
         const lowerSearch = searchTerm.toLowerCase();
         filtered = filtered.filter((emoji) =>
            emoji.name.toLowerCase().includes(lowerSearch)
         );
      }

      return filtered;
   }, [selectedTab, groupedEmojis, processedEmojis, searchTerm]);

   const showNotification = useCallback(
      (message, type = 'success', duration = 3000) => {
         setToast({ message, type, visible: true });
         setTimeout(
            () => setToast((prev) => ({ ...prev, visible: false })),
            duration
         );
      },
      []
   );

   const handleCopy = useCallback(
      async (emoji) => {
         try {
            await navigator.clipboard.writeText(emoji);
            showNotification(`Copied ${emoji} to clipboard!`, 'success');
         } catch {
            showNotification('Failed to copy 😞', 'error');
         }
      },
      [showNotification]
   );

   // New: Handle search input
   const handleSearchChange = useCallback((e) => {
      setSearchTerm(e.target.value);
      setSelectedTab('All');
   }, []);

   // Optional: Clear search on tab change (uncomment if desired)
   // useEffect(() => {
   //    setSearchTerm('');
   // }, [selectedTab]);

   return (
      <div className="min-h-[100dvh] bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans px-4 py-20 md:px-10 relative overflow-y-auto h-[100dvh] customScrollbar indexwise">
         <div
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="fixed top-6 left-6 z-50 p-3 rounded-2xl 
                              bg-white/10 backdrop-blur-xl border border-white/20
                              hover:bg-white/20 hover:scale-105
                              active:scale-95
                              transition-all duration-300 
                              shadow-lg shadow-black/20 cursor-pointer">
            <CiMenuFries size={24} className="text-white" />
         </div>

         <Navbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isMobile={isMobile}
         />

         <Toast toast={toast} />

         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1)_0%,transparent_50%)] animate-pulse"></div>
         </div>

         <h1 className="text-center text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white relative animate-fade-in-down">
            Emoji Browser
         </h1>

         {/* Search Input */}
         <div className="max-w-2xl mx-auto mb-8 relative">
            <div className="relative">
               <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <path
                     d="M21 21l-4.35-4.35"
                     strokeWidth="2"
                     strokeLinecap="round"
                  />
               </svg>
               <input
                  type="text"
                  placeholder="Search emojis by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/10 border border-white/20 
                             backdrop-blur-lg text-white placeholder-white/50 
                             focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50
                             transition-all duration-300 text-base font-medium
                             hover:bg-white/15"
               />
               {searchTerm && (
                  <button
                     onClick={() => setSearchTerm('')}
                     className="absolute right-4 top-1/2 transform -translate-y-1/2 
                                w-6 h-6 flex items-center justify-center
                                text-white/60 hover:text-white hover:bg-white/10 
                                rounded-full transition-all duration-200">
                     <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                     </svg>
                  </button>
               )}
            </div>
            {searchTerm && (
               <p className="text-sm text-white/60 mt-2 ml-1 absolute top-2.5 font-semibold right-15">
                  Found{' '}
                  <span className="font-bold text-red-400">
                     {displayedEmojis.length}
                  </span>{' '}
                  emoji
                  {displayedEmojis.length !== 1 ? 's' : ''}
               </p>
            )}
         </div>

         <div className="flex flex-wrap justify-center gap-3 mb-8 relative">
            {categories
               .filter(
                  (cat) =>
                     cat !== 'All' && cat !== 'Flag' && cat !== 'Component'
               )
               .map((cat) => (
                  <button
                     key={cat}
                     onClick={() => setSelectedTab(cat)}
                     className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ease-out relative overflow-hidden group cursor-pointer
              ${
                 selectedTab === cat
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}>
                     <span className="relative">{cat}</span>
                  </button>
               ))}
         </div>

         <div
            key={`${selectedTab}-${searchTerm}`} // Key includes search for re-render on search
            className="max-w-4xl mx-auto p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg 
                      shadow-2xl shadow-black/20 animate-fade-in overflow-y-auto customScrollbar h-[75vh]">
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-10 gap-1.5">
               {displayedEmojis.length > 0 ? (
                  displayedEmojis.map((emoji, i) => (
                     <EmojiButton key={i} emoji={emoji} onCopy={handleCopy} />
                  ))
               ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-8 text-center text-gray-400">
                     <span className="text-6xl mb-4">🔍</span>
                     <p className="text-lg">
                        No emojis found matching "{searchTerm}"
                     </p>
                     <p className="text-sm mt-2">
                        Try a different search term or tab.
                     </p>
                  </div>
               )}
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
            .animate-slideIn {
               animation: slideIn 0.3s ease-out;
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
}
