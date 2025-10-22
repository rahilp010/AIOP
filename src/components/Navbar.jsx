import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
   const location = useLocation();
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const menuRef = useRef(null);

   const TAB_BUTTONS = [
      { title: 'Font Generator', path: '/fontgenerator' },
      { title: 'Emoji Generator', path: '/emojigenerator' },
      { title: 'Cool Symbol', path: '/symbol' },
      { title: 'Hashtag', path: '/hashtaggenerator' },
   ];

   const showHome = location.pathname !== '/';

   // Close mobile menu on outside click
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMobileMenuOpen(false);
         }
      };

      if (mobileMenuOpen) {
         document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [mobileMenuOpen]);

   return (
      <nav className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl relative">
         {showHome && (
            <>
               <Link
                  to="/"
                  className="flex items-center justify-center text-white hover:text-yellow-400 transition-all duration-300 bg-white/5 hover:bg-white/10 p-3 rounded-xl"
                  title="Home">
                  <Home size={20} />
               </Link>
               <div className="h-6 w-px bg-white/20" />
            </>
         )}

         <div className="flex items-center flex-1 justify-center">
            {/* Desktop Navigation Tabs */}
            <div className="hidden md:flex items-center">
               {TAB_BUTTONS.map((tab) => {
                  const isActive = location.pathname === tab.path;
                  return (
                     <Link
                        key={tab.title}
                        to={tab.path}
                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 
                           ${
                              isActive
                                 ? 'text-yellow-400 bg-white/10 border border-yellow-400/20'
                                 : 'text-white/80 hover:text-yellow-400 hover:bg-white/10'
                           }`}>
                        {tab.title}
                     </Link>
                  );
               })}
            </div>

            {/* Mobile hamburger button */}
            <div className="md:hidden relative">
               <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 ease-out hover:scale-105 shadow-md"
               >
                  <svg
                     className={`w-6 h-6 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`}
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
               </button>

               {/* Mobile menu dropdown */}
               {mobileMenuOpen && (
                  <div
                     ref={menuRef}
                     className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg shadow-xl max-h-80 overflow-y-auto customScrollbar z-50"
                  >
                     <div className="py-2 divide-y divide-white/10">
                        {TAB_BUTTONS.map((tab) => {
                           const isActive = location.pathname === tab.path;
                           return (
                              <Link
                                 key={tab.title}
                                 to={tab.path}
                                 onClick={() => setMobileMenuOpen(false)}
                                 className={`block w-full text-left px-6 py-3 font-medium transition-all duration-200 ease-out hover:bg-white/10 rounded-xl mx-1 ${
                                    isActive
                                       ? 'bg-gradient-to-r from-yellow-500/20 to-amber-600/20 text-yellow-200'
                                       : 'text-white/80'
                                 }`}
                              >
                                 {tab.title}
                              </Link>
                           );
                        })}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </nav>
   );
};

export default Navbar;