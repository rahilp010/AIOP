import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

const symbolCategories = [
  {
    title: "Stars Symbols",
    symbols: ["★", "☆", "✡", "✦", "✧", "✩", "✪", "✫", "✬", "✭", "✮", "✯", "✰", "⁂", "⁎", "⁑", "✢", "✣", "✤", "✥", "✱", "✲", "✳", "✴", "✵", "✶", "✷", "✸", "✹", "✺", "✻", "✼", "✽", "✾", "✿", "❀", "❁", "❂", "❃", "❇", "❈", "❉", "❊", "❋", "⋆", "🌟", "💫", "✨", "⭐"]
  },
  {
    title: "Copyright & Trademark",
    symbols: ["©", "®", "™", "℠", "℡", "℗", "‱", "№", "℀", "℁", "℅", "℆", "⅍", "☎", "☏", "✁", "✂", "✃", "✄", "✆", "✇", "✈", "✉", "✎", "✏", "✐", "✑", "✒", "‰", "§", "¶"]
  },
  {
    title: "Currency Symbols",
    symbols: ["¢", "$", "€", "£", "¥", "₹", "₽", "฿", "₠", "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₩", "₪", "₫", "₭", "₯", "₰", "₱", "₲", "₳", "₴", "₵", "¤", "ƒ"]
  },
  {
    title: "Bracket Symbols",
    symbols: ["〈", "〉", "《", "》", "「", "」", "『", "』", "【", "】", "〔", "〕", "︵", "︶", "︷", "︸", "︹", "︺", "︻", "︼", "︽", "︾", "︿", "﹀", "﹁", "﹂", "﹃", "﹄", "（", "）", "｛", "｝", "«", "»", "‹", "›"]
  },
  {
    title: "Chess & Card",
    symbols: ["♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟", "♤", "♠", "♧", "♣", "♡", "♥", "♢", "♦"]
  },
  {
    title: "Musical Notes",
    symbols: ["♩", "♪", "♫", "♬", "♭", "♮", "♯", "𝄞", "𝄢", "𝄫", "𝄪", "🎵", "🎶", "🎼"]
  },
  {
    title: "Arrow Symbols",
    symbols: ["←", "↑", "→", "↓", "↔", "↕", "↖", "↗", "↘", "↙", "↚", "↛", "↜", "↝", "↞", "↟", "↠", "↡", "↢", "↣", "↤", "↥", "↦", "↧", "↨", "⇐", "⇑", "⇒", "⇓", "⇔", "⇕", "⇖", "⇗", "⇘", "⇙", "⇚", "⇛", "⇜", "⟵", "⟶", "⟷", "⟸", "⟹", "⟺", "➔", "➘", "➙", "➚", "➛", "➜", "➝", "➞", "➟", "➠", "➡", "➢", "➣", "➤"]
  },
  {
    title: "Heart & Love",
    symbols: ["♡", "♥", "❤", "❥", "❦", "❧", "💕", "💖", "💗", "💘", "💙", "💚", "💛", "💜", "💝", "💞", "💟", "💓", "💔", "❣"]
  },
  {
    title: "Math Symbols",
    symbols: ["±", "×", "÷", "∓", "∔", "∕", "∖", "∗", "∘", "∙", "√", "∛", "∜", "∝", "∞", "∟", "∠", "∡", "∢", "∣", "∤", "∥", "∦", "∧", "∨", "∩", "∪", "∫", "∬", "∭", "∮", "∯", "∰", "∱", "∲", "∳", "⊕", "⊗", "⊙", "≈", "≠", "≡", "≤", "≥", "⊂", "⊃", "⊄", "⊅", "⊆", "⊇"]
  },
  {
    title: "Weather & Nature",
    symbols: ["☀", "☁", "☂", "☃", "☄", "★", "☆", "☇", "☈", "☉", "☊", "☋", "☌", "☍", "☼", "☽", "☾", "☿", "♀", "♁", "♂", "♃", "♄", "♅", "♆", "♇", "🌙", "🌞", "🌝", "🌛", "🌜", "🌚", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "⛅", "🌤", "🌦", "🌧", "⛈", "🌩", "🌨", "❄", "☃", "⛄", "🌬", "💨", "🌪", "🌫", "☔", "💧", "💦", "🌊"]
  },
  {
    title: "Flower & Plant",
    symbols: ["❀", "❁", "❃", "❋", "✿", "✾", "✽", "✼", "✻", "✺", "✹", "✸", "✷", "❦", "❧", "🌸", "🌺", "🌻", "🌷", "🌹", "🥀", "🌼", "🌿", "☘", "🍀", "🍁", "🍂", "🍃", "🌾", "🌱", "🌲", "🌳", "🌴", "🌵"]
  },
  {
    title: "Hand & Finger",
    symbols: ["☜", "☝", "☞", "☟", "✌", "✍", "👆", "👇", "👈", "👉", "👊", "👋", "👌", "👍", "👎", "👏", "🙌", "🙏", "💪", "🤝", "🤞", "🤘", "🤙", "🖐", "✋"]
  },
  {
    title: "Face & Emotion",
    symbols: ["☹", "☺", "☻", "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😈", "😉", "😊", "😋", "😌", "😍", "😎", "😏", "😐", "😑", "😒", "😓", "😔", "😕", "😖", "😗", "😘", "😙", "😚", "😛", "😜", "😝", "😞", "😟", "😠", "😡", "😢", "😣", "😤", "😥", "😦", "😧", "😨", "😩", "😪", "😫", "😬", "😭", "😮", "😯", "😰", "😱", "😲", "😳", "😴", "😵", "😶", "😷"]
  }
];

const CoolSymbol = () => {
   const [activeCategory, setActiveCategory] = useState(0);
   const [toasts, setToasts] = useState([]);

   const addToast = (message, symbol) => {
      const id = Date.now();
      const newToast = { id, message, symbol };
      setToasts(prev => [...prev, newToast]);

      setTimeout(() => {
         removeToast(id);
      }, 2000);
   };

   const removeToast = (id) => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
   };

   const handleCopy = async (symbol) => {
      try {
         await navigator.clipboard.writeText(symbol);
         addToast('Copied to clipboard!', symbol);
      } catch (err) {
         addToast('Failed to copy', '❌');
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans px-4 py-8 md:px-10 relative overflow-auto h-screen customScrollbar">
         {/* Background animation */}
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1)_0%,transparent_50%)] animate-pulse"></div>
         </div>

         {/* Custom Toast Container */}
         <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 space-y-3 max-w-[calc(100vw-2rem)] sm:max-w-sm w-full pointer-events-none">
            {toasts.map((toast) => (
               <div
                  key={toast.id}
                  className="toast-slide-up pointer-events-auto">
                  <div className="relative backdrop-blur-xl bg-gradient-to-r from-emerald-500/90 to-green-600/90 border border-emerald-400/50 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
                     {/* Progress Bar */}
                     <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
                        <div className="h-full bg-white/60 toast-progress"></div>
                     </div>
                     
                     <div className="p-3 sm:p-4 pr-10 sm:pr-12">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                           <div className="text-white text-xl sm:text-2xl flex-shrink-0">
                              {toast.symbol}
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-white font-medium text-xs sm:text-sm">
                                 {toast.message}
                              </p>
                           </div>
                        </div>
                     </div>

                     <button
                        onClick={() => removeToast(toast.id)}
                        className="absolute top-2 sm:top-3 right-2 sm:right-3 text-white/80 hover:text-white transition-colors duration-200">
                        <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                     </button>
                  </div>
               </div>
            ))}
         </div>

         <h1 className="text-center text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white relative z-10 animate-fade-in-down">
            Symbol Browser
         </h1>

         {/* Category Tabs */}
         <div className="flex flex-wrap justify-center gap-3 mb-8 relative z-10">
            {symbolCategories.map((cat, idx) => (
               <button
                  key={cat.title}
                  onClick={() => setActiveCategory(idx)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ease-out relative overflow-hidden group ${
                     activeCategory === idx 
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black' 
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}>
                  <span className="relative z-10 text-sm">{cat.title}</span>
               </button>
            ))}
         </div>

         {/* Symbol Grid */}
         <div className="max-w-6xl mx-auto p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg shadow-2xl shadow-black/20 animate-fade-in  overflow-y-auto customScrollbar h-[75vh]">
            <h2 className="text-2xl font-semibold mb-6 text-yellow-400">
               {symbolCategories[activeCategory].title}
            </h2>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
               {symbolCategories[activeCategory].symbols.map((symbol, i) => (
                  <button
                     key={i}
                     onClick={() => handleCopy(symbol)}
                     className="aspect-square flex items-center justify-center text-3xl sm:text-4xl bg-white/5 hover:bg-white/20 active:bg-white/30 rounded-xl transition-all duration-300 ease-out hover:scale-110 hover:rotate-3 active:scale-95 shadow-md hover:shadow-lg hover:shadow-yellow-500/20 border border-white/10 relative overflow-hidden group">
                     <span className="transition-transform duration-300 group-hover:scale-110">
                        {symbol}
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
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
            @keyframes slideUp {
               from {
                  transform: translateY(100px);
                  opacity: 0;
               }
               to {
                  transform: translateY(0);
                  opacity: 1;
               }
            }
            @keyframes progress {
               from {
                  width: 100%;
               }
               to {
                  width: 0%;
               }
            }
            .animate-fade-in-down {
               animation: fade-in-down 0.6s ease-out;
            }
            .animate-fade-in {
               animation: fade-in 0.5s ease-out;
            }
            .toast-slide-up {
               animation: slideUp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            .toast-progress {
               animation: progress 2s linear;
            }
            
            /* Custom Scrollbar */
            .custom-scrollbar::-webkit-scrollbar {
               width: 8px;
               height: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
               background: rgba(255, 255, 255, 0.05);
               border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
               background: rgba(251, 191, 36, 0.5);
               border-radius: 10px;
               transition: background 0.3s;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
               background: rgba(251, 191, 36, 0.8);
            }
            
            /* Firefox */
            .custom-scrollbar {
               scrollbar-width: thin;
               scrollbar-color: rgba(251, 191, 36, 0.5) rgba(255, 255, 255, 0.05);
            }
         `}</style>
      </div>
   );
};

export default CoolSymbol;