
import React from 'react';
import logo from "../assets/pclogo.png"

const Header = () => {
  return (
    <header className="bg-[#0A1015] p-4 px-8">
    <div className="">
    <div className="container mx-auto"> 
    <div className="flex items-center justify-between">
    <div className="flex items-center">
    <img src={logo} width={50} alt="PC BUILDER logo" />
    <h1 className="text-white font-semibold">PC BUILDER</h1>
    </div>
    <div>
        <ul className="flex">
            <li className="text-white p-3">FAQs</li>
            <li className="text-white p-3">Sign in</li>
        </ul>
    </div>
    </div>
    </div>
    </div>

    </header>
  );
};

export default Header;