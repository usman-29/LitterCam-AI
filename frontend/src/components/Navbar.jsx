import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    return (
        <div className='flex justify-between px-5 bg-[#333] text-white py-3'>
            {/* LOGO */}
            <div className='text-xl lg:text-4xl'>
                LitterCam AI
            </div>

            {/* Buttons */}
            <div className='flex justify-evenly'>
                <ul className='flex text-base sm:text-xl lg:text-xl gap-5 text-white pt-2'>
                    <NavLink to='/' className='flex flex-col items-center gap-1'>
                        <p>HOME</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/features' className='flex flex-col items-center gap-1'>
                        <p>FEATURES</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/demo' className='flex flex-col items-center gap-1'>
                        <p>DEMO</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/about' className='flex flex-col items-center gap-1'>
                        <p>ABOUT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                        <p>CONTACT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </ul>
            </div>

        </div>
    )
}

export default Navbar
