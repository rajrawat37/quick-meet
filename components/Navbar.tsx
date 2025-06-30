import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <a href="/" className="flex items-center gap-1">
        <img
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Quick Meet
        </p>
      </a>
      <div className="flex-between gap-5">
            {/* Clerk User Management */}
          
      </div>
    </nav>
  );
};

export default Navbar;