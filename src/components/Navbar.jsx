import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar = () => {
   const location = useLocation();

   const TAB_BUTTONS = [
      { title: 'Font Generator', path: '/fontgenerator' },
      { title: 'Emoji Generator', path: '/emojigenerator' },
      { title: 'Cool Symbol', path: '/symbol' },
      { title: 'Hashtag', path: '/hashtaggenerator' },
   ];

   return (
      <nav className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
         {/* Home Button */}
         {location.pathname !== '/' ? (
            <div className="flex items-center gap-2">
               <Link
                  to="/"
                  className="flex items-center justify-center text-white hover:text-yellow-400 transition-all duration-300 bg-white/5 hover:bg-white/10 p-3 rounded-xl"
                  title="Home">
                  <Home size={20} />
               </Link>

               {/* Divider */}
               <div className="h-6 w-px bg-white/20 mx-2" />
            </div>
         ) : null}

         {/* Navigation Tabs */}
         <div className="flex items-center">
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
      </nav>
   );
};

export default Navbar;
