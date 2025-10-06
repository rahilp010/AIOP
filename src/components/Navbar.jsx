import React from 'react';

const Navbar = () => {
   return (
      <div className='flex justify-between items-center border border-neutral-400 p-4 rounded-4xl mx-40 my-4'>
         <div>
            <p>1</p>
         </div>
         <div className='flex gap-5'>
            <p>Home</p>
            <p>Explore</p>
            <p>Profile</p>
            <p>Messages</p>
            <p>Notifications</p>
            <p>Settings</p>
         </div>
         <div>
            <p>Profile</p>
         </div>
      </div>
   );
};

export default Navbar;
