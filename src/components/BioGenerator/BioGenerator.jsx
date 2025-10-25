import { useEffect, useState } from 'react';
import { PiSparkleLight } from 'react-icons/pi';
import Navbar from '../Navbar';
import { CiMenuFries } from 'react-icons/ci';
import { SelectPicker } from 'rsuite';

export default function BioGenerator() {
   const [description, setDescription] = useState('');
   const [bio, setBio] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isCopied, setIsCopied] = useState(false);
   const [toast, setToast] = useState({
      message: '',
      type: '',
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

   const [tone, setTone] = useState('');

   const GEMINI_API_KEY = 'AIzaSyCDnt2WyRWrZVX2MgSDLmFNWR8kEySNWRE';

   /** 🔔 Show notification (success/error) */
   const showNotification = (message, type = 'success', duration = 2500) => {
      setToast({ message, type, visible: true });
      setTimeout(
         () => setToast((prev) => ({ ...prev, visible: false })),
         duration
      );
   };

   const generateBio = async (desc) => {
      try {
         const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  contents: [
                     {
                        parts: [
                           {
                              text: `You are a creative social media strategist and Instagram bio expert.
Generate 3 unique, catchy, and engaging Instagram bios for the following user description:
"${desc}"

Each bio should:
- Have a distinct style but match the "${tone}" tone.
- Be maximum **3 lines long** (around 150 characters total).
- Be natural, readable, and formatted cleanly with line breaks.
- Include relevant emojis if appropriate.
- NOT include hashtags or extra commentary.

Return only the three bios separated clearly with line breaks (--- between each).`,
                           },
                        ],
                     },
                  ],
               }),
            }
         );

         if (!res.ok) throw new Error('Failed to fetch bio');
         const data = await res.json();
         const text =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

         if (!text) throw new Error('No bio generated');

         // Split 3 bios using separator (---)
         const bios = text
            .split(/---+/)
            .map((b) => b.trim())
            .filter((b) => b.length > 0);

         showNotification('✅ 3 Bios generated successfully!');
         return bios.length ? bios : [text]; // fallback in case no split worked
      } catch (err) {
         console.error('Gemini API error:', err);
         showNotification(err.message || 'Error generating bio', 'error');
         return [];
      }
   };

   /** 🚀 Handle generation */
   const handleSubmit = async () => {
      if (description.length < 10)
         return showNotification('Enter at least 10 characters', 'error');
      if (description.length > 300)
         return showNotification('Max 300 characters allowed', 'error');

      setIsLoading(true);
      setBio([]);

      const bio = await generateBio(description);
      setBio(bio);
      setIsLoading(false);
   };

   /** 📋 Copy bio */
   const handleCopy = () => {
      if (!bio.length) return;
      navigator.clipboard.writeText(bio.join(' '));
      setIsCopied(true);
      showNotification(`${bio.length} bio copied!`);
      setTimeout(() => setIsCopied(false), 2000);
   };

   const toneOptions = [
      { label: '😂 Funny', value: 'funny' },
      { label: '😐 Serious', value: 'serious' },
      { label: '🎨 Creative', value: 'creative' },
      { label: '🌟 Inspirational', value: 'inspirational' },
      { label: '💪 Motivational', value: 'motivational' },
      { label: '😄 Humorous', value: 'humorous' },
      { label: '😜 Playful', value: 'playful' },
      { label: '😊 Charming', value: 'charming' },
      { label: '✨ Charismatic', value: 'charismatic' },
   ];

   return (
      <div className="min-h-[100dvh] bg-gradient-to-br from-black via-gray-900 to-black text-white">
         {/* Toast Notification - Responsive positioning */}
         {toast.visible && (
            <div className="fixed top-4 right-4 left-4 sm:left-auto sm:top-6 sm:right-6 animate-slideIn z-50">
               <div
                  className={`px-4 py-3 sm:px-6 rounded-xl shadow-lg flex items-center gap-2 border backdrop-blur-md ${
                     toast.type === 'error'
                        ? 'bg-red-500/20 border-red-400 text-red-100'
                        : 'bg-green-500/20 border-green-400 text-green-100'
                  }`}>
                  <svg
                     className="w-5 h-5 flex-shrink-0"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2">
                     {toast.type === 'error' ? (
                        <>
                           <line x1="18" y1="6" x2="6" y2="18" />
                           <line x1="6" y1="6" x2="18" y2="18" />
                        </>
                     ) : (
                        <polyline points="20 6 9 17 4 12" />
                     )}
                  </svg>
                  <p className="text-sm">{toast.message}</p>
               </div>
            </div>
         )}

         {/* Main Content - Responsive padding and layout */}
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-6 max-h-[100dvh] overflow-auto customScrollbar">
            <button
               onClick={() => setSidebarOpen((prev) => !prev)}
               className="fixed top-6 left-6 z-40 p-3 rounded-2xl 
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
            <div className="max-w-4xl mx-auto">
               {/* Card Container - Responsive padding */}
               <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-xl space-y-6 sm:space-y-8 mt-16 ">
                  {/* Header - Responsive text sizes */}
                  <div className="text-center space-y-2 sm:space-y-3">
                     <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-br from-white/60 via-white to-black bg-clip-text text-transparent">
                        Bio Generator
                     </h1>
                     <p className="text-sm sm:text-base text-gray-300 px-4">
                        Generate unique and trending Instagram bio powered by AI
                        ✨
                     </p>
                  </div>

                  {/* Input Section - Responsive */}
                  <div>
                     <label className="block mb-2 font-semibold text-gray-200 text-sm sm:text-base">
                        Describe yourself in a few words
                     </label>
                     <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyDown={(e) =>
                           e.ctrlKey && e.key === 'Enter' && handleSubmit()
                        }
                        placeholder="e.g. A cozy café morning with latte art ☕🌿..."
                        className="w-full p-3 sm:p-4 bg-black/50 border border-gray-700 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition text-sm sm:text-base resize-none"
                        rows="4"
                     />
                     <div className="mt-2 text-xs sm:text-sm text-gray-400 text-right">
                        {description.length}/300 characters
                     </div>
                  </div>

                  <div className="space-y-3 -mt-2">
                     <label className="block font-semibold text-gray-200 text-sm sm:text-base">
                        Tone of Bio
                     </label>

                     <div className="flex flex-wrap gap-2">
                        {toneOptions.map((option) => (
                           <button
                              key={option.value}
                              type="button"
                              onClick={() => setTone(option.value)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                                 option.value === tone
                                    ? 'bg-white/20 border-2 border-white/50 backdrop-blur-sm text-white shadow-lg shadow-white/20 scale-105 ring-2 ring-white/30'
                                    : 'bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 text-gray-300 backdrop-blur-sm hover:scale-105'
                              }`}>
                              <span className="text-base">
                                 {option.label.split(' ')[0]}
                              </span>{' '}
                              {/* Emoji */}
                              <span className="text-xs">
                                 {option.label.split(' ').slice(1).join(' ')}
                              </span>{' '}
                              {/* Text */}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Generate Button - Responsive sizing */}
                  <button
                     onClick={handleSubmit}
                     disabled={isLoading}
                     className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg 
                     bg-gradient-to-r from-black/60 to-gray-800/60 
                     border border-white/10 backdrop-blur-md 
                     hover:from-gray-900/70 hover:to-black/70 
                     hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]
                     transition-all transform hover:scale-[1.02] active:scale-100 
                     shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                     {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                           <svg
                              className="w-5 h-5 animate-spin text-white"
                              viewBox="0 0 24 24">
                              <circle
                                 cx="12"
                                 cy="12"
                                 r="10"
                                 stroke="currentColor"
                                 strokeWidth="4"
                                 fill="none"
                                 opacity="0.25"
                              />
                              <path
                                 d="M12 2a10 10 0 0 1 10 10"
                                 stroke="currentColor"
                                 strokeWidth="4"
                                 fill="none"
                              />
                           </svg>
                           <span className="text-sm sm:text-base">
                              Generating...
                           </span>
                        </div>
                     ) : (
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                           <PiSparkleLight size={20} />
                           <span>Generate Bio</span>
                        </div>
                     )}
                  </button>

                  {/* Results Section - Responsive height and padding */}
                  <div className="relative max-h-[300px] sm:max-h-[350px] lg:max-h-[400px] overflow-y-auto border border-white/20 bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-md customScrollbar">
                     {bio.length > 0 && (
                        <button
                           onClick={handleCopy}
                           className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition z-10"
                           aria-label="Copy bio">
                           {isCopied ? (
                              <svg
                                 className="w-4 h-4 text-green-400"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2">
                                 <polyline points="20 6 9 17 4 12" />
                              </svg>
                           ) : (
                              <svg
                                 className="w-4 h-4 text-white"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2">
                                 <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                    ry="2"
                                 />
                                 <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                           )}
                        </button>
                     )}

                     {/* Hashtags Grid - Responsive gap and sizing */}
                     <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {isLoading ? (
                           [...Array(12)].map((_, i) => (
                              <div
                                 key={i}
                                 className="w-20 h-6 sm:w-24 sm:h-7 bg-white/10 rounded-full animate-shimmer"
                              />
                           ))
                        ) : bio.length ? (
                           bio.map((text, i) => (
                              <div
                                 key={i}
                                 className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 
      border border-white/20 rounded-xl p-4 sm:p-5 text-sm sm:text-base 
      text-gray-100 leading-relaxed whitespace-pre-line hover:scale-[1.01] 
      transition-transform duration-200 shadow-lg shadow-black/20">
                                 {text}
                              </div>
                           ))
                        ) : (
                           <div className="h-24 sm:h-32 flex items-center justify-center">
                              <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-2">
                                 <PiSparkleLight
                                    size={20}
                                    className="hidden sm:block"
                                 />
                                 <PiSparkleLight
                                    size={16}
                                    className="sm:hidden"
                                 />
                                 No Insta Bio yet.
                              </p>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Keyboard Shortcut Hint - Hidden on very small screens */}
                  <div className="hidden sm:block text-center text-xs text-gray-500">
                     Press{' '}
                     <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">
                        Ctrl
                     </kbd>{' '}
                     +{' '}
                     <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">
                        Enter
                     </kbd>{' '}
                     to generate
                  </div>
               </div>
            </div>
         </div>

         {/* Animations */}
         <style>{`
            @keyframes shimmer {
               0% { background-position: 200% 0; }
               100% { background-position: -200% 0; }
            }
            .animate-shimmer {
               background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
               background-size: 200% 100%;
               animation: shimmer 1.5s infinite;
            }
            @keyframes slideIn {
               from { transform: translateX(100%); opacity: 0; }
               to { transform: translateX(0); opacity: 1; }
            }
            .animate-slideIn {
               animation: slideIn 0.3s ease-out;
            }
            select:hover {
               background-color: rgba(0, 0, 0, 0.9);
            }
            select:focus {
               outline: none;
            }
         `}</style>
      </div>
   );
}
