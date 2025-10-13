import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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

   return (
      <div>
         <nav className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
            <div className="flex items-center">
               {TAB_BUTTONS.map((tab) => (
                  <Link
                     key={tab.title}
                     to={tab?.path}
                     className="hover:text-yellow-400 transition-colors duration-300 text-sm hover:bg-white/10 px-8 py-4 rounded-2xl">
                     {tab.title}
                  </Link>
               ))}
            </div>
         </nav>
      </div>
   );
};

export default Navbar;
