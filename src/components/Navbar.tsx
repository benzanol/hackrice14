
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


const Navbar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);

  const handleNav = (): void => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-[#000000]'>
      <h1 className='w-full text-3xl font-bold text-[#1463F3]'>MAJA</h1>
      <ul className='hidden md:flex'>
        <li className='p-4'>About</li>
      </ul>
      <button className='bg-[#EFEFEF] w-[150px] rounded-md font-medium my-6 mx-4 mx-auto py-1 border border-solid border-black text-black'>
          Sign in
        </button>
        <button className='bg-[#1463F3] w-[150px] rounded-md font-medium my-6 mx-auto py-1 text-white'>
          Sign up
        </button>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul
        className={
          nav
            ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out duration-500 fixed left-[-100%]'
        }
      >
        <h1 className='w-full text-3xl font-bold text-[#1463F3] m-4'>MAJA</h1>
        <li className='p-4 border-b border-gray-600'>Home</li>
        <li className='p-4 border-b border-gray-600'>Company</li>
        <li className='p-4 border-b border-gray-600'>Resources</li>
        <li className='p-4 border-b border-gray-600'>About</li>
        <li className='p-4'>Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;


