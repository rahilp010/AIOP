import { useState } from 'react';
import Navbar from '../Navbar';
import { PiSparkleLight } from 'react-icons/pi';

export default function HashtagGenerator() {
   const [description, setDescription] = useState('');
   const [hashtags, setHashtags] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isCopied, setIsCopied] = useState(false);

   // Unified notification state
   const [toast, setToast] = useState({
      message: '',
      type: 'success', // 'success' | 'error'
      visible: false,
   });

   const GEMINI_API_KEY = 'AIzaSyCDnt2WyRWrZVX2MgSDLmFNWR8kEySNWRE';

   // Unified notification function
   const showNotification = (message, type = 'success', duration = 3000) => {
      setToast({ message, type, visible: true });
      setTimeout(
         () => setToast((prev) => ({ ...prev, visible: false })),
         duration
      );
   };

   // Gemini API integration
   const generateHashtags = async (description) => {
      try {
         const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  contents: [
                     {
                        parts: [
                           {
                              text: `You are a social media expert.
Generate 15 short, relevant, trending hashtags based on the following description:
"${description}"
Return only hashtags separated by spaces, no explanations.`,
                           },
                        ],
                     },
                  ],
               }),
            }
         );

         if (!response.ok) throw new Error('Failed to fetch hashtags');

         const data = await response.json();
         const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

         const tags = text
            .split(/[\s,]+/)
            .filter((t) => t.startsWith('#'))
            .slice(0, 15);

         if (tags.length === 0) throw new Error('No hashtags generated');

         showNotification('Hashtags generated successfully!', 'success');
         return tags;
      } catch (error) {
         console.error('Gemini API error:', error);
         showNotification(
            error.message || 'Could not generate hashtags',
            'error'
         );
         return [];
      }
   };

   const handleSubmit = async () => {
      if (description.length < 10)
         return showNotification('Enter at least 10 characters', 'error');
      if (description.length > 300)
         return showNotification('Max 300 characters allowed', 'error');

      setIsLoading(true);
      setHashtags([]);

      const tags = await generateHashtags(description);
      setHashtags(tags);
      setIsLoading(false);
   };

   const handleCopy = () => {
      if (hashtags.length === 0) return;
      navigator.clipboard.writeText(hashtags.join(' '));
      setIsCopied(true);
      showNotification(`${hashtags.length} hashtags copied!`, 'success');
      setTimeout(() => setIsCopied(false), 2000);
   };

   const handleKeyPress = (e) => {
      if (e.key === 'Enter' && e.ctrlKey) handleSubmit();
   };

   return (
      <div className="bg-gradient-to-br from-black via-gray-900 to-black p-6 text-white">
         <div className="z-50 mb-5 flex justify-center">
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

         <div className="max-h-screen flex justify-center items-center overflow-auto customScrollbar pt-48 pb-20">
            <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 shadow-2xl backdrop-blur-xl space-y-8">
               <div className="text-center space-y-3">
                  <h1 className="text-5xl font-extrabold bg-gradient-to-br from-white/50 via-white to-black bg-clip-text text-transparent">
                     InstaHash
                  </h1>
                  <p className="text-gray-300">
                     Generate unique and trending hashtags powered by AI ✨
                  </p>
               </div>

               <div>
                  <label className="block mb-2 font-semibold text-gray-200">
                     Post Description
                  </label>
                  <textarea
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     onKeyPress={handleKeyPress}
                     placeholder="e.g. A cozy café morning with latte art ☕🌿..."
                     className="w-full p-4 bg-black/50 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                     rows="4"
                  />
               </div>

               <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl font-semibold text-lg 
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
                        Generating...
                     </div>
                  ) : (
                     <div className="flex items-center justify-center gap-3">
                        <PiSparkleLight size={20} />
                        Generate Hashtags
                     </div>
                  )}
               </button>

               <div className="relative max-h-[350px] overflow-y-auto border border-white/20 bg-white/5 rounded-2xl p-6 backdrop-blur-md">
                  {hashtags.length > 0 && !isLoading && (
                     <button
                        onClick={handleCopy}
                        className="absolute top-4 right-4 p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition">
                        {isCopied ? (
                           <svg
                              className="w-4 h-4 text-green-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"></polyline>
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
                                 ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                           </svg>
                        )}
                     </button>
                  )}

                  <div className="flex flex-wrap justify-center gap-3">
                     {hashtags.length === 0 && !isLoading && (
                        <p className="text-gray-400 text-sm h-32 flex items-center justify-center gap-3">
                           <PiSparkleLight size={24} /> No hashtags generated
                           yet.
                        </p>
                     )}
                     {isLoading
                        ? [...Array(12)].map((_, i) => (
                             <div
                                key={i}
                                className="w-24 h-7 bg-white/10 rounded-full animate-shimmer"></div>
                          ))
                        : hashtags.map((tag, i) => (
                             <span
                                key={i}
                                className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full text-sm font-medium hover:scale-105 transition-transform">
                                {tag}
                             </span>
                          ))}
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
      `}</style>
         </div>
      </div>
   );
}
