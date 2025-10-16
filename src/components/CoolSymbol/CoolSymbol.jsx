import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import Navbar from '../Navbar';

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
   const [toast, setToast] = useState({
      message: '',
      type: 'success', // 'success' | 'error'
      visible: false,
   });

   const handleCopy = async (symbol) => {
      try {
         await navigator.clipboard.writeText(symbol);
         showNotification('Copied to clipboard!', 'success');
      } catch (err) {
         showNotification('Failed to copy', 'error');
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
       
      <div className='z-50 mb-10 -mt-2 flex justify-center '>
          <Navbar/>
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
            Symbol Browser
         </h1>

         {/* Category Tabs */}
         <div className="flex flex-wrap justify-center gap-3 mb-8 relative z-10">
            {symbolCategories.map((cat, idx) => (
               <button
                  key={cat.title}
                  onClick={() => setActiveCategory(idx)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ease-out relative overflow-hidden group cursor-pointer ${
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