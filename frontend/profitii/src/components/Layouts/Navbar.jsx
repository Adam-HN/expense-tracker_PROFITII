import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] shadow-lg py-4 px-7 sticky top-0 z-30">
            <button
                className='block lg:hidden text-black'
                onClick={() => setOpenSideMenu(!openSideMenu)}
            >
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl text-black" />
                ) : (
                    <HiOutlineMenu className="text-2xl text-black" />
                )}
            </button>

            <h2 className="text-lg font-medium text-black">PROFITII</h2>

            {openSideMenu && (
                <div className="fixed top-[61px] -ml-7 bg-white">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;