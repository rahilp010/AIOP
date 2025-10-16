/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo } from 'react';
import { Copy, Heart } from 'lucide-react';
import fontMaps from './text';
import { toast } from 'react-toastify';
import Navbar from '../Navbar';

const FancyFontGenerator = () => {
   const [inputText, setInputText] = useState('');
   const [includeEmojis, setIncludeEmojis] = useState(false);
   const [copiedIndex, setCopiedIndex] = useState(null);
   const [favorites, setFavorites] = useState([]);

   const [toast, setToast] = useState({
      message: '',
      type: 'success', // 'success' | 'error'
      visible: false,
   });

   const transformations = [
      { name: 'Bold Sans', icon: '𝗕', mapKey: 'sans_bold' },
      { name: 'Bold Italic', icon: '𝗕', mapKey: 'bold_italic' },
      { name: 'Italic Sans', icon: '𝘪', mapKey: 'sans_italic' },
      { name: 'Gothic Fraktur', icon: '𝔊', mapKey: 'fraktur' },
      { name: 'Bubble Circled', icon: 'ⓑ', mapKey: 'circled' },
      { name: 'Small Caps', icon: 'ꜱ', mapKey: 'smallcaps' },
      { name: 'Cursive Script', icon: '𝓒', mapKey: 'bold_script' },
      { name: 'Double Struck', icon: '𝕯', mapKey: 'double_struck' },
      { name: 'Monospace', icon: '𝙼', mapKey: 'monospace' },
      { name: 'Sans Serif', icon: '𝖲', mapKey: 'sans' },
      { name: 'Fancy Fraktur', icon: '𝔊', mapKey: 'fraktur' },
      {
         name: 'Strikethrough',
         icon: 'S̶',
         transform: (text) => {
            if (!text) return '';
            return text
               .split('')
               .map((c) => (/[\s\W]/.test(c) ? c : c + '\u0336'))
               .join('');
         },
         previewStyle: { textDecoration: 'line-through' },
      },
      {
         name: 'Underline',
         icon: 'U̲',
         transform: (text) => {
            if (!text) return '';
            return text
               .split('')
               .map((c) => (/[\s\W]/.test(c) ? c : c + '\u0331'))
               .join('');
         },
         previewStyle: { textDecoration: 'underline' },
      },
   ];

   const handleCopy = (text, index) => {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      showNotification('Copied to clipboard!', 'success', 2000);
      setTimeout(() => setCopiedIndex(null), 2000);
   };

   const handleFavorite = (name) => {
      setFavorites((prev) =>
         prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
      );
   };

   const applyEmojis = (text) => (includeEmojis ? `${text} ✨🌈🔥` : text);

   const getTransform = (item, text) => {
      if (item.transform) return item.transform(text);
      if (item.mapKey && fontMaps[item.mapKey]) {
         return text
            .split('')
            .map((c) => fontMaps[item.mapKey][c] || c)
            .join('');
      }
      return text;
   };

   // Sort so favorites come first
   const sortedTransformations = useMemo(() => {
      return [...transformations].sort((a, b) => {
         const aFav = favorites.includes(a.name);
         const bFav = favorites.includes(b.name);
         if (aFav === bFav) return 0;
         return aFav ? -1 : 1;
      });
   }, [favorites]);

   const showNotification = (message, type = 'success', duration = 3000) => {
      setToast({ message, type, visible: true });
      setTimeout(
         () => setToast((prev) => ({ ...prev, visible: false })),
         duration
      );
   };

   return (
      <div className="max-h-screen flex flex-col items-center py-16 px-4 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-auto customScrollbar">
         <div className="z-50 mb-10 -mt-10 flex justify-center ">
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

         <div className="relative z-10 text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-medium text-white mb-3 tracking-tight">
               Fancy Font Generator
            </h1>
            <p className="text-gray-400 text-lg">
               Create stylish text instantly — clean & minimal.
            </p>
         </div>

         <div className="relative z-10 w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 shadow-2xl backdrop-blur-xl">
            <textarea
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               placeholder="Type or paste your text here..."
               className="w-full p-5 bg-black/50 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none text-white text-lg placeholder-gray-500"
               rows="4"
            />
            <div className="flex items-center justify-between mt-5">
               <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                     type="checkbox"
                     checked={includeEmojis}
                     onChange={(e) => setIncludeEmojis(e.target.checked)}
                     className="rounded"
                  />
                  Add emojis
               </label>
               {inputText && (
                  <button
                     onClick={() => setInputText('')}
                     className="text-white font-bold cursor-pointer bg-red-500 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition">
                     Clear
                  </button>
               )}
            </div>
         </div>

         <div className="relative z-10 w-full max-w-3xl grid grid-cols-1 gap-4">
            {sortedTransformations.map(
               ({ name, icon, mapKey, transform, previewStyle }, index) => {
                  const copyText = applyEmojis(
                     getTransform(
                        { name, icon, mapKey, transform },
                        inputText || name
                     )
                  );
                  const isCopied = copiedIndex === index;
                  const isFav = favorites.includes(name);

                  return (
                     <div
                        key={name}
                        className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden">
                        <div className="flex justify-between items-center gap-5">
                           <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="text-3xl text-gray-400 shrink-0">
                                 {icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="text-xs flex gap-3 items-center text-gray-500 mb-1 font-medium uppercase tracking-wider">
                                    <span>{name}</span>
                                    {index < 3 && (
                                       <span className="rounded-4xl px-4 py-1 text-center  bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-500 text-xs font-semibold shadow-md">
                                          TRENDING
                                       </span>
                                    )}
                                 </div>
                                 <div
                                    className={`text-white text-lg break-words ${
                                       previewStyle ? 'inline' : ''
                                    }`}>
                                    {previewStyle ? (
                                       <span style={previewStyle}>
                                          {copyText.replace(
                                             /[\u0336\u0331]/g,
                                             ''
                                          )}
                                       </span> // Strip combiners for clean CSS preview
                                    ) : (
                                       copyText
                                    )}
                                 </div>
                              </div>
                           </div>

                           <Heart
                              size={22}
                              className={`cursor-pointer transition-all duration-200 hover:scale-125 ${
                                 isFav
                                    ? 'text-red-500'
                                    : 'text-gray-500 hover:text-red-500'
                              }`}
                              onClick={() => handleFavorite(name)}
                              fill={isFav ? 'currentColor' : 'none'}
                           />

                           <button
                              onClick={() => handleCopy(copyText, index)}
                              className={`shrink-0 px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium transition-all duration-200 shadow ${
                                 isCopied
                                    ? 'bg-gray-700 text-white'
                                    : 'bg-white text-black hover:bg-gray-200'
                              }`}>
                              <Copy size={18} />
                              <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                           </button>
                        </div>
                     </div>
                  );
               }
            )}
         </div>

         {/* Animations */}
         <style>{`
            @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            .animate-slideIn {
              animation: slideIn 0.3s ease-out;
            }
         `}</style>
      </div>
   );
};

export default FancyFontGenerator;