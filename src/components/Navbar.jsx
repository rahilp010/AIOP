import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
   const location = useLocation();
   const TAB_BUTTONS = [
      {
         title: 'Font Generator',
         path: '/fontgenerator',
      },
      {
         title: 'Emoji Generator',
         path: '/emojigenerator',
      },
      {
         title: 'Cool Symbol',
         path: '/symbol',
      },
   ];

   const isActive = (path) => location.pathname === path;

   return (
      <div>
         <nav className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-center flex-wrap gap-2 p-2">
               {TAB_BUTTONS.map((tab) => (
                  <Link
                     key={tab.title}
                     to={tab?.path ?? '/'} // Fallback to home if path missing
                     className={`hover:text-yellow-400 transition-all duration-300 text-sm px-4 py-2 rounded-xl ${
                        isActive(tab.path)
                           ? 'text-yellow-400 bg-white/10 border border-yellow-400/30 shadow-md'
                           : 'text-white hover:bg-white/10'
                     }`}
                  >
                     {tab.title}
                  </Link>
               ))}
            </div>
         </nav>
      </div>
   );
};

export default Navbar;