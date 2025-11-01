import React, { useState, useEffect, useRef } from 'react';
import {
   FaSmile,
   FaUserAlt,
   FaHashtag,
   FaPalette,
   FaBars,
   FaTimes,
} from 'react-icons/fa';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { IoIosShareAlt } from 'react-icons/io';
import { BiFont } from 'react-icons/bi';

const tools = [
   {
      icon: <FaSmile size={32} />,
      title: 'Font Creator',
      desc: 'Mix and match emojis to create unique combinations.',
      link: '/fontgenerator',
      gradient: 'from-blue-500 via-cyan-400 to-teal-400',
   },
   {
      icon: <FaUserAlt size={32} />,
      title: 'Emojis',
      desc: 'Generate creative bios for your social media profiles.',
      link: '/emojigenerator',
      gradient: 'from-purple-500 via-pink-500 to-rose-400',
   },
   {
      icon: <FaHashtag size={32} />,
      title: 'Symbols',
      desc: 'Generate relevant hashtags and captions for your posts.',
      link: '/symbol',
      gradient: 'from-emerald-500 via-teal-400 to-cyan-400',
   },
   {
      icon: <FaPalette size={32} />,
      title: 'Bio Creator',
      desc: 'Create personalized and engaging bio content.',
      link: '/bio',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
   },
   {
      icon: <FaHashtag size={32} />,
      title: 'HashTag',
      desc: 'Create personalized and engaging bio content.',
      link: '/hashtaggenerator',
      gradient: 'from-amber-200 via-orange-500 to-blue-300',
   },
   {
      icon: <BiFont size={32} />,
      title: 'Word Counter',
      desc: 'Create personalized and engaging bio content.',
      link: '/wordCounter',
      gradient: 'from-green-500 via-yellow-500 to-cyan-500',
   },
];

export default function HeroPage() {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);
   const sectionRef = useRef(null);

   useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const handleScroll = () => {
      sectionRef.current?.scrollIntoView({
         behavior: 'smooth', // smooth scrolling animation
         block: 'start', // align section at top
      });
   };

   return (
      <div className="max-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-auto customScrollbar">
         {/* Decorative blurred gradient blobs */}
         <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[150px]" />
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[150px]" />

         {/* Navbar */}
         <header
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
               scrolled
                  ? 'backdrop-blur-xl bg-white/20 border-white/20 shadow-lg'
                  : 'backdrop-blur-lg bg-white/10'
            } border border-white/10 px-8 py-3 rounded-full flex items-center justify-between w-[90%] md:w-[70%] max-w-5xl`}>
            {/* Logo */}
            <div className="flex items-center space-x-2">
               <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                  TapClick
               </span>
            </div>

            {/* Get Started Button */}
            <button
               className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full text-sm font-semibold hover:scale-105 hover:shadow-md hover:shadow-pink-500/30 transition-all duration-300"
               onClick={handleScroll}>
               Get Started
            </button>

            {/* Mobile Menu Button */}
            <button
               onClick={() => setSidebarOpen(!sidebarOpen)}
               className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
               aria-label="Toggle menu">
               {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
         </header>

         {/* Mobile Sidebar */}
         <div
            className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
               sidebarOpen
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
            }`}>
            <div
               className="absolute inset-0 bg-black/70 backdrop-blur-md"
               onClick={() => setSidebarOpen(false)}
            />
            <div
               className={`absolute left-0 top-0 bottom-0 w-64 bg-white/10 backdrop-blur-xl border-r border-white/10 shadow-2xl transform transition-transform duration-300 ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
               }`}>
               <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="text-lg font-bold">Menu</span>
                     <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-lg">
                        <FaTimes size={20} />
                     </button>
                  </div>
                  <nav className="space-y-4">
                     {['Features', 'Tools', 'Pricing', 'About'].map((item) => (
                        <a
                           key={item}
                           href={`#${item.toLowerCase()}`}
                           className="block py-2 text-gray-300 hover:text-white transition-colors">
                           {item}
                        </a>
                     ))}
                  </nav>
               </div>
            </div>
         </div>

         {/* Hero Section */}
         <section className="pt-40 pb-20 px-6 text-center relative z-10 customScrollbar">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
               Create{' '}
               <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Amazing Content
               </span>
               <br />
               Effortlessly
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
               Explore tools designed to help you create engaging content for
               your social media and digital presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <button
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
                  onClick={handleScroll}>
                  Start Creating
               </button>
               <button className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto">
                  Learn More
               </button>
            </div>
         </section>

         {/* Tools Section */}
         <section
            id="tools"
            className="py-24 px-6 relative z-10"
            ref={sectionRef}>
            <div className="max-w-7xl mx-auto text-center">
               <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Our{' '}
                  <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                     Trending Tools
                  </span>
               </h2>
               <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
                  Powerful, intuitive tools designed to elevate your creative
                  workflow.
               </p>

               <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-10 pb-20"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                     visible: { transition: { staggerChildren: 0.15 } },
                  }}>
                  {tools.map((tool, i) => (
                     <motion.div
                        key={i}
                        variants={{
                           hidden: { opacity: 0, y: 40 },
                           visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{
                           y: -8,
                           scale: 1.03,
                           boxShadow: '0 0 25px rgba(139,92,246,0.3)',
                        }}
                        whileTap={{
                           scale: 0.98,
                        }}
                        transition={{ type: 'spring', stiffness: 250 }}
                        className="rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 overflow-hidden backdrop-blur-md">
                        <Link to={tool.link}>
                           <div
                              className={`bg-gradient-to-br ${tool.gradient} text-white flex flex-col items-center justify-center p-10 space-y-4`}>
                              {tool.icon}
                           </div>
                           <div className="p-6 text-center">
                              <h3 className="font-semibold text-white text-lg">
                                 {tool.title}
                              </h3>
                              <p className="text-gray-400 text-sm mt-2">
                                 {tool.desc}
                              </p>
                           </div>
                        </Link>
                     </motion.div>
                  ))}
               </motion.div>
            </div>
         </section>

         {/* Footer */}
         <footer className="border-t border-white/10 py-6 backdrop-blur-lg bg-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 px-6">
               <p className="text-gray-500 text-sm text-center md:text-left">
                  © 2025 TapClick. All rights reserved.
               </p>
               <div className="flex gap-6 text-sm">
                  {['Terms', 'Privacy', 'Contact', 'Support'].map((item) => (
                     <a
                        key={item}
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors">
                        {item}
                     </a>
                  ))}
               </div>
            </div>
         </footer>
      </div>
   );
}
