import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import fontMaps from './text';
import { toast } from 'react-toastify';

const FancyFontGenerator = () => {
   const [inputText, setInputText] = useState('');
   const [includeEmojis, setIncludeEmojis] = useState(false);
   const [copiedIndex, setCopiedIndex] = useState(null);
   const [isFav, setIsFav] = useState(false);

   const transformations = [
      { name: 'Bold Sans', icon: '𝗕', mapKey: 'sans_bold' },
      { name: 'Italic Sans', icon: '𝘪', mapKey: 'sans_italic' },
      { name: 'Gothic Fraktur', icon: '𝔊', mapKey: 'fraktur' },
      { name: 'Bubble Circled', icon: 'ⓑ', mapKey: 'circled' },
      { name: 'Bold Italic', icon: '𝗕', mapKey: 'bold_italic' },
      { name: 'Small Caps', icon: 'ꜱ', mapKey: 'smallcaps' },
      { name: 'Cursive Script', icon: '𝓒', mapKey: 'bold_script' },
      { name: 'Double Struck', icon: '𝕯', mapKey: 'double_struck' },
      { name: 'Monospace', icon: '𝙼', mapKey: 'monospace' },
      { name: 'Sans Serif', icon: '𝖲', mapKey: 'sans' },
      { name: 'Fancy Fraktur', icon: '𝔊', mapKey: 'fraktur' },
      {
         name: 'Strikethrough',
         icon: 'S̶',
         transform: (text) =>
            text
               .split('')
               .map((c) => c + '\u0336')
               .join(''),
      },
      {
         name: 'Underline',
         icon: 'U̲',
         transform: (text) =>
            text
               .split('')
               .map((c) => c + '\u0332')
               .join(''),
      },
   ];

   const handleCopy = (text, index) => {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
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

   return (
      <div className="max-h-screen flex flex-col items-center py-16 px-4 bg-black text-white relative overflow-auto">
         {/* Background subtle gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black opacity-95"></div>

         {/* Header */}
         <div className="relative z-10 text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-medium text-white mb-3 tracking-tight">
               Fancy Font Generator
            </h1>
            <p className="text-gray-400 text-lg">
               Create stylish text instantly — clean & minimal.
            </p>
         </div>

         {/* Input Card */}
         <div className="relative z-10 w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 shadow-2xl backdrop-blur-xl">
            <textarea
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               placeholder="Type or paste your text here..."
               className="w-full p-5 bg-black/50 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none text-white text-lg placeholder-gray-500"
               rows="4"
            />
            <div className="flex items-center justify-end mt-5">
               {inputText && (
                  <button
                     onClick={() => setInputText('')}
                     className="text-white font-bold cursor-pointer bg-red-500 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition">
                     Clear
                  </button>
               )}
            </div>
         </div>

         {/* Output Styles */}
         <div className="relative z-10 w-full max-w-3xl grid grid-cols-1 gap-4">
            {transformations.map(({ name, icon, mapKey, transform }, index) => {
               const styledText = applyEmojis(
                  getTransform(
                     { name, icon, mapKey, transform },
                     inputText || name
                  )
               );
               const isCopied = copiedIndex === index;

               return (
                  <div
                     key={name}
                     className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden">

                     <div className="flex justify-between items-center gap-4">
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
                              <div className="text-white text-lg break-words">
                                 {styledText}
                              </div>
                           </div>
                        </div>

                        <button
                           onClick={() => handleCopy(styledText, index)}
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
            })}
         </div>
      </div>
   );
};

export default FancyFontGenerator;
