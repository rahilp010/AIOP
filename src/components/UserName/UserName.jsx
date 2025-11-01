/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaBars, FaWandMagicSparkles } from 'react-icons/fa6';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import Navbar from '../Navbar';
import { IoCopyOutline } from 'react-icons/io5';

const GEMINI_API_KEY = 'AIzaSyCDnt2WyRWrZVX2MgSDLmFNWR8kEySNWRE'; // Replace with your actual key

const tones = [
   { label: 'Cool', value: 'cool' },
   { label: 'Funny', value: 'funny' },
   { label: 'Aesthetic', value: 'aesthetic' },
   { label: 'Professional', value: 'professional' },
   { label: 'Gaming', value: 'gaming' },
];

const adjectives = [
   'epic',
   'silent',
   'crazy',
   'sparkling',
   'vivid',
   'lucky',
   'shadow',
   'stellar',
   'wild',
   'electric',
];
const nouns = [
   'ninja',
   'phoenix',
   'storm',
   'wizard',
   'vibe',
   'tiger',
   'panda',
   'drifter',
   'robot',
   'warrior',
];

export default function UsernameGenerator() {
   const [keyword, setKeyword] = useState('');
   const [tone, setTone] = useState('cool');
   const [usernames, setUsernames] = useState([]);
   const [loading, setLoading] = useState(false);
   const [toast, setToast] = useState({
      visible: false,
      message: '',
      type: '',
   });

   const [sidebarOpen, setSidebarOpen] = useState(false);

   const showNotification = (msg, type = 'success', duration = 2500) => {
      setToast({ visible: true, message: msg, type });
      setTimeout(() => setToast((p) => ({ ...p, visible: false })), duration);
   };

   const generateLocal = () => {
      const results = Array.from({ length: 12 }, () => {
         const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
         const noun = nouns[Math.floor(Math.random() * nouns.length)];
         const num = Math.floor(Math.random() * 999);
         return `${adj}${keyword || noun}${num}`.toLowerCase();
      });
      setUsernames(results);
      showNotification('✨ Random usernames generated!');
   };

   const generateAI = async () => {
      if (!GEMINI_API_KEY) {
         showNotification('Missing Gemini API key!', 'error');
         return;
      }

      try {
         setLoading(true);
         setUsernames([]);
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
                              text: `
Generate 15 unique, catchy, and platform-ready usernames optimized for Instagram, TikTok, Twitter (X), and YouTube.

Tone: ${tone}
Optional keyword or theme: "${keyword}"

Guidelines:
- Each username must be short, memorable, and visually appealing.
- if provide keyword then use it in username.
- Keep it under 15 characters.
- Avoid spaces, symbols, or complex punctuation.
- You can add letters, numbers, or underscores
- Reflect modern social media naming trends.
- Adapt style based on the selected tone — for example:
  • "cool" → sleek, trendy names  
  • "funny" → playful, witty combinations  
  • "aesthetic" → soft, elegant, minimalist  
  • "professional" → clean and brandable  
  • "gaming" → bold, energetic handles
- Avoid generic filler words like “user”, “account”, or “profile”.
- Return usernames separated by **new lines only** with no extra text or explanation.
`,
                           },
                        ],
                     },
                  ],
               }),
            }
         );

         if (!res.ok) throw new Error('Gemini API request failed');
         const data = await res.json();
         const text =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
         const parsed = text
            .split('\n')
            .map((u) => u.replace(/[-*•]/g, '').trim())
            .filter(Boolean);

         setUsernames(parsed.length ? parsed : ['No usernames generated 😢']);
         showNotification('🤖 AI usernames generated!');
      } catch (err) {
         console.error(err);
         showNotification('Failed to generate via AI', 'error');
      } finally {
         setLoading(false);
      }
   };

   const handleCopy = (name) => {
      navigator.clipboard.writeText(name);
      showNotification(`Copied "${name}"`);
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 relative overflow-x-hidden">
         <div
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="fixed top-6 left-6 z-40 p-3 rounded-2xl 
                              bg-white/10 backdrop-blur-xl border border-white/20
                              hover:bg-white/20 hover:scale-105
                              active:scale-95
                              transition-all duration-300 
                              shadow-lg shadow-black/20 cursor-pointer">
            <FaBars size={20} className="text-white" />
         </div>

         <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

         {/* Toast */}
         {toast.visible && (
            <div className="fixed top-6 right-6 z-50 animate-slideIn">
               <div
                  className={`px-4 py-3 rounded-xl shadow-lg backdrop-blur-lg border ${
                     toast.type === 'error'
                        ? 'bg-red-500/20 border-red-400 text-red-100'
                        : 'bg-green-500/20 border-green-400 text-green-100'
                  }`}>
                  {toast.message}
               </div>
            </div>
         )}

         {/* Header */}
         <div className="text-center mb-10 mt-20">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">
               Username{' '}
               <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                  Generator
               </span>
            </h1>
            <p className="text-gray-400">
               Create creative, cool, or AI-powered usernames instantly.
            </p>
         </div>

         {/* Controls */}
         <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
               <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter keyword (optional)"
                  className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
               />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 my-7">
               {tones.map((option) => (
                  <button
                     key={option.value}
                     onClick={() => setTone(option.value)}
                     className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                        option.value === tone
                           ? 'bg-indigo-500 border-2 border-white/40 text-white shadow-lg scale-105'
                           : 'bg-white/10 border border-white/10 text-gray-300 hover:bg-white/20 hover:border-white/20'
                     }`}>
                     <span>{option.label}</span>
                  </button>
               ))}
            </div>

            <div className="flex justify-center gap-3">
               <button
                  onClick={generateLocal}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl hover:scale-105 transition-all">
                  <GiPerspectiveDiceSixFacesRandom /> Random
               </button>
               <button
                  onClick={generateAI}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-xl hover:scale-105 transition-all disabled:opacity-50">
                  <FaWandMagicSparkles />
                  {loading ? 'Generating...' : 'AI Generate'}
               </button>
            </div>
         </div>

         {/* Results or Loader */}
         <div
            className="max-w-4xl mx-auto mt-10 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg shadow-xl animate-fade-in"
            id="results">
            <h2 className="text-xl font-semibold mb-4 text-white/90 text-center">
               {loading ? 'Generating Usernames...' : 'Generated Usernames'}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto max-h-[60vh] p-2">
               {loading ? (
                  [...Array(12)].map((_, i) => (
                     <div
                        key={i}
                        className="w-full h-10 rounded-lg bg-white/10 animate-shimmer"></div>
                  ))
               ) : usernames.length > 0 ? (
                  usernames.map((name, i) => (
                     <div
                        key={i}
                        className="px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-center hover:bg-white/20 cursor-pointer transition-all flex items-center justify-center gap-2 group relative hover:scale-105 "
                        onClick={() => handleCopy(name)}>
                        <IoCopyOutline className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-300" />
                        <span className="truncate">{name}</span>
                     </div>
                  ))
               ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-10 text-center text-white/70 animate-fade-in">
                     <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 opacity-80 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse">
                        <GiPerspectiveDiceSixFacesRandom className="text-3xl" />
                     </div>
                     <h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        No usernames yet
                     </h3>
                     <p className="text-gray-400 max-w-sm">
                        Tap{' '}
                        <span className="text-pink-400 font-medium">
                           Random
                        </span>{' '}
                        or{' '}
                        <span className="text-indigo-400 font-medium">
                           AI Generate
                        </span>{' '}
                        to create cool names instantly ✨
                     </p>
                  </div>
               )}
            </div>
         </div>

         {/* ✨ Animations */}
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
            .animate-slideIn { animation: slideIn 0.3s ease-out; }
            @keyframes fadeIn {
               from { opacity: 0; transform: translateY(10px); }
               to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
               animation: fadeIn 0.4s ease-out;
            }
         `}</style>
      </div>
   );
}
