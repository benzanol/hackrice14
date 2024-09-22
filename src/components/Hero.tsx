
import * as React from 'react';
import {ReactTyped} from 'react-typed';
import { Link } from "react-router-dom";
const Hero: React.FC = () => {
  return (
    <div className='text-white'>
      <div className='max-w-[1200px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <h1 className='text-[#1463F3] text-5xl sm:text-6xl md:text-7xl font-bold md:py-6'>
          Best solution for managing expenses
        </h1>
        <div className='flex flex-col sm:flex-row justify-center items-center'>
          <p className='text-[#000000] text-2xl sm:text-4xl md:text-5xl font-bold py-4'>
            Track every dollar you spend on
          </p>
          <ReactTyped
            className='text-[#961616] text-2xl sm:text-4xl md:text-5xl font-bold md:pl-4 pl-2'
            strings={['subscriptions', 'medical bills', 'utilities']}
            typeSpeed={80}
            backSpeed={50}
            loop
          />
        </div>
        
        <Link to="/dashboard">
          <button className='bg-[#1463F3] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;


